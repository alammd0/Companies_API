import Company from "../models/Company.js";
import connectDB from "../config/db.js";
import dotenv from "dotenv";
import { IndianSoftwareCompanies} from "./seedData.js";
dotenv.config();


const seedCompanies = async () => {
    try {
        await connectDB();
        await Company.deleteMany({});
        await Company.insertMany(IndianSoftwareCompanies);
        console.log("Companies seeded successfully");
        process.exit(0);
    }
    catch(error){
        console.error(error);
    }
}

seedCompanies();