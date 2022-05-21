import { Client, Intents, Collection } from 'discord.js'
import * as fs from 'fs';
import * as Dotdot from 'dotenv';
import { Handler } from './Handlers/Handler';
Dotdot.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const handler = new Handler();


 handler.commands = new Collection();


 const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith("js"))
 const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith("js"))
 const commandFolders = fs.readdirSync("./src/commands");


(async () => {
	 for (const file of functions){
	 	require(`./functions/${file}`)(client)
	 }
	
	client.handleEvents(eventFiles, "./src/events");
	client.handleCommands(commandFolders, "./src/commands");
	client.login(process.env.TOKEN);
	
})();