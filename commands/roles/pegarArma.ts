import { getRepository } from 'typeorm';
import { Command } from '../../interfaces';
import { Armas } from '../../models/Armas';
import { Ficha } from '../../models/Ficha';

export const slash: Command = {
  name: 'armarse',
  description: 'Põe uma arma do arsenal no seu inventário',
  testOnly: true,
  options: [
    {
      name: 'nome',
      description: 'O nome da sua Ficha',
      type: 'STRING',
      required: true,
    },
    {
      name: 'id',
      description: 'O id da Arma do Arsenal',
      type: 'STRING',
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const nome = interaction.options.getString('nome')!;
    const id = interaction.options.getString('id')!;

    const repoFicha = getRepository(Ficha);
    const repoArmas = getRepository(Armas);
    const ficha = await repoFicha.findOne({ where: { nome_ficha: nome } });
    const arma = await repoArmas.findOne({ where: { id } });

    if (!ficha || !arma)
      return await interaction.reply({
        content: 'Ficha ou Arma não encontradas.',
      });

    try {
      ficha.armas_inventario.push(arma);
      await repoFicha.save(ficha);
      return await interaction.reply({
        content: 'Arma adicionada com sucesso!',
      });
    } catch (err) {
      console.log(err);
      return await interaction.reply({
        content: 'Algo deu errado ao Adicionar a Arma à sua Ficha.',
      });
    }
  },
};
