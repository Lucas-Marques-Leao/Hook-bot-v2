import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
} from 'discord.js';
import { BotCommand } from '../../client';
import prisma from '../../lib/db';

const command: BotCommand = {
  data: new SlashCommandBuilder()
    .setName('deletarficha')
    .setDescription('Deleta uma Ficha (somente DM)')
    .addStringOption(option =>
      option
        .setName('nome')
        .setDescription('O nome da ficha que será excluída')
        .setRequired(true),
    ),

  async run({ interaction }: { interaction: ChatInputCommandInteraction }) {
    if (interaction.user.username !== 'lukatyou') {
      return interaction.reply({
        content: '⚠️ Você não é o DM!',
        flags: MessageFlags.Ephemeral,
      });
    }

    const characterName = interaction.options.getString('nome', true);

    const character = await prisma.character.findFirst({
      where: { characterName },
    });

    if (!character) {
      return interaction.reply({
        content: '❌ Ficha não encontrada.',
        flags: MessageFlags.Ephemeral,
      });
    }

    try {
      await prisma.character.delete({
        where: { id: character.id },
      });

      return await interaction.reply({
        content: `🗑️ A ficha **${characterName}** foi deletada com sucesso!`,
      });
    } catch {
      return interaction.reply({
        content: '❌ Algo deu errado ao deletar a ficha.',
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};

export default command;
