import mongoose from "mongoose";

export default async function dbConnect(): Promise<void> {
  try {
    await mongoose.connect(
      "mongodb+srv://rajatjs:O8cKLWtV0MPmOQuK@andywebapp.mwetwul.mongodb.net/?retryWrites=true&w=majority" // Add your database name her
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}
