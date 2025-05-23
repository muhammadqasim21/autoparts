import { MongoClient } from "mongodb";

async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const client = await MongoClient.connect(
        process.env.MONGODB_URI
    );

    try {
      const db = client.db();
      const categoriesCollection = db.collection('categories');

      const category = await categoriesCollection.findOne({ id: Number(id) });

      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }

      res.status(200).json(category);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
