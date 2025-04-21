import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js';
import { BotCommand } from '../../client';
import prisma from '../../lib/db';

const command: BotCommand = {
  data: new SlashCommandBuilder()
    .setName('gerarficha')
    .setDescription('Gera uma ficha de RPG')
    .addStringOption(option =>
      option
        .setName('nome')
        .setDescription('O nome do seu personagem')
        .setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName('raça')
        .setDescription('A raça do seu personagem')
        .setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName('classe')
        .setDescription('A classe principal do seu personagem')
        .setRequired(true),
    )
    .addIntegerOption(option =>
      option
        .setName('nivel')
        .setDescription('O nível do seu personagem')
        .setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName('foto')
        .setDescription('URL da foto do seu personagem')
        .setRequired(true),
    ),

  async run({ interaction }: { interaction: ChatInputCommandInteraction }) {
    const name = interaction.options.getString('nome', true);
    const race = interaction.options.getString('raça', true);
    const level = interaction.options.getInteger('nivel', true);
    const mainClass = interaction.options.getString('classe', true);
    const imageUrl = interaction.options.getString('foto', true);

    try {
      const existing = await prisma.character.findFirst({
        where: { characterName: name },
      });

      if (existing) {
        return interaction.reply({
          content: 'Já existe uma ficha com esse nome!',
          flags: MessageFlags.Ephemeral,
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

      return interaction.reply({
        content: `✅ Ficha de **${name}** criada com sucesso!\n• Raça: **${race}**\n• Classe: **${mainClass}**\n• Nível: **${level}**`,
        flags: MessageFlags.Ephemeral,
      });
    } catch {
      return interaction.reply({
        content: '❌ Algo deu errado ao inserir a sua ficha.',
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};

export default command;
