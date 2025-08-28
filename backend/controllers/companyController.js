import Company from "../models/Company.js";

// get all companies
// support: search (text), name, industry, minEmployees, maxEmployees, minFounded, maxFounded, location, website
export async function getAllCompanies(req, res) {
    try {
        const {
            search,
            name,
            industry,
            minEmployees,
            maxEmployees,
            minFounded,
            maxFounded,
            location,
            sort = '-createdAt',
        } = req.query;

        const q = {};
        if(search) q.name = { $regex : new RegExp(search, 'i') };
        if(name) q.name = name;
        if(industry) q.industry = industry;
        if(minEmployees) q.employees = { $gte : minEmployees };
        if(maxEmployees) q.employees = { $lte : maxEmployees };
        if(minFounded) q.founded = { $gte : minFounded };
        if(maxFounded) q.founded = { $lte : maxFounded };
        if(location) q.location = location;
        
        const companies = await Company.find(q).sort(sort).limit(20);

        res.status(200).json({
            companies
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message : "Server Error"
        })
    }
}

// get a single company by id 
export async function getCompanyById(req, res) {
    try {
        const id = req.params.id;
        const company = await Company.findById(id);
        if(!company){
            res.status(404).json({
                message : "Company not found"
            })
            return;
        }
        res.status(200).json({
            company
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message : "Server Error"
        })
    }
}

// create a new company
export async function createCompany(req, res) {
    try {
        const { name, industry, description, imageUrl, employees, founded, location, website } = req.body

        if(!name || !industry || !description || !employees || !founded || !location || !website || !imageUrl){
            res.status(400).json({
                message : "Missing required fields"
            })
            return;
        }

        const newCompany = await Company.create({
            name,
            industry,
            description,
            employees,
            founded,
            location,
            website,
            imageUrl
        });

        res.status(201).json({
            message : "Company created successfully",
            company : newCompany
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message : "Server Error"
        })
    }
}

// update a company by id
export async function updateCompany(req, res) {
    try {
        const id = req.params.id;
        const { name, industry, description, employees, founded, location, website } = req.body;

        let updatedCompany = {};

        if(name){
            updatedCompany.name = name;
        }

        if(industry){
            updatedCompany.industry = industry;
        }

        if(description){
            updatedCompany.description = description;
        }

        if(employees){
            updatedCompany.employees = employees;
        }

        if(founded){
            updatedCompany.founded = founded;
        }

        if(location){
            updatedCompany.location = location;
        }

        if(website){
            updatedCompany.website = website;
        }

        const company = await Company.findByIdAndUpdate(id, updatedCompany);

        if(!company){
            res.status(404).json({
                message : "Company not found"
            })
            return;
        }

        res.status(200).json({
            message : "Company updated successfully",
            company
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message : "Server Error"
        })
    }
}

export async function deleteCompany(req, res) {
    try {
        const id = req.params.id;
        const company = await Company.findByIdAndDelete(id);

        if(!company){
            res.status(404).json({
                message : "Company not found"
            })
            return;
        }

        res.status(200).json({
            message : "Company deleted successfully",
            company
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message : "Server Error"
        })
    }    
}