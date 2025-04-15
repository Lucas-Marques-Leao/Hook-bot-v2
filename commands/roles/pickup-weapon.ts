import {
  ApplicationCommandDataResolvable,
  ChatInputCommandInteraction,
} from 'discord.js';
import prisma from '../../lib/db';

const slash = {
  data: {
    name: 'armarse',
    description: 'Põe uma arma do arsenal no seu inventário',
    options: [
      {
        name: 'nome',
        description: 'O nome da sua ficha',
        type: 3, // STRING
        required: true,
      },
      {
        name: 'id',
        description: 'O ID da arma do arsenal',
        type: 3, // STRING
        required: true,
      },
    ],
  } satisfies ApplicationCommandDataResolvable,

  run: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    const characterName = interaction.options.getString('nome', true);
    const weaponId = interaction.options.getString('id', true);

    const character = await prisma.character.findFirst({
      where: { characterName },
    });

    const weapon = await prisma.weapon.findUnique({
      where: { id: weaponId },
    });

    if (!character || !weapon) {
      return await interaction.reply({
        content: 'Ficha ou arma não encontradas.',
        ephemeral: true,
      });
    }

    try {
      await prisma.character.update({
        where: { id: character.id },
        data: {
          inventory: {
            connect: { id: weapon.id },
          },
        },
      });

      return await interaction.reply({
        content: 'Arma adicionada com sucesso!',
      });
    } catch (err) {
      console.error(err);
      return await interaction.reply({
        content: 'Algo deu errado ao adicionar a arma à sua ficha.',
        ephemeral: true,
      });
    }
  },
};

export default slash;
