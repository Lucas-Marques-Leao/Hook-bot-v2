import { MessageEmbed } from 'discord.js';
import { getRepository } from 'typeorm';
import { Command } from '../../Interfaces';
import { Armas } from '../../models/Armas';

export const slash: Command = {
  name: 'idarsenal',
  description: 'Mostra todas as Armas do Arsenal e seus ids',
  testOnly: true,
  run: async ({ interaction, client }) => {
    const repo = getRepository(Armas);
    const armas = await repo.find();

    const arsenal = armas.map(arma => {
      if (!arma.bonus_magico || arma.bonus_magico == 0) {
        return `${arma.nome_arma} id: ${arma.id}`;
      }
      return `${arma.nome_arma} +${arma.bonus_magico} id: ${arma.id}`;
    });

    const membed = new MessageEmbed()
      .setTitle(`Identificações das Armas`)
      .setURL('https://www.lmlservertest.x10.mx/index.html')
      .addField('Armas', `${arsenal.join('\n')}`)
      .setThumbnail(client.user!.displayAvatarURL())
      .setTimestamp()
      .setFooter({ text: `${client.user!.tag}` })
      .setColor('RANDOM');

    return await interaction.reply({ embeds: [membed], ephemeral: true });
  },
};
