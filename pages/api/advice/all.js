import { getAllAdvice } from '../../../lib/api';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const allAdvice = await getAllAdvice();
      res.status(200).json(allAdvice);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching all advice' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}