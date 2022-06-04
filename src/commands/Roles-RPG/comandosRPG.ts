import { Command } from "../../Interfaces";
import { MessageEmbed } from "discord.js";

export const slash: Command = {
    name: 'comandos',
    description: 'Lista contendo todos os comandos do RPG',
    testOnly: true,
    run: async ({interaction, client}) => {
        
        const membed = new MessageEmbed()
            .setTitle('RPG na Quinta Edição de Dungeons & Dragons')
            .setDescription(`Comandos do RPG`)
            .setThumbnail(client.user!.displayAvatarURL())
            .addFields(
                { name: '/gerarficha', value: 'Comando para Criar uma ficha.\n Não permite criar fichas com o mesmo nome.'},
                { name: '/status', value: 'Comando para Visualizar os Status (ficha de um personagem).\n Adicione o Nome do personagem e a Id.'},
                { name: '/deletarficha', value: 'Comando para Deletar uma ficha.\n Uso exclusivo do DM!'},
                { name: '/setributos', value: 'Comando para Alterar os Atributos de uma Ficha.\n Uso exclusivo do DM!'},
                { name: '/setidade', value: 'Comando para Alterar a Idade.\n Adicione a idade (Em valor inteiro) à sua ficha'},
                { name: '/addarma', value: 'Comando para Criar uma Arma dentro de uma Ficha\n Uso exclusivo do DM!'},
                { name: '/deletarma', value: 'Comando para Deletar uma Arma.\n Uso exclusivo do DM!'},
                { name: '/armarse', value: 'Comando para Criar uma Arma existente dentro de uma Ficha pelo ID\n Uso exclusivo do DM!'},
                { name: '/idarsenal', value: 'Comando para Mostrar todas as Armas e seus Ids'},
                { name: '/arsenal', value: 'Comando para Mostrar todas Armas Existentes'},
                { name: '/verarma', value: 'Comando para Mostrar as Informações de uma Arma pelo seu ID'},
            )
            .setTimestamp()
            .setFooter({
                text: `${client.user!.tag}`
            })
            .setColor('DARK_ORANGE')


            return await interaction.reply({ embeds: [membed], ephemeral: true});
    }
}



// const membed = new MessageEmbed()
//             .setTitle('RPG na Quinta Edição de Dungeons & Dragons')
//             .setDescription(`Comandos do RPG`)
//             .setThumbnail(client.user.displayAvatarURL())
//             .addFields(
//                 { name: '/addficha', value: 'Comando para Criar uma ficha.\n Não permite criar fichas com o mesmo nome.'},
//                 { name: '/meuid', value: 'Comando para mostrar o Id de uma ficha criada.\n Ele será necessário para acessar as informações da ficha'},
//                 { name: '/fichainfo', value: 'Comando para Visualizar os Status (ficha de um personagem).\n Adicione o Nome do personagem e a Id.'},
//                 { name: '/deleteficha', value: 'Comando para Deletar uma ficha.\n Uso exclusivo do DM!'},
//                 { name: '/updateatributos', value: 'Comando para Alterar os Atributos de uma Ficha.\n Uso exclusivo do DM!'},
//                 { name: '/updateidade', value: 'Comando para Alterar a Idade.\n Adicione a idade (Em valor inteiro) à sua ficha'},
//                 { name: '/addarma', value: 'Comando para Criar uma Arma.\n Uso exclusivo do DM!'},
//             )
//             .setTimestamp()
//             .setFooter({
//                 text: `${client.user.tag}`
//             })
//             .setColor('DARK_ORANGE')


//             return await interaction.reply({ embeds: [membed], ephemeral: true});