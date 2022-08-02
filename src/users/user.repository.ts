import {ProfileInfo} from './user.dto';
import {firestore} from 'firebase-admin';
import Firestore = firestore.Firestore;


export class UsersRepository {
  fs: Firestore;

  constructor(fs: Firestore) {
    this.fs = fs;
  }

  async getAll(): Promise<ProfileInfo[]> {
    const reference = await this.fs.collection('users').get();
    return reference.docs.map((data) => {
      return {
        id: data.id,
        name: data.data()['name'],
        gender: data.data()['gender'],
        birthday: data.data()['birthday'],
      };
    });
  }

  async create(user: ProfileInfo): Promise<string> {
    const reference = await this.fs.collection('users').add({
      email: user.email,
      name: user.name,
      gender: user.gender,
      birthday: user.birthday,
    });
    return reference.id;
  }
}
