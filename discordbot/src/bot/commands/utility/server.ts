import { SlashCommandBuilder } from 'discord';
import { CommandModule } from 'discord.d.ts';

export default {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	execute: async (
		interaction: {
			reply: (arg0: string) => Promise<string>;
			guild: { name: string; memberCount: number };
		},
	) => // interaction.guild is the object representing the Guild in which the command was run
	await interaction.reply(
		`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`,
	),
} as CommandModule;
