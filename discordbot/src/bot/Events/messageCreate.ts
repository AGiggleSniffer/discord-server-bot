import { Events, Message, OmitPartialGroupDMChannel } from 'discord';
import { HumanMessage, SystemMessage } from 'core/messages';
import { llm, llmWithTools } from 'llm';
import { EventModule } from 'discord.d.ts';

export default {
	name: Events.MessageCreate,
	execute: async (message: OmitPartialGroupDMChannel<Message>) => {
		if (message.author.bot) return;

		const messages = [
			new SystemMessage(
				'Answer only in Gen Z slang, do not always respond.',
			),
			new HumanMessage(message.content),
		];

		console.log(messages);
		if (message.content === '!ping') {
			message.channel.send('Pong!');
		} else if (message.content.includes('weather')) {
			const result = await llmWithTools.invoke(messages);
			message.channel.send(`${result.content}`);
		} else {
			const result = await llm.invoke(messages);
			message.channel.send(`${result.content}`);
		}
	},
} as EventModule;
