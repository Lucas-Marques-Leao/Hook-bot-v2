import { ClientEvents, Events } from 'discord.js';
import { ExtendedClient } from '../client';

interface Run {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (client: ExtendedClient, ...args: any[]): Promise<any> | any;
}

export interface Event {
  name: keyof typeof Events | keyof ClientEvents;
  run: Run;
}
