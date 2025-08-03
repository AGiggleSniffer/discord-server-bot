import { Client, Events } from 'discord';
import { EventModule } from 'discord.d.ts';

export default {
	name: Events.ClientReady,
	once: true,
	execute(client: Client) {
		console.log(`Ready! Logged in as ${client?.user?.tag}`);
	},
} as EventModule;
