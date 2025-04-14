import * as DotDot from 'dotenv';
import { createConnection } from 'typeorm';
import { Event } from '../Interfaces';
import 'reflect-metadata';

DotDot.config();

export const event: Event = {
  name: 'ready',
  run: client => {
    console.log(`O Bot ${client.user!.tag} tá pronto!`);

    createConnection()
      .then(() => {
        console.log('Conectou-se ao Banco de Dados');
      })
      .catch(err => console.log(err));
  },
};
