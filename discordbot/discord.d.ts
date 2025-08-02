import { Client, Collection, SlashCommandBuilder } from "npm:discord.js";
import { unknown } from "zod";

type module = {
    data: SlashCommandBuilder,
    execute: (arg0: unknown) => unknown;
}

declare module "npm:discord.js" {
  export interface Client {
    commands: Collection<string, unknown>;
  }
}
