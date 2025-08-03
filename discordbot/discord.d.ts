import { Collection, SlashCommandBuilder } from 'discord';

type CommandModule = {
	data: SlashCommandBuilder;
	execute: (arg0: unknown) => unknown;
};

type EventModule = {
	name: string;
	once?: boolean;
	execute: (...args: unknown[]) => unknown;
};

declare module 'npm:discord.js' {
	export interface Client {
		commands: Collection<string, CommandModule>;
	}
}
