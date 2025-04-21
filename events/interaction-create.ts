import { Events, Interaction } from 'discord.js';
import { ExtendedClient } from '../client';

export const event = {
  name: Events.InteractionCreate,
  async run(client: ExtendedClient, interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
      await interaction.reply({
        content: '❌ Comando não encontrado.',
        ephemeral: true,
      });
    }

    try {
      await command.run({ client, interaction });
    } catch {
      await interaction.reply({
        content: '❌ Ocorreu um erro ao executar o comando.',
        ephemeral: true,
      });
    }
  },
};
