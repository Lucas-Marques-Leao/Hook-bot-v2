import {
  Client,
  Collection,
  ApplicationCommandDataResolvable,
} from 'discord.js';
import { readdirSync } from 'fs';
import path = require('path');
import { Command, Event, RegisterCommandOptions } from '../Interfaces';

class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();

  public events: Collection<string, Event> = new Collection();

  public aliases: Collection<string, Command> = new Collection();

  public config = process.env;

  public constructor() {
    super({
      intents: ['GUILD_MESSAGES'],
      partials: ['CHANNEL', 'GUILD_MEMBER', 'USER', 'MESSAGE'],
    });
  }

  async importFile(filepath: string) {
    return (await import(filepath))?.slash;
  }

  async registerCommands({ commands, guildId }: RegisterCommandOptions) {
    if (guildId) {
      this.guilds.cache.get(guildId)?.commands.set(commands);
      console.log('Comandos registrados no Servidor');
    } else {
      this.application?.commands.set(commands);
      console.log('Comandos Registrados Globalmente');
    }
  }

  async registerModules() {
    const slashCommands: ApplicationCommandDataResolvable[] = [];

    const commandPath = path.join(__dirname, '..', 'Commands');
    readdirSync(commandPath).forEach(dir => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter(file =>
        file.endsWith('.ts'),
      );

      commands.forEach(async file => {
        const command: Command = await this.importFile(
          `${commandPath}/${dir}/${file}`,
        );
        console.log(`${command.name} foi carregado com Sucesso!`);
        if (!command.name) return;
        this.commands.set(command.name, command);
        slashCommands.push(command);
      });
    });

    this.on('ready', () => {
      this.registerCommands({
        commands: slashCommands,
        guildId: process.env.TESTSERVER!,
      });
    });
  }

  public async init() {
    this.login(this.config.TOKEN);
    this.registerModules();

    if (!this.config.TESTSERVER!)
      console.log('Id do Servidor de testes não configurado.');

    // Events
    const eventPath = path.join(__dirname, '..', 'Events');
    readdirSync(eventPath).forEach(async file => {
      const { event } = await import(`${eventPath}/${file}`);
      this.events.set(event.name, event);
      console.log(event);
      this.on(event.name, event.run.bind(null, this));
    });
  }
}

export default ExtendedClient;
