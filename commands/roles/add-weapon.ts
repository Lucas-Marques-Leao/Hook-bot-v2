import {
  ApplicationCommandDataResolvable,
  ChatInputCommandInteraction,
} from 'discord.js';
import prisma from '../../lib/db';

const slash = {
  data: {
    name: 'addweapon',
    description: 'Adicionar uma arma a uma ficha',
    options: [
      {
        name: 'character',
        description: 'Nome da ficha',
        type: 3, // STRING
        required: true,
      },
      {
        name: 'name',
        description: 'Nome da arma',
        type: 3,
        required: true,
      },
      {
        name: 'damage',
        description: 'Dado de dano',
        type: 3,
        required: true,
      },
      {
        name: 'image',
        description: 'URL da imagem',
        type: 3,
        required: true,
      },
      {
        name: 'properties',
        description: 'Propriedades (opcional)',
        type: 3,
        required: false,
      },
      {
        name: 'magic',
        description: 'Bônus mágico',
        type: 4,
        required: false,
      },
      {
        name: 'description',
        description: 'Descrição da arma',
        type: 3,
        required: false,
      },
    ],
  } satisfies ApplicationCommandDataResolvable,


   run: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    const characterName = interaction.options.getString('character', true);
    const weaponName = interaction.options.getString('name', true);
    const damage = interaction.options.getString('damage', true);
    const imageUrl = interaction.options.getString('image', true);
    const properties = interaction.options.getString('properties') ?? 'Existe, e é isso';
    const magicBonus = interaction.options.getInteger('magic') ?? 0;
    const description =
      interaction.options.getString('description') ??
      'Uma Arma elegante, para tempos mais Civilizados';

    const character = await prisma.character.findFirst({
      where: { characterName },
    });

    if (!character) {
      return interaction.reply({ content: 'Ficha não encontrada.' });
    }

    if (
      interaction.user.id === character.authorId ||
      interaction.user.username === 'Luk at you'
    ) {
      try {
        const newWeapon = await prisma.weapon.create({
          data: {
            name: weaponName,
            description,
            magicBonus,
            damage,
            properties,
            imageUrl,
            characters: {
              connect: { id: character.id },
            },
          },
        });

        return interaction.reply({
          content: `A arma **${newWeapon.name}** foi adicionada com sucesso à ficha **${character.characterName}**!`,
        });
      } catch (err) {
        console.error(err);
        return interaction.reply({
          content: 'Erro ao adicionar a arma à ficha.',
        });
      }
    }

    return interaction.reply({
      content: 'Você não tem permissão para editar esta ficha.',
    });
  },
};

export default slash;
