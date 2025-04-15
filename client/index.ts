import {
  Client,
  Collection,
  ApplicationCommandDataResolvable,
  CommandInteraction,
  Partials,
  Events,
} from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';
import { env } from 'config/env';

export type BotCommand = {
  data: ApplicationCommandDataResolvable;
  run: (interaction: CommandInteraction) => unknown;
};

export class ExtendedClient extends Client {
  public commands = new Collection<string, BotCommand>();

  constructor() {
    super({
      intents: ["GuildMessages","Guilds"],
      partials: [Partials.Channel, Partials.GuildMember, Partials.User, Partials.Message ],
    });
  }

  async importFile(filePath: string): Promise<BotCommand | undefined> {
    const imported = await import(filePath);
    return imported.default as BotCommand;
  }

  async registerCommands(commands: ApplicationCommandDataResolvable[], guildId?: string) {
    if (guildId) {
      this.guilds.cache.get(guildId)?.commands.set(commands);
      console.log('✅ Comandos registrados localmente');
    } else {
      this.application?.commands.set(commands);
      console.log('✅ Comandos registrados globalmente');
    }
  }

  async registerModules() {
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandPath = path.join(__dirname, '..', 'Commands');

    for (const dir of readdirSync(commandPath)) {
      const files = readdirSync(`${commandPath}/${dir}`).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

      for (const file of files) {
        const filePath = `${commandPath}/${dir}/${file}`;
        const command = await this.importFile(filePath);

        if (!command || !command.data || !('name' in command.data)) continue;

        this.commands.set(command.data.name, command);
        slashCommands.push(command.data);
        console.log(`✅ Comando carregado: ${command.data.name}`);
      }
    }

    this.on(Events.ClientReady, () => {
      this.registerCommands(slashCommands, env.TESTSERVER);
    });
  }

  async init() {
    this.on(Events.Error, console.error);
    this.on(Events.Warn, console.warn);

    await this.login(env.TOKEN);
    await this.registerModules();

    if (!env.TESTSERVER) {
      console.log('⚠️ TESTSERVER não configurado.');
    }

    const eventPath = path.join(__dirname, '..', 'events');
    for (const file of readdirSync(eventPath)) {
      const { event } = await import(`${eventPath}/${file}`);
      if (!event?.name || !event?.run) continue;
      this.on(event.name, event.run.bind(null, this));
      console.log(`📡 Evento registrado: ${event.name}`);
    }
  }
}
