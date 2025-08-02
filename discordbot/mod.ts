import { client } from "./src/bot/mod.ts";

client.login(Deno.env.get("DISCORD_TOKEN"));
