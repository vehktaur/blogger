import { StaticImageData } from 'next/image';
import { ConnectDB } from './config/db';
import UserModel, { User } from './models/UserModel';

export const getRandomImages = (
  array: StaticImageData[],
  num: number,
): StaticImageData[] => {
  const selectedImages = new Set<StaticImageData>();

  while (selectedImages.size < num) {
    const randomIndex = Math.floor(Math.random() * array.length);
    selectedImages.add(array[randomIndex]);
  }

  return Array.from(selectedImages);
};

export const getUser = async (query: { email?: string; id?: string }) => {
  const { email, id } = query;
  await ConnectDB();

  let user: User | null = null;

  if (email) {
    user = await UserModel.findOne({ email: email.toLowerCase() }).lean<User>({
      virtuals: true,
    });
  } else if (id) {
    user = await UserModel.findById(id).lean<User>({ virtuals: true });
  }

  return user;
};


export const getFakeUser = () => {
  let user = {
    firstName: 'Victor',
    lastName: 'Akhihiero',
    name: 'Victor Akhihiero',
    email: 'victorakhihiero@gmail.com',
    username: 'vehktaur',
    _id: '',
    role: 'user',
    password: '$2a$10$IUq8yxxA/NlCeNZs08pSg.khLNob9KLA6eTLM3j.uaqRA5SaKRAgi',
    createdAt: new Date('2024-11-02T10:49:26.345+00:00'),
    updatedAt: new Date('2024-11-02T10:49:26.345+00:00'),
  };

  return user;
};