import { REST }  from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import * as fs from 'fs';
import * as Dotdot from 'dotenv';
Dotdot.config();

const clientId = "977674005974761492";
const guildId = "970802893798117406";


export = (client) => {
  client.handleCommands = async (commandFolders, path) => {
    client.commandArray = [];
    
    for (const folder of commandFolders) {
      const commandFiles = fs.readdirSync(`${path}/${folder}`).filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);

        client.commands.set(command.data.name, command);
        client.commandArray.push(command.data.toJSON());
      }
    }
    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

    (async () => {
      try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
          body: client.commandArray
        });

        console.log("Successfully reloaded application (/) commands.");
      } catch (error) {
        console.error(error);
      }
    })();
  };
};
