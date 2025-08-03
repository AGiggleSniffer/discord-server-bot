import { client } from './src/bot/main.ts';

client.login(Deno.env.get('DISCORD_TOKEN'));
