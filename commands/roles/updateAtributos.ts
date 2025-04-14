import { getRepository } from 'typeorm';
import { Command } from '../../Interfaces/Command';
import { Ficha } from '../../models/Ficha';

export const slash: Command = {
  name: 'setributos',
  description: 'Mudança de Atributos de uma Ficha',
  testOnly: true,
  options: [
    {
      name: 'nome',
      description: 'Nome do personagem',
      type: 'STRING',
      required: true,
    },
    {
      name: 'for',
      description: 'Atributo de Força',
      type: 'INTEGER',
      maxValue: 26,
      minValue: 6,
      required: true,
    },
    {
      name: 'des',
      description: 'Atributo de Destreza',
      type: 'INTEGER',
      maxValue: 26,
      minValue: 6,
      required: true,
    },
    {
      name: 'con',
      description: 'Atributo de Constituição',
      type: 'INTEGER',
      maxValue: 26,
      minValue: 6,
      required: true,
    },
    {
      name: 'int',
      description: 'Atributo de Inteligência',
      type: 'INTEGER',
      maxValue: 26,
      minValue: 6,
      required: true,
    },
    {
      name: 'sab',
      description: 'Atributo de Sabedoria',
      type: 'INTEGER',
      maxValue: 26,
      minValue: 6,
      required: true,
    },
    {
      name: 'car',
      description: 'Atributo de Carisma',
      type: 'INTEGER',
      maxValue: 26,
      minValue: 6,
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const pickOptions = interaction.options;

    const nome = pickOptions.getString('nome')!;
    const força = pickOptions.getInteger('for')!;
    const destreza = pickOptions.getInteger('des')!;
    const constituiçao = pickOptions.getInteger('con')!;
    const inteligencia = pickOptions.getInteger('int')!;
    const sabedoria = pickOptions.getInteger('sab')!;
    const carisma = pickOptions.getInteger('car')!;

    const repo = getRepository(Ficha);
    const ficha = await repo.findOne({ where: { nome_ficha: nome } });

    if (ficha) {
      if (interaction.user.username !== 'Luk at you') {
        return await interaction.reply({ content: 'Você não é o DM' });
      }

      try {
        ficha.str_at = força;
        ficha.dex_at = destreza;
        ficha.con_at = constituiçao;
        ficha.int_at = inteligencia;
        ficha.wis_at = sabedoria;
        ficha.cha_at = carisma;

        await repo.save(ficha);

        return await interaction.reply({
          content: `Atributos Atualizados para ${nome}!`,
        });
      } catch (err) {
        console.log(err);
        return await interaction.reply({
          content: 'Algo de errado ocorreu ao tentar inserir os Atributos',
        });
      }
    } else {
      return await interaction.reply({
        content: 'Esta Ficha não foi encontrada',
      });
    }
  },
};
