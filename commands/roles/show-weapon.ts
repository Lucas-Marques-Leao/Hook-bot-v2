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
    .setName('verarma')
    .setDescription('Mostra as características de uma arma')
    .addStringOption(option =>
      option.setName('nome').setDescription('Nome da arma').setRequired(true),
    )
    .addBooleanOption(option =>
      option
        .setName('mostrar')
        .setDescription('Marque True se quiser que outros vejam'),
    ),

  async run({ interaction }: { interaction: ChatInputCommandInteraction }) {
    const name = interaction.options.getString('nome', true);
    const show = interaction.options.getBoolean('mostrar');

    const weapon = await prisma.weapon.findFirst({ where: { name } });

    if (!weapon) {
      return interaction.reply({
        content: '❌ Arma não encontrada.',
        flags: MessageFlags.Ephemeral,
      });
    }

    const hasBonus = weapon.magicBonus && weapon.magicBonus !== 0;
    const weaponName = hasBonus
      ? `${weapon.name} +${weapon.magicBonus}`
      : weapon.name;
    const damage = hasBonus
      ? `${weapon.damage} +${weapon.magicBonus}`
      : weapon.damage;

    const embed = new EmbedBuilder()
      .setTitle(`🗡️ Arsenal > ${weapon.name}`)
      .setURL('https://www.lmlservertest.x10.mx/index.html')
      .setThumbnail(interaction.client.user!.displayAvatarURL())
      .addFields(
        { name: 'Nome', value: weaponName, inline: true },
        { name: 'Dano Base', value: damage, inline: true },
        { name: 'Descrição', value: weapon.description || 'Sem descrição.' },
        {
          name: 'Propriedades',
          value: weapon.properties || 'Nenhuma propriedade.',
        },
      )
      .setImage(weapon.imageUrl)
      .setTimestamp()
      .setFooter({ text: interaction.client.user!.tag })
      .setColor('Orange');

    return interaction.reply({
      embeds: [embed],
      flags: show ? undefined : MessageFlags.Ephemeral,
    });
  },
};

export default command;
