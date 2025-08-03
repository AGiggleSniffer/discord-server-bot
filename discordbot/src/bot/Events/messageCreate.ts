import { Events, Message, OmitPartialGroupDMChannel } from 'discord';
import { HumanMessage } from 'core/messages';
import { app, config } from 'llm';
import { EventModule } from 'discord.d.ts';

export default {
	name: Events.MessageCreate,
	execute: async (message: OmitPartialGroupDMChannel<Message>) => {
		if (message.author.bot) return;

		console.log(message.content);
		if (message.content === '!ping') {
			message.channel.send('Pong!');
		} else {
			const result = await app.invoke({
				messages: [new HumanMessage(message.content)],
			}, config);

			message.channel.send(
				`${result.messages[result.messages.length - 1].content}`,
			);
		}
	},
} as EventModule;
