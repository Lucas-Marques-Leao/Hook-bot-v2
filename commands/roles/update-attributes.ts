import {
  ApplicationCommandDataResolvable,
  ChatInputCommandInteraction,
} from 'discord.js';
import prisma from '../../lib/db';

const slash = {
  data: {
    name: 'setributos',
    description: 'Mudança de atributos de uma ficha',
    options: [
      {
        name: 'nome',
        description: 'Nome do personagem',
        type: 3, // STRING
        required: true,
      },
      {
        name: 'for',
        description: 'Atributo de Força',
        type: 4, // INTEGER
        minValue: 6,
        maxValue: 26,
        required: true,
      },
      {
        name: 'des',
        description: 'Atributo de Destreza',
        type: 4,
        minValue: 6,
        maxValue: 26,
        required: true,
      },
      {
        name: 'con',
        description: 'Atributo de Constituição',
        type: 4,
        minValue: 6,
        maxValue: 26,
        required: true,
      },
      {
        name: 'int',
        description: 'Atributo de Inteligência',
        type: 4,
        minValue: 6,
        maxValue: 26,
        required: true,
      },
      {
        name: 'sab',
        description: 'Atributo de Sabedoria',
        type: 4,
        minValue: 6,
        maxValue: 26,
        required: true,
      },
      {
        name: 'car',
        description: 'Atributo de Carisma',
        type: 4,
        minValue: 6,
        maxValue: 26,
        required: true,
      },
    ],
  } satisfies ApplicationCommandDataResolvable,

  run: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.user.username !== 'Luk at you') {
      return await interaction.reply({ content: 'Você não é o DM' });
    }

    const characterName = interaction.options.getString('nome', true);
    const strength = interaction.options.getInteger('for', true);
    const dexterity = interaction.options.getInteger('des', true);
    const constitution = interaction.options.getInteger('con', true);
    const intelligence = interaction.options.getInteger('int', true);
    const wisdom = interaction.options.getInteger('sab', true);
    const charisma = interaction.options.getInteger('car', true);

    const character = await prisma.character.findFirst({
      where: { characterName },
    });

    if (!character) {
      return await interaction.reply({
        content: 'Esta ficha não foi encontrada.',
      });
    }

    try {
      await prisma.character.update({
        where: { id: character.id },
        data: {
          strength,
          dexterity,
          constitution,
          intelligence,
          wisdom,
          charisma,
        },
      });

      return await interaction.reply({
        content: `Atributos atualizados para ${characterName}!`,
      });
    } catch (err) {
      console.error(err);
      return await interaction.reply({
        content: 'Erro ao tentar inserir os atributos.',
      });
    }
  },
};

export default slash;
