import {
  ApplicationCommandDataResolvable,
  CommandInteraction,
} from 'discord.js';

const slash = {
  data: {
    name: 'ping',
    description: 'Calcula o ping do bot e responde legal',
  } satisfies ApplicationCommandDataResolvable,

  run: async (interaction: CommandInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    const ping = interaction.client.ws.ping;

    await interaction.reply({
      content: `${interaction.user.username}, cacetada bicho! À propósito, o ping do bot é **${ping}ms**.`,
    });
  },
};

export default slash;
