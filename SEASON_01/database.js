const { MongoClient } = require("mongodb");

const url = "mongodb+srv://namaste-node:RiyanNodeDB123@namaste-node.rz96f4l.mongodb.net/";


const client = new MongoClient(url);
const dbName = "HelloWorld";

async function main() {
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection("user");

    // to insert data
    const data = {
        firstName: "Chikki",
        lastName: "Rana",
        city: "Jainagar",
    }

    // to insert data
    const insertResult = await collection.insertOne(data);
    console.log("Inserted documents =>", insertResult);

    // // to update data 
    // const updateResult = await collection.updateMany(
    // { city: "Jainagar" },        
    // { $set: { city: "Patna" } });
    // console.log("Updated documents =>", updateResult);

    // // to delete data
    // const deleteResult = await collection.deleteOne(
    // { firstName: "Anshu" });
    // console.log("Deleted documents =>", deleteResult);

    // // to find document
    // const findResult = await collection.find({}).toArray();
    // console.log("Found documents =>", findResult);

    const result = await collection.find({firstName: "Anshu"}).toArray();
    console.log("result =>", result);

    return "done.";
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());