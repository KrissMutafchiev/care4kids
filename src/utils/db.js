import mongoose from "mongoose";
let isConnected = false; // Track the connection status

const connect = async () => {

    if (process.env.NODE_ENV === 'development') {
        delete mongoose.connection.models['User'];
      }

    if (isConnected) {
        console.log("Using existing database connection");
        return;
      }

    if (mongoose.connections[0].readyState) {
        console.log("Already connected to the database");
        isConnected = true;
        return;
     } 

    try {
        const db =  await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'care4kids', // Explicitly specify the database name here
        });

        isConnected = true;
        console.log("Mongo Connection successfully established.");
        return db;
    } catch (error) {
        throw new Error("Error connecting to Mongoose");
    }
    
};
 
export default connect;


