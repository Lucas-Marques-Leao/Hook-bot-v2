import { MessageEmbed } from 'discord.js';
import { getRepository } from 'typeorm';
import { Ficha } from '../../models/Ficha';
import { Command } from '../../Interfaces';

export const slash: Command = {
  name: 'status',
  description: 'Todas as Informações da sua Ficha',
  testOnly: true,
  options: [
    {
      name: 'nome',
      description: 'O nome da Ficha',
      type: 'STRING',
      required: true,
    },
    {
      name: 'mostrar',
      description: 'Marque true se quiser que todos vejam sua ficha',
      type: 'BOOLEAN',
    },
  ],
  run: async ({ interaction, client }) => {
    const nome = interaction.options.getString('nome')!;
    const mostrar = interaction.options.getBoolean('mostrar');

    const fichaRepo = getRepository(Ficha);
    const ficha = await fichaRepo.findOne({ where: { nome_ficha: nome } });

    if (ficha) {
      if (
        interaction.user.username === ficha.author_id ||
        interaction.user.username === 'Luk at you'
      ) {
        const profic = [
          '+2',
          '+2',
          '+2',
          '+2',
          '+3',
          '+3',
          '+3',
          '+3',
          '+4',
          '+4',
          '+4',
          '+4',
          '+5',
          '+5',
          '+5',
          '+5',
          '+6',
          '+6',
          '+6',
          '+6',
          '+7',
          '+7',
          '+7',
          '+7',
          '+8',
          '+8',
          '+8',
          '+8',
          '+9',
          '+9',
        ];

        const modifier = [
          '-5',
          '-4',
          '-4',
          '-3',
          '-3',
          '-2',
          '-2',
          '-1',
          '-1',
          '0',
          '0',
          '+1',
          '+1',
          '+2',
          '+2',
          '+3',
          '+3',
          '+4',
          '+4',
          '+5',
          '+5',
          '+6',
          '+6',
          '+7',
          '+7',
          '+8',
          '+8',
          '+9',
          '+9',
          '+10',
        ];

        const strMod = modifier[ficha.str_at - 1];
        const dexMod = modifier[ficha.dex_at - 1];
        const conMod = modifier[ficha.con_at - 1];
        const intMod = modifier[ficha.int_at - 1];
        const wisMod = modifier[ficha.wis_at - 1];
        const chaMod = modifier[ficha.cha_at - 1];

        const prof = profic[Number(ficha.nivel_pri! + (ficha.nivel_sec || 0))];

        const informacaobase = `

            Criador: ${ficha.author_id!}

            Nome: ${ficha.nome_ficha!}
            Nível: ${ficha.nivel_pri! + (ficha?.nivel_sec || 0)}
            Bônus de Proficiência: ${prof}
            Raça: ${ficha.raça}

            Pontos de Vida: ${ficha?.saude}
            Pontos de Vida Temporários: ${ficha.saude_temp}

            Idade: ${ficha.idade} anos
            `;
        const informacaoclasses = `
            Classe Primária: ${ficha.classe_pri}
            Nível Primário: ${ficha.nivel_pri}

            Classe Secundária: ${ficha.classe_sec}
            Nível Secundário: ${ficha.nivel_sec}

            Nível de Conjurador: ${ficha.nivel_conj}
            `;

        const infoMod = `

                Mod de Força: ${strMod}
                Mod de Destreza: ${dexMod}
                Mod de Constituição: ${conMod}
                Mod de Inteligência: ${intMod}
                Mod de Sabedoria: ${wisMod}
                Mod de Carisma: ${chaMod}
                `;

        const infoAtributos = `

                Força: ${ficha.str_at}
                Destreza: ${ficha.dex_at}
                Constituição: ${ficha.con_at}
                Inteligência: ${ficha.int_at}
                Sabedoria: ${ficha.wis_at}
                Carisma: ${ficha.cha_at}

                `;

        const nomesArmas = ficha.armas_inventario.map(arma => {
          if (!arma.bonus_magico || arma.bonus_magico === 0) {
            return `${arma.nome_arma}`;
          }
          return `${arma.nome_arma} +${arma.bonus_magico}`;
        });

        const membed = new MessageEmbed()
          .setTitle(`Ficha de D&D 5e`)
          .setURL('https://www.lmlservertest.x10.mx/suafichajs.html')
          .setDescription(`Ficha de ${nome}`)
          .setThumbnail(client.user!.displayAvatarURL())
          .addFields(
            { name: 'Usuário:', value: `\n${interaction.user.tag}` },
            { name: 'Informações básicas', value: `${informacaobase}` },
            { name: 'Classes e Conjuração', value: `${informacaoclasses}` },
            { name: 'Inventário', value: `Armas: \n${nomesArmas?.join('\n')}` },
            { name: 'Atributos', value: `${infoAtributos}` },
            { name: 'Modificadores', value: `${infoMod}` },
          )
          .setImage(ficha.foto)
          .setTimestamp()
          .setFooter({ text: `${client.user!.tag}` })
          .setColor('RANDOM');

        if (mostrar == true) {
          return await interaction.reply({
            embeds: [membed],
            ephemeral: false,
          });
        }
        return await interaction.reply({ embeds: [membed], ephemeral: true });
      }
      return await interaction.reply({
        content: 'Você não é o Dono ou o DM.',
      });
    }
    return await interaction.reply({
      content: 'Não foi possível encontrar a Ficha.',
    });
  },
};
