import { client } from '../main.ts';
import path from 'node:path';
import fs from 'node:fs';

const loadEvents = async () => {
	const eventsPath = import.meta.dirname || '';
	const eventFiles = fs.readdirSync(eventsPath).filter((file) =>
		file.endsWith('.ts') && !file.match('mod.ts')
	);

	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const module = await import(filePath);
		const event = module.default;

		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
};

console.log('[Events Loaded]');

export default loadEvents;
