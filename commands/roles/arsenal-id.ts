import {
  ApplicationCommandDataResolvable,
  ChatInputCommandInteraction,
  EmbedBuilder
} from 'discord.js';
import prisma from '../../lib/db';

const slash = {
  data: {
    name: 'idarsenal',
    description: 'Mostra todas as armas do arsenal e seus IDs',
  } satisfies ApplicationCommandDataResolvable,


  run: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    const weapons = await prisma.weapon.findMany();

    const arsenal = weapons.map(weapon => {
      const bonus = weapon.magicBonus && weapon.magicBonus !== 0 ? ` +${weapon.magicBonus}` : '';
      return `${weapon.name}${bonus} • ID: ${weapon.id}`;
    });

    const embed = new EmbedBuilder()
      .setTitle('Identificações das Armas')
      .setURL('https://www.lmlservertest.x10.mx/index.html')
      .addFields([{ name: 'Armas', value: arsenal.join('\n').slice(0, 1024) || 'Nenhuma arma encontrada' }])
      .setThumbnail(interaction.client.user!.displayAvatarURL())
      .setTimestamp()
      .setFooter({ text: interaction.client.user!.tag })
      .setColor('Orange');

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};

export default slash;
