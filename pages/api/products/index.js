import { MongoClient } from "mongodb";


async function handler(req, res) {
  if (req.method === 'GET') {
    const client = await MongoClient.connect(
      "mongodb+srv://mq08460:3MY3p2JDjarmcwbt@motohub.e4elfjt.mongodb.net/motohub?retryWrites=true&w=majority&appName=MotoHub"
      
    );

    try {
      const db = client.db();
      const productsCollection = db.collection('products');
      const products = await productsCollection.find({}).toArray();
      res.status(200).json(products);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    } finally {
      await client.close();
    }
  } else if (req.method === 'POST') {
    const { name, price, category, description, specifications, features } = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://mq08460:3MY3p2JDjarmcwbt@motohub.e4elfjt.mongodb.net/motohub?retryWrites=true&w=majority&appName=MotoHub"
    );
  
    try {
      const db = client.db();
      const productsCollection = db.collection('products');
  
      // Auto-increment product id
      const lastProduct = await productsCollection.find().sort({ id: -1 }).limit(1).toArray();
      console.log(lastProduct);
      let newId = 1;
      if (lastProduct.length > 0) {
        newId = lastProduct[0].id + 1;
      }
  
      const result = await productsCollection.insertOne({
        id: newId,  
        name,
        price,
        category,
        description,
        specifications,
        features
      });
  
      res.status(200).json({ message: 'Product added successfully', productId: newId });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    } finally {
      await client.close();
    }
  }
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
