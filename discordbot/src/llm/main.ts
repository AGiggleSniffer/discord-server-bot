import { ChatOllama } from 'ollama';
import weatherTool from './tools/exmple.ts';

export const llm = new ChatOllama({
	model: 'llama3.2:1b',
});

export const llmWithTools = new ChatOllama({
	model: 'qwen3:0.6b',
}).bindTools([weatherTool]);

// const messages = [
//   new SystemMessage("You are a helpful assistant but annoyed by constant questioning, answer with concise responses"),
//   new HumanMessage("What's the weather like today in San Francisco? Ensure you use the 'get_current_weather' tool."),
// ];

// const resultFromTool = await llmWithTools.stream(messages);

// const chunks = [];
// for await (const chunk of resultFromTool) {
//   chunks.push(chunk);
//   console.log(`${chunk.content}|`);
// }
