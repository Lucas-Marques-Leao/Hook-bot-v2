import {
  ApplicationCommandDataResolvable,
  ChatInputCommandInteraction,
  EmbedBuilder,

} from 'discord.js';
import prisma from '../../lib/db';

const slash = {
  data: {
    name: 'verarma',
    description: 'Mostra as características de uma arma',
    options: [
      {
        name: 'id',
        description: 'ID da arma',
        type: 3, // STRING
        required: true,
      },
      {
        name: 'mostrar',
        description: 'Marque True se quiser que outros vejam',
        type: 5, // BOOLEAN
      },
    ],
  } satisfies ApplicationCommandDataResolvable,

  run: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    const id = interaction.options.getString('id', true);
    const mostrar = interaction.options.getBoolean('mostrar');

    const weapon = await prisma.weapon.findUnique({ where: { id } });

    if (!weapon) {
      return await interaction.reply({ content: 'Arma não encontrada.' });
    }

    const hasBonus = weapon.magicBonus && weapon.magicBonus !== 0;
    const weaponName = hasBonus ? `${weapon.name} +${weapon.magicBonus}` : weapon.name;
    const damage = hasBonus ? `${weapon.damage} +${weapon.magicBonus}` : weapon.damage;

    const embed = new EmbedBuilder()
      .setTitle(`Arsenal > ${weapon.name}`)
      .setURL('https://www.lmlservertest.x10.mx/index.html')
      .setThumbnail(interaction.client.user!.displayAvatarURL())
      .addFields(
        { name: 'Nome', value: weaponName, inline: true },
        { name: 'Dano Base', value: damage, inline: true },
        { name: 'Descrição', value: weapon.description },
        { name: 'Propriedades', value: weapon.properties },
      )
      .setImage(weapon.imageUrl)
      .setTimestamp()
      .setFooter({ text: interaction.client.user!.tag })
      .setColor('Orange');

    return await interaction.reply({ embeds: [embed], ephemeral: !mostrar });
  },
};

export default slash;
