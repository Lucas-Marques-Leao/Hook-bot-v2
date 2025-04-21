import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
} from 'discord.js';
import { BotCommand } from '../../client';
import prisma from '../../lib/db';

const command: BotCommand = {
  data: new SlashCommandBuilder()
    .setName('removerarma')
    .setDescription('Remove uma arma do inventário de uma ficha')
    .addStringOption(option =>
      option.setName('nome').setDescription('Nome da ficha').setRequired(true),
    )
    .addStringOption(option =>
      option.setName('arma').setDescription('Nome da arma').setRequired(true),
    ),

  async run({ interaction }: { interaction: ChatInputCommandInteraction }) {
    const characterName = interaction.options.getString('nome', true);
    const weaponName = interaction.options.getString('arma', true);

    const character = await prisma.character.findFirst({
      where: { characterName },
      include: { inventory: true },
    });

    if (!character) {
      return interaction.reply({
        content: '❌ Ficha não encontrada.',
        flags: MessageFlags.Ephemeral,
      });
    }

    if (
      interaction.user.id !== character.authorId &&
      interaction.user.username !== 'lukatyou'
    ) {
      return interaction.reply({
        content: '⚠️ Você não tem permissão para editar essa ficha.',
        flags: MessageFlags.Ephemeral,
      });
    }

    const weapon = character.inventory.find(
      w => w.name.toLowerCase() === weaponName.toLowerCase(),
    );

    if (!weapon) {
      return interaction.reply({
        content: `❌ A arma "${weaponName}" não foi encontrada no inventário da ficha.`,
        flags: MessageFlags.Ephemeral,
      });
    }

    try {
      await prisma.character.update({
        where: { id: character.id },
        data: {
          inventory: {
            disconnect: { id: weapon.id },
          },
        },
      });

      return interaction.reply({
        content: `🛡️ A arma **${weapon.name}** foi removida do inventário de **${character.characterName}**.`,
      });
    } catch {
      return interaction.reply({
        content: '❌ Erro ao remover a arma.',
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};

export default command;
