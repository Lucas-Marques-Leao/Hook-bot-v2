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
    ],
    run: async ({interaction}) => {

        const nome = interaction.options.getString('nome')!;
        const nomeArma = interaction.options.getString('arma')!;
        const dano = interaction.options.getString('dano')!;
        const foto = interaction.options.getString('foto')!;
        const propriedades = interaction.options.getString('propriedades') || '';
        const magic = interaction.options.getInteger('magic') || 0;

        
        const repoArmas = getRepository(Armas);
        const repoFicha = getRepository(Ficha);
        

        try {
            

            const ficha = await repoFicha.findOne({where: { nome_ficha: nome}});
            
            const arma = new Armas();
            arma.nome_arma = nomeArma;
            arma.dano = dano;
            arma.bonus_magico = magic;
            arma.foto = foto;
            arma.propriedades = propriedades;
                  
            ficha!.armas_inventario.push(arma);

            await repoArmas.save(arma);  
            await repoFicha.save(ficha!);

            





            return interaction.reply({ content: `A Arma ${nomeArma}, foi adicionada com Sucesso! para ${nome}`});
            
            
        } catch (err) {
            console.log(err);
            return await interaction.reply({ content: 'Algo deu errado ao adicionar suas Armas'});
        }
    }
}