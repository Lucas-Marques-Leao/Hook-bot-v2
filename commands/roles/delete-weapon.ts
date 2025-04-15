import {
  ApplicationCommandDataResolvable,
  ChatInputCommandInteraction,
} from 'discord.js';
import prisma from '../../lib/db';

const slash = {
  data: {
    name: 'deletarma',
    description: 'Deleta uma arma (DM)',
    options: [
      {
        name: 'id',
        description: 'O ID da arma que será excluída',
        type: 3, // STRING
        required: true,
      },
    ],
  } satisfies ApplicationCommandDataResolvable,


  run: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.user.username !== 'Luk at you') {
      return await interaction.reply({ content: 'Você não é o DM!' });
    }

    const id = interaction.options.getString('id', true);

    const weapon = await prisma.weapon.findUnique({
      where: { id },
    });

    if (!weapon) {
      return await interaction.reply({ content: 'Arma não encontrada.' });
    }

    try {
      await prisma.weapon.delete({ where: { id: weapon.id } });

      return await interaction.reply({
        content: `A arma foi deletada com sucesso!`,
      });
    } catch (err) {
      console.error(err);
      return await interaction.reply({
        content: 'Algo deu errado ao deletar a arma.',
      });
    }
  },
};

export default slash;
