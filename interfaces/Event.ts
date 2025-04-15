import { ClientEvents } from 'discord.js';
import Client from '../client';

interface Run {
  (client: Client, ...args: never[]): never;
}

export interface Event {
  name: keyof ClientEvents;
  run: Run;
}
