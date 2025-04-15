import {
  ApplicationCommandDataResolvable,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from 'discord.js';

const slash = {
  data: {
    name: 'comandos',
    description: 'Lista contendo todos os comandos do RPG',
  } satisfies ApplicationCommandDataResolvable,


  run: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    const embed = new EmbedBuilder()
      .setTitle('RPG na Quinta Edição de Dungeons & Dragons')
      .setDescription('Comandos do RPG')
      .setThumbnail(interaction.client.user!.displayAvatarURL())
      .addFields(
        {
          name: '/gerarficha',
          value:
            'Comando para Criar uma Ficha.\nNão permite criar Fichas com o mesmo nome.',
        },
        {
          name: '/status',
          value:
            'Comando para Visualizar os Status (Ficha de um personagem).\nAdicione o Nome do personagem e a Id.',
        },
        {
          name: '/deletarficha',
          value: 'Comando para Deletar uma Ficha.\nUso exclusivo do DM!',
        },
        {
          name: '/setributos',
          value:
            'Comando para Alterar os Atributos de uma Ficha.\nUso exclusivo do DM!',
        },
        {
          name: '/setidade',
          value:
            'Comando para Alterar a Idade.\nAdicione a idade (em valor inteiro) à sua Ficha.',
        },
        {
          name: '/addarma',
          value:
            'Comando para Criar uma Arma dentro de uma Ficha.\nUso exclusivo do DM!',
        },
        {
          name: '/deletarma',
          value: 'Comando para Deletar uma Arma.\nUso exclusivo do DM!',
        },
        {
          name: '/armarse',
          value:
            'Comando para Criar uma Arma existente dentro de uma Ficha pelo ID.\nUso exclusivo do DM!',
        },
        {
          name: '/idarsenal',
          value: 'Comando para Mostrar todas as Armas e seus Ids.',
        },
        {
          name: '/arsenal',
          value: 'Comando para Mostrar todas Armas Existentes.',
        },
        {
          name: '/verarma',
          value:
            'Comando para Mostrar as Informações de uma Arma pelo seu ID.',
        },
      )
      .setTimestamp()
      .setFooter({ text: interaction.client.user!.tag })
      .setColor('DarkOrange');

    return await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};

export default slash;
