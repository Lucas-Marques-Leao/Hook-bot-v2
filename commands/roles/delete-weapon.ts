import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
} from 'discord.js';
import { BotCommand } from '../../client';
import prisma from '../../lib/db';

const command: BotCommand = {
  data: new SlashCommandBuilder()
    .setName('deletarma')
    .setDescription('Deleta uma arma do banco de dados (somente DM)')
    .addStringOption(option =>
      option
        .setName('id')
        .setDescription('O ID da arma que será excluída')
        .setRequired(true),
    ),

  async run({ interaction }: { interaction: ChatInputCommandInteraction }) {
    if (interaction.user.username !== 'lukatyou') {
      return interaction.reply({
        content: '⚠️ Você não é o DM!',
        flags: MessageFlags.Ephemeral,
      });
    }

    const id = interaction.options.getString('id', true);

    const weapon = await prisma.weapon.findUnique({
      where: { id },
    });

    if (!weapon) {
      return interaction.reply({
        content: '❌ Arma não encontrada.',
        flags: MessageFlags.Ephemeral,
      });
    }

    try {
      await prisma.weapon.delete({ where: { id: weapon.id } });

      return await interaction.reply({
        content: `🗑️ A arma **${weapon.name}** foi deletada com sucesso!`,
      });
    } catch {
      return interaction.reply({
        content: '❌ Algo deu errado ao deletar a arma.',
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};

export default command;
