import * as express from 'express';
import { Router } from 'express';
import {ThrowsRepository} from './throw.repository';

export class ThrowsController{
  private throws: ThrowsRepository;

  constructor(throws: ThrowsRepository){
    this.throws = throws;
  }

  build(): Router {
    const router = express.Router();
    router.get('/', async (req, res) =>{
      const all = await this.throws.getAll()
      res.send(all)
    });

    router.get('/:success', async (req, res) => {
      const success = req.params.success
      const entityById = await this.throws.getById(success)
      res.send( entityById );
    });

    router.post('/', async (req, res) => {
      const id = await this.throws.create(req.body);
      res.send({...req.body, id})
    })

    return router;
  }

}
