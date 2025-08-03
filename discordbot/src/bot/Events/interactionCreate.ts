import { Events, Interaction, MessageFlags } from 'discord';
import { CommandModule, EventModule } from 'discord.d.ts';

export default {
	name: Events.InteractionCreate,
	execute: async (interaction: Interaction) => {
		if (!interaction.isChatInputCommand()) return;
		const command: CommandModule | unknown = interaction.client.commands
			.get(interaction.commandName);

		if (!command) {
			console.error(
				`No command matching ${interaction.commandName} was found.`,
			);
			return;
		}

		try {
			await (command as CommandModule).execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({
					content: 'There was an error while executing this command!',
					flags: MessageFlags.Ephemeral,
				});
			} else {
				await interaction.reply({
					content: 'There was an error while executing this command!',
					flags: MessageFlags.Ephemeral,
				});
			}
		}
	},
} as EventModule;
