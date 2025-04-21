import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
} from 'discord.js';
import { BotCommand } from '../../client';

const rollDice = (formula: string): string => {
  const match = formula.match(/^(\d*)d(\d+)( *[+-] *\d+)?$/i);
  if (!match) return '⚠️ Formato inválido. Use algo como 1d20+2 ou 2d6.';

  const [, rawQtd, rawFaces, rawMod] = match;
  const qtd = Number(rawQtd || '1');
  const faces = Number(rawFaces);
  const mod = rawMod ? Number(rawMod.replace(/\s+/g, '')) : 0;

  const rolls = Array.from(
    { length: qtd },
    () => Math.floor(Math.random() * faces) + 1,
  );
  const total = rolls.reduce((a, b) => a + b, 0) + mod;

  return `🎲 Rolando: \`${formula}\`\nResultado: ${rolls.join(' + ')} ${mod >= 0 ? `+ ${mod}` : `- ${-mod}`} = **${total}**`;
};

const command: BotCommand = {
  data: new SlashCommandBuilder()
    .setName('rolar')
    .setDescription('Rola dados no estilo XdY+Z')
    .addStringOption(option =>
      option
        .setName('formula')
        .setDescription('Ex: 1d20+3, 2d6, 4d8-1')
        .setRequired(true),
    ),

  async run({ interaction }: { interaction: ChatInputCommandInteraction }) {
    const formula = interaction.options.getString('formula', true);
    const result = rollDice(formula);

    return interaction.reply({
      content: result,
      flags: MessageFlags.Ephemeral,
    });
  },
};

export default command;
