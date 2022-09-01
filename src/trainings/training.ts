import * as express from 'express';
import {Router} from 'express';
import {TrainingRepository} from './training.repository';

export class TrainingController{
  private training: TrainingRepository;

  constructor(training: TrainingRepository) {
    this.training = training
  }

  build(): Router {
    const router = express.Router();
    router.get('/', async (req, res) =>{
      const all = await this.training.getAll();
      res.send(all)
    });

    router.post('/', async (req, res) => {
      const id = await this.training.create(req.body, req.userId);
      res.send({...req.body, id})
    })

    return router;
  }
}
