import { getRepository } from "typeorm";
import { Command } from "../../Interfaces";
import { Armas } from "../../models/Armas";
import { MessageEmbed } from "discord.js";

export const slash: Command = {
    name: 'verarma',
    description: 'Mostra as Características de uma Arma',
    testOnly: true,
    options: [
        {
            name: 'id',
            description: 'id da arma',
            type: 'STRING',
            required: true,
        }
    ],
    run: async ({interaction, client}) => {

        const id = interaction.options.getString('id')!;

        const repo = getRepository(Armas);
        const arma = await repo.findOne({ where: { id: id}});

        if (!arma) return await interaction.reply({ content: "Arma não encontrada."});

        if (!arma.bonus_magico || arma.bonus_magico == 0) {
            var alcunha = `${arma.nome_arma}`;
        }else {
            var alcunha = `${arma.nome_arma} +${arma.bonus_magico}`;
        }

        const membed = new MessageEmbed()
        .setTitle(`Arsenal > ${arma.nome_arma}`)
        .setURL("https://www.lmlservertest.x10.mx/index.html")
        .setThumbnail(client.user!.displayAvatarURL())
        .addFields(
            { name: 'Nome', value: `${alcunha}`, inline: true},
            { name: 'Dano', value: `${arma.dano}`, inline: true},
            { name: 'Propriedades', value: `${arma.propriedades}`},
        )
        .setImage(arma.foto)
        .setTimestamp()
        .setFooter({ text: `${client.user!.tag}`})
        .setColor('RANDOM');

        return await interaction.reply({ embeds: [membed], ephemeral: true});
        

    }
}