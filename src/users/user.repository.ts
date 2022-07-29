import * as admin from "firebase-admin";
import {ProfileInfo, ProfileInfoRequest} from "./user.dto";


const dbCollection = admin.firestore().collection("users");

// eslint-disable-next-line require-jsdoc
export async function getAll(): Promise<ProfileInfo[]> {
  const reference = await dbCollection.get();
  return reference.docs.map((data) => {
    return {
      id: data.id,
      name: data.data()["name"],
      gender: data.data()["gender"],
      birthday: data.data()["birthday"],
    };
  });
}

// eslint-disable-next-line require-jsdoc
export async function createOne(user: ProfileInfo): Promise<string> {
  const reference = await dbCollection.add({
    email: user.email,
    name: user.name,
    gender: user.gender,
    birthday: user.birthday,
  });
  return reference.id;
}

// eslint-disable-next-line require-jsdoc
export async function update(
    id: string,
    user: ProfileInfoRequest,
): Promise<ProfileInfoRequest> {
  await dbCollection.doc(id).update({
    name: user.name,
    gender: user.gender,
    birthday: user.birthday,
  });
  return {
    id: id,
    name: user.name,
    gender: user.gender,
    birthday: user.birthday,
  };
}
