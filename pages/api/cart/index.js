// pages/api/cart.js
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === 'GET') {
    const { userEmail } = req.query;
    console.log(userEmail);
    if (!userEmail) {
        return res.status(400).json({ message: 'Missing userEmail' });
      }
    
    const client = await MongoClient.connect(
      "mongodb+srv://mq08460:3MY3p2JDjarmcwbt@motohub.e4elfjt.mongodb.net/motohub?retryWrites=true&w=majority&appName=MotoHub"
    );

    try {
      const db = client.db();
      const cartCollection = db.collection('carts');
      const cartItems = await cartCollection.find({ userEmail}).toArray();
      console.log(cartItems);
      res.status(200).json(cartItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong while retrieving cart items' });
    } finally {
      await client.close();
    }
  } else if (req.method === 'POST') {
    // Add an item to the cart for the logged-in user
    const { product, userEmail, quantity } = req.body;

    if (!userEmail || !product || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const client = await MongoClient.connect(
      "mongodb+srv://mq08460:3MY3p2JDjarmcwbt@motohub.e4elfjt.mongodb.net/motohub?retryWrites=true&w=majority&appName=MotoHub"
    );

    try {
      const db = client.db();
      const cartCollection = db.collection('carts');

      // Check if the product already exists in the user's cart
      const existingItem = await cartCollection.findOne({ userEmail, productId: product.id });

      if (existingItem) {
        // Update the quantity if the product exists
        await cartCollection.updateOne(
          { userEmail, productId: product.id,productName: product.name, productPrice: product.price },
          { $set: { quantity: existingItem.quantity + quantity } }
        );
        res.status(200).json({ message: 'Item quantity updated' });
      } else {
        // Add new product to the cart
        const newItem = { userEmail, productId: product.id, productName: product.name, productPrice: product.price, quantity };
        await cartCollection.insertOne(newItem);
        res.status(201).json({ message: 'Item added to cart', newItem });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong while adding item to the cart' });
    } finally {
      await client.close();
    }
  } else if (req.method === 'DELETE') {
    // Remove an item from the cart for the logged-in user
    const { productId, userEmail } = req.body;
    console.log(productId, userEmail);
    if (!userEmail || !productId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const client = await MongoClient.connect(
      "mongodb+srv://mq08460:3MY3p2JDjarmcwbt@motohub.e4elfjt.mongodb.net/motohub?retryWrites=true&w=majority&appName=MotoHub"
    );

    try {
      const db = client.db();
      const cartCollection = db.collection('carts');
      const result = await cartCollection.deleteOne({ userEmail, productId });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Item removed from cart' });
      } else {
        res.status(404).json({ message: 'Item not found in the cart' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong while removing item from the cart' });
    } finally {
      await client.close();
    }
  } else if (req.method === 'PUT') {
    // Update the quantity of an item in the cart for the logged-in user
    const { productId, userEmail, quantity } = req.body;
    console.log(productId, userEmail, quantity);
    if (!userEmail || !productId || quantity === undefined || quantity === null) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      
      const client = await MongoClient.connect("mongodb+srv://mq08460:3MY3p2JDjarmcwbt@motohub.e4elfjt.mongodb.net/motohub?retryWrites=true&w=majority&appName=MotoHub")
      
      try {
        const db = client.db();
        const cartCollection = db.collection('carts');
      
        if (quantity === 0) {
          await cartCollection.deleteOne({ userEmail, productId });
          return res.status(200).json({ message: 'Item removed from cart' });
        }
      
        await cartCollection.updateOne({ userEmail, productId }, { $set: { quantity } });
        res.status(200).json({ message: 'Item quantity updated' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while updating item quantity' });
      } finally {
        await client.close();
      }
      
  
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
