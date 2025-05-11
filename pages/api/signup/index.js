import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, password } = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://mq08460:3MY3p2JDjarmcwbt@motohub.e4elfjt.mongodb.net/motohub?retryWrites=true&w=majority&appName=MotoHub"
      
    );

    try {
      const db = client.db();
      const usersCollection = db.collection('users');
      const existingUser = await usersCollection.findOne({ userEmail: email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // ✅ Hash password securely
      const hashedPassword = await bcrypt.hash(password, 12);

      // ✅ Save user
      await usersCollection.insertOne({
        firstName,
        lastName,
        userEmail: email,
        password: hashedPassword, // ✅ hashed!
        createdAt: new Date()
      });

      res.status(201).json({ message: 'Signed Up!' });

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
