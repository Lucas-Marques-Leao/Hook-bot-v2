import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  MessageFlags,
} from 'discord.js';
import { BotCommand } from '../../client';

const command: BotCommand = {
  data: new SlashCommandBuilder()
    .setName('comandos')
    .setDescription('Lista contendo todos os comandos do RPG'),

  async run({ interaction }: { interaction: ChatInputCommandInteraction }) {
    const embed = new EmbedBuilder()
      .setTitle('📘 Comandos do RPG - D&D 5e')
      .setDescription('Veja abaixo todos os comandos disponíveis:')
      .setThumbnail(interaction.client.user!.displayAvatarURL())
      .addFields(
        {
          name: '/rolar',
          value:
            'Rola um dado de acordo com o valor informado.\n*Exemplo: /rolar 1d20+5*',
        },
        {
          name: '/gerarficha',
          value:
            'Cria uma nova ficha de personagem.\n*Evita nomes duplicados.*',
        },
        {
          name: '/status',
          value:
            'Mostra todos os detalhes de uma ficha.\n*Requer o nome da ficha.*',
        },
        {
          name: '/setidade',
          value:
            'Define a idade de uma ficha.\n*Você deve ser o dono da ficha.*',
        },
        {
          name: '/armarse',
          value:
            'Adiciona uma arma existente do arsenal ao inventário da ficha.\n*Por ID.*',
        },
        {
          name: '/addweapon',
          value: 'Cria uma nova arma e vincula a uma ficha.\n*Somente DM.*',
        },
        {
          name: '/deletarma',
          value: 'Deleta uma arma do banco.\n*Somente DM.*',
        },
        {
          name: '/verarma',
          value: 'Exibe os detalhes de uma arma existente.\n*Por nome.*',
        },
        {
          name: '/removerarma',
          value: 'Remove uma arma do inventário da ficha.\n*Por nome.*',
        },
        {
          name: '/arsenal',
          value: 'Lista todas as armas disponíveis no arsenal.',
        },
        {
          name: '/setributos',
          value: 'Atualiza os atributos principais da ficha.\n*Somente DM.*',
        },
        {
          name: '/verinventario',
          value:
            'Lista todas as armas de uma ficha, com descrição e propriedades.',
        },
        {
          name: '/deletarficha',
          value: 'Remove uma ficha do banco de dados.\n*Somente DM.*',
        },
        {
          name: '/verfichas',
          value: 'Lista todas as fichas cadastradas no sistema.\n*Somente DM.*',
        },
      )
      .setColor('DarkOrange')
      .setFooter({ text: interaction.client.user!.tag })
      .setTimestamp();

    return interaction.reply({
      embeds: [embed],
      flags: MessageFlags.Ephemeral,
    });
  },
};

export default command;
