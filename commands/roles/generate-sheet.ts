import {
  ApplicationCommandDataResolvable,
  ChatInputCommandInteraction,
} from 'discord.js';
import prisma from '../../lib/db';

const slash = {
  data: {
    name: 'gerarficha',
    description: 'Gera uma ficha de RPG',
    options: [
      {
        name: 'nome',
        description: 'O nome do seu personagem',
        type: 3, // STRING
        required: true,
      },
      {
        name: 'raça',
        description: 'A raça do seu personagem',
        type: 3,
        required: true,
      },
      {
        name: 'classe',
        description: 'A classe principal do seu personagem',
        type: 3,
        required: true,
      },
      {
        name: 'nivel',
        description: 'O nível do seu personagem',
        type: 4,
        required: true,
      },
      {
        name: 'foto',
        description: 'URL da foto do seu personagem',
        type: 3,
        required: true,
      },
    ],
  } satisfies ApplicationCommandDataResolvable,


   run: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    const name = interaction.options.getString('nome', true);
    const race = interaction.options.getString('raça', true);
    const level = interaction.options.getInteger('nivel', true);
    const mainClass = interaction.options.getString('classe', true);
    const imageUrl = interaction.options.getString('foto', true);

    try {
      // Checar se já existe
      const existing = await prisma.character.findFirst({
        where: { characterName: name },
      });

      if (existing) {
        return interaction.reply({
          content: 'Já existe uma ficha com esse nome!',
          ephemeral: true,
        });
      }

      await prisma.character.create({
        data: {
          authorId: interaction.user.username,
          characterName: name,
          race,
          imageUrl,
          primaryClass: mainClass,
          primaryLevel: level,
        },
      });

      return interaction.reply(
        `A ficha de: **${name}**, da raça **${race}** e da classe **${mainClass}** foi adicionada por **${interaction.user.username}**.`,
      );
    } catch (err) {
      console.error(err);
      return interaction.reply({
        content: 'Algo deu errado ao inserir a sua ficha.',
        ephemeral: true,
      });
    }
  },
};

export default slash;
