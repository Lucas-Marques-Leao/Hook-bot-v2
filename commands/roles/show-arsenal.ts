import {
  ApplicationCommandDataResolvable,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from 'discord.js';
import prisma from '../../lib/db';

const slash = {
  data: {
    name: 'arsenal',
    description: 'Mostra todas as armas do arsenal',
  } satisfies ApplicationCommandDataResolvable,


  run: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    const weapons = await prisma.weapon.findMany();

    const arsenal = weapons.map(weapon => {
      return weapon.magicBonus && weapon.magicBonus !== 0
        ? `${weapon.name} +${weapon.magicBonus}`
        : weapon.name;
    });

    const embed = new EmbedBuilder()
      .setTitle('Arsenal D&D 5e')
      .setURL('https://www.lmlservertest.x10.mx/index.html')
      .addFields([{ name: 'Armas', value: arsenal.join('\n').slice(0, 1024) || 'Nenhuma arma encontrada' }])
      .setThumbnail(interaction.client.user!.displayAvatarURL())
      .setTimestamp()
      .setFooter({ text: interaction.client.user!.tag })
      .setColor('Orange');

    return await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};

export default slash;
