import { Ficha } from '../../models/Ficha';
import { Command } from '../../Interfaces';
import { MessageEmbed } from 'discord.js';
import { getRepository } from 'typeorm';


export const slash: Command = {
    name: 'status',
    description: 'Todas as Informações da sua Ficha',
    testOnly: true,
    options: [
        {
            name: 'nome',
            description: 'O nome da Ficha',
            type: 'STRING',
            required: true
        }   
    ],
    run: async ({interaction, client}) => {

        const nome = interaction.options.getString('nome')!;

        const fichaRepo = getRepository(Ficha);
        const ficha = await fichaRepo.findOne({where: { nome_ficha: nome}})

        if (ficha!) {

           if (interaction.user.username == ficha?.author_id || interaction.user.username === 'Luk at you') {

            
            let profic = ['+2', '+2', '+2', '+2', '+3', '+3', '+3', '+3', '+4', '+4', '+4', '+4', '+5', '+5', '+5', '+5', '+6', '+6', '+6', '+6', '+7', '+7', '+7', '+7', '+8', '+8', '+8', '+8', '+9', '+9']
        
            const prof = profic[Number((ficha?.nivel_pri!) + (ficha?.nivel_sec || 0))]
            

            const informacaobase = `
            Criador: ${ficha?.author_id!}
   
            Nome: ${ficha?.nome_ficha!} 
            Nível: ${ficha?.nivel_pri! + (ficha?.nivel_sec || 0)}
            Bônus de Proficiência: ${prof}
            Raça: ${ficha?.raça} 
   
            Pontos de Vida: ${ficha?.saude} 
            Pontos de Vida Temporários: ${ficha?.saude_temp}
            
            Idade: ${ficha?.idade} anos
            `;
            const informacaoclasses = 
            `
            Classe Primária: ${ficha?.classe_pri} 
            Nível Primário: ${ficha?.nivel_pri} 
            
            Classe Secundária: ${ficha?.classe_sec} 
            Nível Secundário: ${ficha?.nivel_sec} 
            
            Nível de Conjurador: ${ficha?.nivel_conj}
            `;

            const infomod = "2";
            const infotributos = "212";

            const nomesArmas = ficha?.armas_inventario.map((arma) => {
                return (`${arma.nome_arma}`)
            });



                const membed = new MessageEmbed()
                    .setTitle(`Ficha de D&D 5e`)
                    .setURL("https://www.lmlservertest.x10.mx/suafichajs.html")
                    .setDescription(`Ficha de ${nome}`)
                    .setThumbnail(client.user!.displayAvatarURL())
                    .addFields(

                        { name: 'Usuário:', value: `\n${interaction.user.tag}`},
                        { name: 'Informações básicas', value: informacaobase},
                        { name: 'Classes e Conjuração', value: informacaoclasses},
                        { name: 'Inventário', value: `${nomesArmas?.join('\n')}`},
                        { name: 'Atributos', value: infotributos},
                        { name: 'Modificadores', value: infomod},

                    )
                    .setImage(ficha!.foto)
                    .setTimestamp()
                    .setFooter({ text: `${client.user!.tag}`})
                    .setColor('RANDOM');

                    return await interaction.reply({ embeds: [membed], ephemeral: true});
            
        }else{
            return await interaction.reply({ content: "Você não é o Dono ou o DM."});
        }
      }else{
          return await interaction.reply({ content: "Não foi possível encontrar a Ficha."})
      }
    }
}
