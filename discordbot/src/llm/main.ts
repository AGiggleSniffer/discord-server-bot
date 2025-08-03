import { ChatOllama } from 'ollama';
import {
	END,
	MemorySaver,
	MessagesAnnotation,
	START,
	StateGraph,
} from 'langgraph';
import { ChatPromptTemplate } from 'core/prompts';
import { SystemMessage, trimMessages } from 'core/messages';
import weatherTool from './tools/exmple.ts';

export const llmWithTools = new ChatOllama({
	model: 'qwen3:0.6b',
}).bindTools([weatherTool]);

const llm = new ChatOllama({
	model: 'llama3.2:1b',
});

const trimmer = trimMessages({
	maxTokens: 10000,
	strategy: 'last',
	tokenCounter: (msgs) => msgs.length,
	includeSystem: true,
	allowPartial: false,
	startOn: 'human',
});

const promptTemplate = ChatPromptTemplate.fromMessages([
	new SystemMessage('Answer only in Gen Z slang.'),
	['placeholder', '{messages}'],
]);

// Define the function that calls the model
const callModel = async (state: typeof MessagesAnnotation.State) => {
	const trimmedMessage = await trimmer.invoke(state.messages);
	const prompt = await promptTemplate.invoke({
		messages: trimmedMessage,
	});
	const response = await llm.invoke(prompt);
	return { messages: [response] };
};

// Define a new graph
const workflow = new StateGraph(MessagesAnnotation)
	// Define the node and edge
	.addNode('model', callModel)
	.addEdge(START, 'model')
	.addEdge('model', END);

// Add memory
const memory = new MemorySaver();
export const app = workflow.compile({ checkpointer: memory });
export const config = { configurable: { thread_id: crypto.randomUUID() } };
