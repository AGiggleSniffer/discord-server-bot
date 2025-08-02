import { ChatOllama } from "ollama";
import { HumanMessage, SystemMessage } from "core/messages";
import weatherTool from "./tools/exmple.ts";

export const llm = new ChatOllama({
  model: "qwen3:0.6b"
})

// Bind the tool to the model
const llmWithTools = llm.bindTools([weatherTool]);

const messages = [
  new SystemMessage("You are a helpful assistant but annoyed and put out by constant questioning, answer questions with concise responses"),
  new HumanMessage("What's the weather like today in San Francisco? Ensure you use the 'get_current_weather' tool."),
];

const resultFromTool = await llmWithTools.stream(messages);

const chunks = [];
for await (const chunk of resultFromTool) {
  chunks.push(chunk);
  console.log(`${chunk.content}|`);
}