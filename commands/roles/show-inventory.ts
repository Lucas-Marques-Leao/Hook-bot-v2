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
    .setName('verinventario')
    .setDescription('Lista as armas da ficha informada')
    .addStringOption(option =>
      option.setName('nome').setDescription('Nome da ficha').setRequired(true),
    ),

  async run({ interaction }: { interaction: ChatInputCommandInteraction }) {
    const characterName = interaction.options.getString('nome', true);

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

    if (character.inventory.length === 0) {
      return interaction.reply({
        content: `⚠️ A ficha **${characterName}** não possui armas no inventário.`,
        flags: MessageFlags.Ephemeral,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle(`🧾 Inventário de ${character.characterName}`)
      .setDescription('Essas são as armas atualmente equipadas:')
      .setColor('Orange')
      .setThumbnail(interaction.client.user!.displayAvatarURL())
      .addFields(
        character.inventory.map(weapon => ({
          name: `${weapon.name} ${weapon.magicBonus ? `+${weapon.magicBonus}` : ''}`,
          value: `**Dano:** ${weapon.damage}\n**Descrição:** ${weapon.description}\n**Propriedades:** ${weapon.properties}`,
        })),
      )
      .setTimestamp()
      .setFooter({ text: interaction.client.user!.tag });

    return interaction.reply({
      embeds: [embed],
      flags: MessageFlags.Ephemeral,
    });
  },
};

export default command;
