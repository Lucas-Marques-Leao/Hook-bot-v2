import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  MessageFlags,
} from 'discord.js';
import { BotCommand } from '../../client';
import prisma from '../../lib/db';

const command: BotCommand = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Todas as informações da sua ficha')
    .addStringOption(option =>
      option
        .setName('nome')
        .setDescription('O nome da ficha')
        .setRequired(true),
    )
    .addBooleanOption(option =>
      option
        .setName('mostrar')
        .setDescription('Marque true se quiser que todos vejam sua ficha'),
    ),

  async run({ interaction }: { interaction: ChatInputCommandInteraction }) {
    const name = interaction.options.getString('nome', true);
    const mostrar = interaction.options.getBoolean('mostrar');

    const character = await prisma.character.findFirst({
      where: { characterName: name },
      include: { inventory: true },
    });

    if (!character) {
      return interaction.reply({
        content: '❌ Não foi possível encontrar a ficha.',
        flags: MessageFlags.Ephemeral,
      });
    }

    if (
      interaction.user.username !== character.authorId &&
      interaction.user.username !== 'Luk at you'
    ) {
      return interaction.reply({
        content: '⚠️ Você não é o dono da ficha nem o DM.',
        flags: MessageFlags.Ephemeral,
      });
    }

    const proficiency = [
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

    const totalLevel = character.primaryLevel + (character.secondaryLevel ?? 0);
    const prof = proficiency[totalLevel - 1] ?? '+2';
    const mod = (val: number | null) => modifier[(val ?? 10) - 1];

    const strMod = mod(character.strength);
    const dexMod = mod(character.dexterity);
    const conMod = mod(character.constitution);
    const intMod = mod(character.intelligence);
    const wisMod = mod(character.wisdom);
    const chaMod = mod(character.charisma);

    const weapons = character.inventory.map(w =>
      w.magicBonus && w.magicBonus !== 0
        ? `${w.name} +${w.magicBonus}`
        : w.name,
    );

    const embed = new EmbedBuilder()
      .setTitle(`Ficha de D&D 5e`)
      .setURL('https://www.lmlservertest.x10.mx/suafichajs.html')
      .setDescription(`📜 Ficha de ${name}`)
      .setThumbnail(interaction.client.user!.displayAvatarURL())
      .addFields(
        { name: '👤 Usuário:', value: interaction.user.tag },
        {
          name: '📌 Informações básicas',
          value: `
Criador: ${character.authorId}
Nome: ${character.characterName}
Nível: ${totalLevel}
Bônus de Proficiência: ${prof}
Raça: ${character.race}
Pontos de Vida: ${character.health}
Pontos Temporários: ${character.tempHealth}
Idade: ${character.age ?? 'Indefinida'} anos`,
        },
        {
          name: '🧙 Classes e Conjuração',
          value: `
Classe Primária: ${character.primaryClass}
Nível Primário: ${character.primaryLevel}
Classe Secundária: ${character.secondaryClass ?? 'Nenhuma'}
Nível Secundário: ${character.secondaryLevel ?? 0}
Nível de Conjurador: ${character.spellLevel ?? 'N/A'}`,
        },
        {
          name: '🧾 Inventário',
          value: weapons.length > 0 ? weapons.join('\n') : 'Sem armas',
        },
        {
          name: '📊 Atributos',
          value: `
Força: ${character.strength}
Destreza: ${character.dexterity}
Constituição: ${character.constitution}
Inteligência: ${character.intelligence}
Sabedoria: ${character.wisdom}
Carisma: ${character.charisma}`,
        },
        {
          name: '➕ Modificadores',
          value: `
Força: ${strMod}
Destreza: ${dexMod}
Constituição: ${conMod}
Inteligência: ${intMod}
Sabedoria: ${wisMod}
Carisma: ${chaMod}`,
        },
      )
      .setImage(character.imageUrl)
      .setTimestamp()
      .setFooter({ text: interaction.client.user!.tag })
      .setColor('Orange');

    return interaction.reply({
      embeds: [embed],
      flags: mostrar ? undefined : MessageFlags.Ephemeral,
    });
  },
};

export default command;
