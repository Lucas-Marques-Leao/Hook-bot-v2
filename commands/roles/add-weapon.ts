import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
} from 'discord.js';
import { BotCommand } from '../../client';
import prisma from '../../lib/db';

const command: BotCommand = {
  data: new SlashCommandBuilder()
    .setName('addweapon')
    .setDescription('Adicionar uma arma a uma ficha')
    .addStringOption(option =>
      option
        .setName('character')
        .setDescription('Nome da ficha')
        .setRequired(true),
    )
    .addStringOption(option =>
      option.setName('name').setDescription('Nome da arma').setRequired(true),
    )
    .addStringOption(option =>
      option.setName('damage').setDescription('Dado de dano').setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName('image')
        .setDescription('URL da imagem da arma')
        .setRequired(true),
    )
    .addStringOption(option =>
      option.setName('properties').setDescription('Propriedades da arma'),
    )
    .addIntegerOption(option =>
      option.setName('magic').setDescription('Bônus mágico'),
    )
    .addStringOption(option =>
      option.setName('description').setDescription('Descrição da arma'),
    ),

  async run({ interaction }: { interaction: ChatInputCommandInteraction }) {
    const characterName = interaction.options.getString('character', true);
    const weaponName = interaction.options.getString('name', true);
    const damage = interaction.options.getString('damage', true);
    const imageUrl = interaction.options.getString('image', true);
    const properties =
      interaction.options.getString('properties') ?? 'Existe, e é isso';
    const magicBonus = interaction.options.getInteger('magic') ?? 0;
    const description =
      interaction.options.getString('description') ??
      'Uma Arma elegante, para tempos mais Civilizados';

    const character = await prisma.character.findFirst({
      where: { characterName },
    });

    if (!character) {
      return interaction.reply({
        content: '❌ Ficha não encontrada.',
        flags: MessageFlags.Ephemeral,
      });
    }

    if (
      interaction.user.id === character.authorId ||
      interaction.user.username === 'lukatyou'
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
          content: `🗡️ A arma **${newWeapon.name}** foi adicionada com sucesso à ficha **${character.characterName}**!`,
        });
      } catch {
        return interaction.reply({
          content: '❌ Erro ao adicionar a arma à ficha.',
          flags: MessageFlags.Ephemeral,
        });
      }
    }

    return interaction.reply({
      content: '⚠️ Você não tem permissão para editar esta ficha.',
      flags: MessageFlags.Ephemeral,
    });
  },
};

export default command;
