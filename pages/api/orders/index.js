import { MongoClient } from "mongodb";

async function handler(req, res) {
  const client = await MongoClient.connect(
    "mongodb+srv://mq08460:3MY3p2JDjarmcwbt@motohub.e4elfjt.mongodb.net/motohub?retryWrites=true&w=majority&appName=MotoHub"
  );

  const db = client.db();
  const ordersCollection = db.collection("orders");

  if (req.method === "POST") {
    const { userEmail, shippingInfo, items, subtotal, shipping, tax, total, date } = req.body;
    console.log(userEmail, shippingInfo, items, subtotal, shipping, tax, total, date);
    const orderId = 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();

    try {
      const order = await ordersCollection.insertOne({
        orderId,
        userEmail,
        shippingInfo,
        items,
        subtotal,
        shipping,
        tax,
        total,
        date
      });
      res.status(200).json({ message: "Order Placed", orderId: orderId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    } finally {
      await client.close();
    }

  } else if (req.method === "GET") {
    const { email } = req.query;

    if (!email) {
      await client.close();
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      const orders = await ordersCollection.find({ userEmail: email }).toArray();
      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    } finally {
      await client.close();
    }

  } else {
    await client.close();
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export default handler;
