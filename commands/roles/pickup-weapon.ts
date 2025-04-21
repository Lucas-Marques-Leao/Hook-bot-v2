import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
} from 'discord.js';
import { BotCommand } from '../../client';
import prisma from '../../lib/db';

const command: BotCommand = {
  data: new SlashCommandBuilder()
    .setName('armarse')
    .setDescription('Põe uma arma do arsenal no seu inventário')
    .addStringOption(option =>
      option
        .setName('nome')
        .setDescription('O nome da sua ficha')
        .setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName('id')
        .setDescription('O ID da arma do arsenal')
        .setRequired(true),
    ),

  async run({ interaction }: { interaction: ChatInputCommandInteraction }) {
    const characterName = interaction.options.getString('nome', true);
    const weaponId = interaction.options.getString('id', true);

    const character = await prisma.character.findFirst({
      where: { characterName },
    });

    const weapon = await prisma.weapon.findUnique({
      where: { id: weaponId },
    });

    if (!character || !weapon) {
      return interaction.reply({
        content: '❌ Ficha ou arma não encontradas.',
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

      return await interaction.reply({
        content: `🗡️ A arma **${weapon.name}** foi adicionada ao inventário de **${character.characterName}**.`,
      });
    } catch {
      return interaction.reply({
        content: '❌ Algo deu errado ao adicionar a arma à sua ficha.',
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};

export default command;
