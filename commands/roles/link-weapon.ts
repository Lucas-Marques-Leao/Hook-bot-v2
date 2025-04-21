import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
} from 'discord.js';
import { BotCommand } from '../../client';
import prisma from '../../lib/db';

const command: BotCommand = {
  data: new SlashCommandBuilder()
    .setName('vinculararma')
    .setDescription('Vincula uma arma do arsenal ao inventário de uma ficha')
    .addStringOption(option =>
      option
        .setName('character')
        .setDescription('Nome da ficha')
        .setRequired(true),
    )
    .addStringOption(option =>
      option.setName('weapon').setDescription('Nome da arma').setRequired(true),
    ),

  async run({ interaction }: { interaction: ChatInputCommandInteraction }) {
    const characterName = interaction.options.getString('character', true);
    const weaponName = interaction.options.getString('weapon', true);

    if (interaction.user.username !== 'lukatyou') {
      return interaction.reply({
        content: '⚠️ Você não é o DM.',
        flags: MessageFlags.Ephemeral,
      });
    }

    const character = await prisma.character.findFirst({
      where: { characterName },
    });

    const weapon = await prisma.weapon.findFirst({
      where: { name: weaponName },
    });

    if (!character || !weapon) {
      return interaction.reply({
        content: '❌ Ficha ou arma não encontrada.',
        flags: MessageFlags.Ephemeral,
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

      return interaction.reply({
        content: `🔗 Arma **${weapon.name}** vinculada à ficha **${character.characterName}**.`,
      });
    } catch {
      return interaction.reply({
        content: '❌ Erro ao vincular a arma.',
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};

export default command;
