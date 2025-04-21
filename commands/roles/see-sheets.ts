import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  MessageFlags,
} from 'discord.js';
import { BotCommand } from '../../client';
import prisma from '../../lib/db';

const command: BotCommand = {
  data: new SlashCommandBuilder()
    .setName('verfichas')
    .setDescription('📋 Lista todas as fichas cadastradas (somente DM)'),

  async run({ interaction }: { interaction: ChatInputCommandInteraction }) {
    if (interaction.user.username !== 'lukatyou') {
      return interaction.reply({
        content: '⚠️ Você não tem permissão para usar este comando.',
        flags: MessageFlags.Ephemeral,
      });
    }

    const characters = await prisma.character.findMany({
      orderBy: { characterName: 'asc' },
    });

    if (characters.length === 0) {
      return interaction.reply({
        content: '⚠️ Nenhuma ficha cadastrada.',
        flags: MessageFlags.Ephemeral,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle('📜 Todas as Fichas Registradas')
      .setDescription('Lista de personagens cadastrados no sistema')
      .setThumbnail(interaction.client.user!.displayAvatarURL())
      .addFields(
        characters.map(char => ({
          name: char.characterName,
          value: `👤 Autor: **${char.authorId}**\n📊 Nível: ${char.primaryLevel}${char.secondaryLevel ? ` + ${char.secondaryLevel}` : ''}`,
          inline: true,
        })),
      )
      .setColor('DarkOrange')
      .setTimestamp()
      .setFooter({ text: interaction.client.user!.tag });

    return interaction.reply({
      embeds: [embed],
      flags: MessageFlags.Ephemeral,
    });
  },
};

export default command;
