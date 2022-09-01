import {firestore} from 'firebase-admin';
import Firestore = firestore.Firestore;
import {Throw} from './throw.dto';

export class ThrowsRepository{
  fs: Firestore;

  constructor(fs: Firestore) {
    this.fs = fs
  }

  async getAll(): Promise<Throw[]>{
    const reference = await this.fs.collection('throws').get()
    return reference.docs.map((data) => {
      return {
        id: data.id,
        trainingId: data.data()['trainingId'],
        date: data.data()['date'],
        success: data.data()['success']
      };
    });
  }

  async getById(id: string): Promise<Throw[]>{
    const reference = this.fs.collection('throws');
    const filtered = await reference.where('success', '==', id).get()
    return filtered.docs.map((data) => {
      return {
        id: data.id,
        trainingId: data.data()['trainingId'],
        date: data.data()['date'],
        success: data.data()['success']
      }
    })
  }

  async create(throwItem: Throw): Promise<string> {
    await this.fs.collection('throws').add({
      id: throwItem.id,
      trainingId: throwItem.trainingId,
      date: throwItem.date,
      success: throwItem.success
    })
    return 'Result';
  }

}
