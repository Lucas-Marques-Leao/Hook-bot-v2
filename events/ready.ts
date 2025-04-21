import { Event } from '../interfaces';

export const event: Event = {
  name: 'ready',
  run: client => {
    // eslint-disable-next-line no-console
    console.log(`O Bot ${client.user!.tag} tá pronto!`);
  },
};
