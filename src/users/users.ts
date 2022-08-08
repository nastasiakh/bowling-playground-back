import * as express from 'express';
import {UsersRepository} from './user.repository';
import {Router} from 'express';

export class UsersController {
  private users: UsersRepository;

  constructor(users: UsersRepository) {
    this.users = users;
  }

  build(): Router {
    const router = express.Router();
    router.get('/', async (req, res) => {
      const all = await this.users.getAll();
      res.send(all);
    });

    router.post('/', async (req, res) => {
      // const id = await this.users.create(req.body);
      res.send('Hello world')
      // res.send({...req.body, id});
    });
    return router;
  }
}

