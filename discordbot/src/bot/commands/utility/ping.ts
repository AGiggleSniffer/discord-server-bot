import { SlashCommandBuilder } from 'discord';
import { CommandModule } from 'discord.d.ts';

export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	execute: async (
		interaction: { reply: (arg0: string) => Promise<string> },
	) => await interaction.reply('Pong!'),
} as CommandModule;
