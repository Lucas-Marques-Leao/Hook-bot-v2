import { getRepository } from "typeorm";
import { Command } from "../../Interfaces";
import { Armas } from "../../models/Armas";

export const slash: Command = {
    name: 'deletarma',
    description: 'Deleta uma Arma (DM)',
    testOnly: true,
    options: [
        {
            name: 'id',
            description: 'O id da arma que será excluída',
            type: 'STRING',
            required: true,
        }
    ],
    run: async ({interaction}) => {

        if (interaction.user.username === 'Luk at you') {

            const id = interaction.options.getString('id')!;

            const repo = getRepository(Armas);
            const arma = await repo.findOne({ where: { id: id}})

            if (!arma) return await interaction.reply({ content: "Arma não encontrada."})

            try {

                await repo.remove(arma)
                return await interaction.reply({ content: `A Arma foi deletada com sucesso!`})

            } catch (err) {

                console.log(err);
                await interaction.reply({ content: "Algo deu errado ao deletar a Arma."});

            }
        }else {
            return await interaction.reply({ content: "Você não é o DM!"});
        }
    }

}
