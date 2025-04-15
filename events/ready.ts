import { Event } from '../interfaces';

export const event: Event = {
  name: 'ready',
  run: client => {
    console.log(`O Bot ${client.user!.tag} tá pronto!`);
  },
};
