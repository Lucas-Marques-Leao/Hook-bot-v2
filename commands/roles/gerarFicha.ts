import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { Command } from '../../Interfaces';
import { Ficha } from '../../models/Ficha';

export const slash: Command = {
  name: 'gerarficha',
  description: 'Gera uma Ficha de RPG',
  testOnly: true,
  options: [
    {
      name: 'nome',
      description: 'O Nome do seu personagem',
      required: true,
      type: 'STRING',
    },

    {
      name: 'raça',
      description: 'A raça do seu personagem',
      required: true,
      type: 'STRING',
    },

    {
      name: 'classe',
      description: 'A Classe Principal do seu personagem',
      required: true,
      type: 'STRING',
    },

    {
      name: 'nivel',
      description: 'O nível do seu personagem',
      required: true,
      type: 'INTEGER',
    },

    {
      name: 'foto',
      description: 'URL da foto do seu personagem',
      required: true,
      type: 'STRING',
    },
  ],
  run: async ({ interaction, client }) => {
    //  if (!interaction.member.roles.cache.has("977843725092937758")) {
    //     return interaction.reply({ content: "Você não é do RPG."})
    //  }

    const nome = interaction.options.getString('nome')!;
    const raça = interaction.options.getString('raça')!;
    const nivel = interaction.options.getInteger('nivel')!;
    const classe = interaction.options.getString('classe')!;
    const foto = interaction.options.getString('foto')!;

    const repo = getRepository(Ficha);

    try {
      const ficha = new Ficha();
      ficha.author_id = interaction.user.username;
      ficha.nome_ficha = nome;
      ficha.raça = raça;
      ficha.classe_pri = classe;
      ficha.nivel_pri = nivel;
      ficha.foto = foto;

      const errors = await validate(ficha);

      if (errors.length === 0) {
        await repo.save(ficha);
        return interaction.reply(
          `A Ficha de: ${nome}, da raça ${raça} e da classe ${classe} foi adicionada por ${interaction.user.username}`,
        );
      }
      return interaction.reply({
        content: `Você fez a ficha como um macaco, ERROS: \n${errors}`,
        ephemeral: true,
      });
    } catch (err) {
      console.error(err);
      return interaction.reply('Algo deu errado ao inserir a sua Ficha.');
    }
  },
};
