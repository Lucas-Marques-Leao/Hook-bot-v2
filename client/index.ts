/* eslint-disable no-console */
import {
  Client,
  Collection,
  ApplicationCommandDataResolvable,
  Partials,
  Events,
  ChatInputCommandInteraction,
} from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { env } from '../config/env';

export type BotCommand = {
  data: ApplicationCommandDataResolvable;
  run: (options: {
    client: Client<true>;
    interaction: ChatInputCommandInteraction;
  }) => Promise<unknown> | unknown;
};
export class ExtendedClient extends Client<true> {
  public commands = new Collection<string, BotCommand>();

  constructor() {
    super({
      intents: ['GuildMessages', 'Guilds'],
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.User,
        Partials.Message,
      ],
    });
  }

  async importFile(filePath: string): Promise<BotCommand | undefined> {
    const imported = await import(filePath);
    return imported.default as BotCommand;
  }

  async registerCommands(
    commands: ApplicationCommandDataResolvable[],
    guildId?: string,
  ) {
    if (guildId) {
      this.guilds.cache.get(guildId)?.commands.set(commands);
    } else {
      this.application?.commands.set(commands);
    }
  }

  async registerModules() {
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandPath = join(__dirname, '..', 'commands');

    const entries = readdirSync(commandPath, { withFileTypes: true }).filter(
      e => e.isDirectory(),
    );

    await Promise.all(
      entries.map(async entry => {
        const dirPath = join(commandPath, entry.name);
        const files = readdirSync(dirPath).filter(
          file => file.endsWith('.ts') || file.endsWith('.js'),
        );

        await Promise.all(
          files.map(async file => {
            const filePath = join(dirPath, file);
            const command = await this.importFile(filePath);
            if (command && command.data && 'name' in command.data) {
              this.commands.set(command.data.name, command);
              slashCommands.push(command.data);
            }
          }),
        );
      }),
    );

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

    const eventPath = join(__dirname, '..', 'events');
    const files = readdirSync(eventPath);

    const imports = await Promise.all(
      files.map(async file => {
        const { event } = await import(`${eventPath}/${file}`);
        return event;
      }),
    );

    imports
      .filter(event => event?.name && event?.run)
      .forEach(event => {
        this.on(event.name, event.run.bind(null, this));
        console.log(`📡 Evento registrado: ${event.name}`);
      });
  }
}
