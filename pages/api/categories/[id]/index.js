import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const client = await MongoClient.connect(
      "mongodb+srv://mq08460:3MY3p2JDjarmcwbt@motohub.e4elfjt.mongodb.net/motohub?retryWrites=true&w=majority&appName=MotoHub"
    );

    try {
      const db = client.db();
      const categoriesCollection = db.collection('categories');

      // Find category by id (convert id to number if you’re using numeric ids)
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
