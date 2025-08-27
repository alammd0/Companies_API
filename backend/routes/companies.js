import express from "express";
import { createCompany, deleteCompany, getAllCompanies, getCompanyById, updateCompany } from "../controllers/companyController.js";

const router = express.Router();

router.get("/", getAllCompanies);
router.get("/:id", getCompanyById);
router.post("/", createCompany);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export default router;