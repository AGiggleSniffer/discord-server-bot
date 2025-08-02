import { Collection, MessageFlags } from "npm:discord.js";
import path from "node:path";
import fs from "node:fs";
import { module } from "../../../discord.d.ts";

export const commands = new Collection<string, module>();

export const foldersPath = import.meta.dirname || "";
export const commandFolders = fs.readdirSync(foldersPath).filter((file) =>
  !file.match("mod.ts")
);

// loop through sub directories of commands folder
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) =>
    file.endsWith(".ts") && !file.match("mod.ts")
  );

  // loop through each file in sub directory
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(filePath);

    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
      );
    }
  }
}
