import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

async function handler(req, res) {
  if (req.method === 'GET') {
    
    const client = await MongoClient.connect(
      process.env.MONGODB_URI
      
    );

    try {
      const db = client.db();
      const categoriesCollection = db.collection('categories');
      const categories = await categoriesCollection.find({}).toArray();
      res.status(200).json(categories);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    } finally {
      await client.close();
    }
  } else if (req.method === 'POST') {
    const { name, description } = req.body;
    const client = await MongoClient.connect(
      process.env.MONGODB_URI
    );
    try{
      const db = client.db();
      const categoriesCollection = db.collection('categories');
      const lastCategory = await categoriesCollection.find().sort({ id: -1 }).limit(1).toArray();
      console.log(lastCategory);
      let newId = 1;
      if (lastCategory.length > 0) {
        newId = lastCategory[0].id + 1;
      }
      const result = await categoriesCollection.insertOne({ id: newId, name, description });
      res.status(200).json({ message: 'Category added successfully', categoryId: result.insertedId });
    }
    catch(error){
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
    finally{
      await client.close();
    }
  }
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
