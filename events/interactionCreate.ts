import { Interaction, CommandInteractionOptionResolver } from 'discord.js';
import { Event } from '../Interfaces';
import { ExtendedInteraction } from '../Interfaces/Command';

const event: Event = {
  name: 'interactionCreate',
  run: async (client, interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      await interaction.reply('Este comando não existe');
      return;
    }

    command.run({
      args: interaction.options as CommandInteractionOptionResolver,
      client,
      interaction: interaction as ExtendedInteraction,
    });

    // if (cmd.permissions && cmd.permissions.length > 0){
    //   if (!interaction.member.permissions.has(cmd.permissions)) return interaction.reply({ content: `Você não tem permissão para usar este comando.`});
    // }
  },
};

export default event;
