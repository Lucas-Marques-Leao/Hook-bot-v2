import { Command } from '../../interfaces';

export const slash: Command = {
  name: 'ping',
  description: 'Calcula o ping do bot e responde legal',
  testOnly: true,
  run: ({ interaction, client }) => {
    interaction.reply({
      content: `${interaction.user.username}, Cacetada bicho!, à propósito, o ping do bot é ${client.ws.ping}ms`,
    });
  },
};
