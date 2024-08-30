import { ConnectDB } from '@/lib/config/db';
import { NextApiRequest } from 'next';

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

const GET = async (request: Request) => {
  console.log('Get blog data');
};

const POST = async (request: Request) => {
  const formData = await request.formData();
  const image = formData.get('image');
  const imageByteData = image?.arrayBuffer();
};
