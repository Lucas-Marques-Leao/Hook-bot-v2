import {
  ApplicationCommandDataResolvable,
  ChatInputCommandInteraction,
} from 'discord.js';
import prisma from '../../lib/db';

const slash = {
  data: {
    name: 'deletarficha',
    description: 'Deleta uma Ficha (DM)',
    options: [
      {
        name: 'nome',
        description: 'O nome da ficha que será excluída',
        type: 3,
        required: true,
      },
    ],
  } satisfies ApplicationCommandDataResolvable,


  run: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.user.username !== 'Luk at you') {
      return await interaction.reply({ content: 'Você não é o DM!' });
    }

    const characterName = interaction.options.getString('nome', true);

    const character = await prisma.character.findFirst({
      where: { characterName },
    });

    if (!character) {
      return await interaction.reply({ content: 'Ficha não encontrada.' });
    }

    try {
      await prisma.character.delete({
        where: { id: character.id },
      });

      return await interaction.reply({
        content: `A Ficha **${characterName}** foi deletada com sucesso!`,
      });
    } catch (err) {
      console.error(err);
      return await interaction.reply({
        content: 'Algo deu errado ao deletar a Ficha.',
      });
    }
  },
};

export default slash;
