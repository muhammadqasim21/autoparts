import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

async function handler(req, res) {
  if (req.method === "POST") {
    const { userEmail } = req.body;
    const client = await MongoClient.connect(
      process.env.MONGODB_URI
    );

    try {
      const db = client.db();
      const cartCollection = db.collection("carts");

      await cartCollection.deleteMany({ userEmail: userEmail });
      

      res.status(200).json({
        message: "Cart Cleared",
    });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    } finally {
      await client.close();
    }
  }
}

export default handler;
