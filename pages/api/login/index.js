import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    console.log(email, password);
    const client = await MongoClient.connect(
      process.env.MONGODB_URI
    );

    try {
      const db = client.db();
      const usersCollection = db.collection("users");

      const existingUser = await usersCollection.findOne({ userEmail: email });
      if (!existingUser) {
        return res.status(400).json({ message: "Email not found. Register yourself" });
      }
      const passwordmatch = await bcrypt.compare(password,existingUser.password)
      if(!passwordmatch){
        return res.status(500).json({ message: "Incorrect Password" })
      }
      

      res.status(200).json({
        message: "Logged In",
        firstname: existingUser.firstName, 
        lastname: existingUser.lastName
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
