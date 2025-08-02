import { SlashCommandBuilder } from "npm:discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

export async function execute(
  interaction: { reply: (arg0: string) => Promise<string> },
) {
  await interaction.reply("Pong!");
}
