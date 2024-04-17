// import-json-to-mongodb.js

const fs = require("fs");
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/sampleDB"; // Replace with your MongoDB connection string
const databaseName = "sampleDB"; // Replace with your database name
const collectionName = "SampleData"; // Replace with your collection name
const jsonFilePath = "sample-data.json"; // Replace with the path to your JSON file

async function importJsonToMongoDB() {
  try {
    // Read JSON file
    const jsonData = fs.readFileSync(jsonFilePath, "utf8");
    const documents = JSON.parse(jsonData);

    // Connect to MongoDB
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    // Insert documents into MongoDB
    const result = await collection.insertMany(documents);
    console.log(`${result.insertedCount} documents inserted successfully`);

    // Close the MongoDB connection
    await client.close();
  } catch (error) {
    console.error("Error importing JSON data to MongoDB:", error);
  }
}

// Call the function to import JSON data to MongoDB
importJsonToMongoDB();
