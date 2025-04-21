import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
} from 'discord.js';
import { BotCommand } from '../../client';
import prisma from '../../lib/db';

const command: BotCommand = {
  data: new SlashCommandBuilder()
    .setName('setributos')
    .setDescription('Atualiza os atributos de uma ficha (DM)')
    .addStringOption(option =>
      option
        .setName('nome')
        .setDescription('Nome do personagem')
        .setRequired(true),
    )
    .addIntegerOption(option =>
      option
        .setName('for')
        .setDescription('Força')
        .setMinValue(6)
        .setMaxValue(26)
        .setRequired(true),
    )
    .addIntegerOption(option =>
      option
        .setName('des')
        .setDescription('Destreza')
        .setMinValue(6)
        .setMaxValue(26)
        .setRequired(true),
    )
    .addIntegerOption(option =>
      option
        .setName('con')
        .setDescription('Constituição')
        .setMinValue(6)
        .setMaxValue(26)
        .setRequired(true),
    )
    .addIntegerOption(option =>
      option
        .setName('int')
        .setDescription('Inteligência')
        .setMinValue(6)
        .setMaxValue(26)
        .setRequired(true),
    )
    .addIntegerOption(option =>
      option
        .setName('sab')
        .setDescription('Sabedoria')
        .setMinValue(6)
        .setMaxValue(26)
        .setRequired(true),
    )
    .addIntegerOption(option =>
      option
        .setName('car')
        .setDescription('Carisma')
        .setMinValue(6)
        .setMaxValue(26)
        .setRequired(true),
    ),

  async run({ interaction }: { interaction: ChatInputCommandInteraction }) {
    if (interaction.user.username !== 'Luk at you') {
      return interaction.reply({
        content: '⚠️ Você não é o DM!',
        flags: MessageFlags.Ephemeral,
      });
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
      return interaction.reply({
        content: '❌ Esta ficha não foi encontrada.',
        flags: MessageFlags.Ephemeral,
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
        content: `📊 Atributos de **${characterName}** atualizados com sucesso!`,
      });
    } catch {
      return interaction.reply({
        content: '❌ Erro ao tentar atualizar os atributos.',
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};

export default command;
