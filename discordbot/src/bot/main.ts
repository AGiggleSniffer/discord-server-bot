import { Client, GatewayIntentBits } from 'discord';
import { commands } from './commands/mod.ts';
import loadEvents from './Events/mod.ts';

export const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		// GatewayIntentBits.DirectMessages,
		// GatewayIntentBits.GuildMembers,
		// GatewayIntentBits.GuildPresences,
	],
});

client.commands = commands;

await loadEvents();
