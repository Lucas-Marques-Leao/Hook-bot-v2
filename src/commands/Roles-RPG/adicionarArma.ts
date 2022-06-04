import { Command } from "../../Interfaces";
import { getConnection, getRepository } from 'typeorm';
import { Ficha } from '../../models/Ficha';
import { Armas } from "../../models/Armas";




export const slash: Command = {
    name: 'addarma',
    description: 'Adicionar uma Arma a uma ficha',
    testOnly: true,
    options: [
        {
            name: 'nome',
            description: 'O nome da Ficha',
            type: 'STRING',
            required: true,
        },
        {
            name: 'arma',
            description: 'O nome da Arma',
            type: 'STRING',
            required: true,
        },
        {
            name: 'dano',
            description: 'O nome da Arma',
            type: 'STRING',
            required: true,
        },
        {
            name: 'foto',
            description: 'A foto da Arma',
            type: 'STRING',
            required: true,
        },
        {
            name: 'propriedades',
            description: 'As propriedades, se houverem',
            type: 'STRING',

        },
        {
            name: 'magic',
            description: 'O bônus mágico, se houver',
            type: 'INTEGER',
        },
        {
            name: 'descricao',
            description: 'Descrição da Arma',
            type: 'STRING'
        },
    ],
    run: async ({interaction}) => {

        const nome = interaction.options.getString('nome')!;
        const nomeArma = interaction.options.getString('arma')!;
        const dano = interaction.options.getString('dano')!;
        const foto = interaction.options.getString('foto')!;
        const propriedades = interaction.options.getString('propriedades') || '';
        const magic = interaction.options.getInteger('magic') || 0;
        const descrição = interaction.options.getString('descricao') || 'Uma Arma elegante, para tempos mais Civilizados';

        
        const repoArmas = getRepository(Armas);
        const repoFicha = getRepository(Ficha);
        const ficha = await repoFicha.findOne({where: { nome_ficha: nome}});

        if (!ficha) return await interaction.reply({ content: "Ficha não encontrada"})

        if (interaction.user.username === ficha.author_id || interaction.user.username === 'Luk at you'){

            try {
                
                const arma = new Armas();
                arma.nome_arma = nomeArma;
                arma.descrição = descrição;
                arma.dano = dano;
                arma.bonus_magico = magic;
                arma.foto = foto;
                arma.propriedades = propriedades;
                    
                ficha.armas_inventario.push(arma);

                await repoArmas.save(arma);  
                await repoFicha.save(ficha);


                return interaction.reply({ content: `A Arma ${nomeArma}, foi adicionada com sucesso para ${nome}!`});
                
                
            } catch (err) {
                console.log(err);
                return await interaction.reply({ content: 'Algo deu errado ao adicionar suas Armas'});
            }
        }
    }
}