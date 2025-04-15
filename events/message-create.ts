import { Message, MessageEmbed, Permissions } from 'discord.js';
import { Command, Event } from '../interfaces';
import { env } from 'config/env';


export const event: Event = {
  name: 'messageCreate',
  run: async (_, message: Message) => {
    if (
      message.author.bot ||
      !message.content.startsWith(env.PREFIX) ||
      message.channel.type === 'DM'
    )
      return;

    const args = message.content.slice(1).trim().split(/ +/g);

    const cmd = args.shift()?.toLowerCase();
    if (!cmd) return;

    message.reply('eae!');
  },
};

//         cmd.run(client, message, interaction, args);
//       } catch (error) {
//         console.error(error);
//         interaction.reply({
//           content: "Houve um erro ao executar este comando",
//           ephemeral: true,
//         });
//       }
//     },
//   };
