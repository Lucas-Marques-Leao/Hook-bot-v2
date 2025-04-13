import { getRepository } from "typeorm";
import { Command } from "../../Interfaces";
import { Ficha } from "../../models/Ficha";

export const slash: Command = {
    name: 'deletarficha',
    description: 'Deleta uma Ficha (DM)',
    testOnly: true,
    options: [
        {
            name: 'nome',
            description: 'O nome da ficha que será excluída',
            type: 'STRING',
            required: true,
        }
    ],
    run: async ({interaction}) => {

        if (interaction.user.username === 'Luk at you') {

            const nome = interaction.options.getString('nome')!;

            const repo = getRepository(Ficha);
            const ficha = await repo.findOne({ where: { nome_ficha: nome}})

            if (!ficha) return await interaction.reply({ content: "Ficha não encontrada."})

            try {

                await repo.remove(ficha)
                return await interaction.reply({ content: `A Ficha ${nome} foi deletada com sucesso!`})

            } catch (err) {

                console.log(err);
                await interaction.reply({ content: "Algo deu errado ao deletar a Ficha."});

            }
        }else {
            return await interaction.reply({ content: "Você não é o DM!"});
        }
    }

}
