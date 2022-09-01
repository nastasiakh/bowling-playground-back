import {firestore} from 'firebase-admin';
import Firestore = firestore.Firestore;
import {Training} from './training.dto';

export class TrainingRepository{
  fs: Firestore;

  constructor(fs: Firestore) {
    this.fs = fs
  }

  async getAll(): Promise<Training[]>{
    const reference = await this.fs.collection('trainings').get()
    return reference.docs.map((data) => {
      return {
        id: data.id,
        userId: data.data()['userId'],
        combination: data.data()['combination'],
        date: data.data()['date']
      }
    })
  }

  async create(newTraining: Training, userId: string): Promise<Training>{
    await this.fs.collection('trainings').add({
      id: newTraining.id,
      userId: userId,
      combination: newTraining.combination,
      date: newTraining.date
    });
    return newTraining;
  }
}
