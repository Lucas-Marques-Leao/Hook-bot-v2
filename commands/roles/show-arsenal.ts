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
    .setName('arsenal')
    .setDescription('Mostra todas as armas disponíveis no arsenal'),

  async run({ interaction }: { interaction: ChatInputCommandInteraction }) {
    const weapons = await prisma.weapon.findMany();

    const arsenal = weapons.map(weapon =>
      weapon.magicBonus && weapon.magicBonus !== 0
        ? `${weapon.name} +${weapon.magicBonus}`
        : weapon.name,
    );

    const weaponList = arsenal.join('\n').slice(0, 1024); // Discord limit por field

    const embed = new EmbedBuilder()
      .setTitle('🧰 Arsenal D&D 5e')
      .setURL('https://www.lmlservertest.x10.mx/index.html')
      .setDescription('Lista de todas as armas disponíveis no arsenal:')
      .addFields([
        {
          name: 'Armas',
          value: weaponList || 'Nenhuma arma encontrada.',
        },
      ])
      .setThumbnail(interaction.client.user!.displayAvatarURL())
      .setColor('Orange')
      .setTimestamp()
      .setFooter({ text: interaction.client.user!.tag });

    return interaction.reply({
      embeds: [embed],
      flags: MessageFlags.Ephemeral,
    });
  },
};

export default command;
