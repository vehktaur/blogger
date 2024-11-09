import 'server-only';
import { ConnectDB } from './config/db';
import UserModel, { User } from './models/UserModel';

export const getUser = async (query: { email?: string; id?: string }) => {
  const { email, id } = query;
  //Connect to the DB

  try {
    await ConnectDB();

    let user: User | null = null;

    if (email) {
      user = await UserModel.findOne({ email: email.toLowerCase() }).lean<User>(
        { virtuals: true },
      );
    } else if (id) {
      user = await UserModel.findById(id).lean<User>({ virtuals: true });
    }

    return user;
  } catch (error) {
    console.log(error);
  }
};
