import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../backend_URl";

export default function CreateCompanyModal({ isOpen, onClose, onCompanyCreated }) {
  const [companyData, setCompanyData] = useState({
    name: "",
    industry: "",
    description: "",
    imageUrl: "",
    employees: 0,
    founded: new Date().getFullYear(),
    location: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/companies`, companyData);
      onCompanyCreated(response.data.company);
      setLoading(true)
      onClose();
    } catch (err) {
      console.error("Error creating company:", err);
      setLoading(true)
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center">Create New Company</h2>
        {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-md font-semibold text-slate-600 mb-1">Name</label>
            <input type="text" name="name" value={companyData.name} onChange={handleChange} placeholder="Company Name" required className="w-full outline-none border-2 border-slate-300 rounded-lg p-2 focus:border-slate-500 transition" />
          </div>

          {/* Industry */}
          <div className="flex flex-col">
            <label htmlFor="industry" className="text-md font-semibold text-slate-600 mb-1">Industry</label>
            <input type="text" name="industry" value={companyData.industry} onChange={handleChange} placeholder="e.g., Technology" required className="w-full outline-none border-2 border-slate-300 rounded-lg p-2 focus:border-slate-500 transition" />
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex flex-col">
            <label htmlFor="description" className="text-md font-semibold text-slate-600 mb-1">Description</label>
            <textarea name="description" value={companyData.description} onChange={handleChange} placeholder="A brief description of the company" rows="3" className="w-full outline-none border-2 border-slate-300 rounded-lg p-2 focus:border-slate-500 transition"></textarea>
          </div>

          {/* Image URL */}
          <div className="md:col-span-2 flex flex-col">
            <label htmlFor="imageUrl" className="text-md font-semibold text-slate-600 mb-1">Image URL</label>
            <input type="url" name="imageUrl" value={companyData.imageUrl} onChange={handleChange} placeholder="https://example.com/logo.png" className="w-full outline-none border-2 border-slate-300 rounded-lg p-2 focus:border-slate-500 transition" />
          </div>

          {/* Employees */}
          <div className="flex flex-col">
            <label htmlFor="employees" className="text-md font-semibold text-slate-600 mb-1">Employees</label>
            <input type="number" name="employees" value={companyData.employees} onChange={handleChange} min="0" className="w-full outline-none border-2 border-slate-300 rounded-lg p-2 focus:border-slate-500 transition" />
          </div>

          {/* Founded Year */}
          <div className="flex flex-col">
            <label htmlFor="founded" className="text-md font-semibold text-slate-600 mb-1">Founded Year</label>
            <input type="number" name="founded" value={companyData.founded} onChange={handleChange} min="1000" max={new Date().getFullYear()} className="w-full outline-none border-2 border-slate-300 rounded-lg p-2 focus:border-slate-500 transition" />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label htmlFor="location" className="text-md font-semibold text-slate-600 mb-1">Location</label>
            <input type="text" name="location" value={companyData.location} onChange={handleChange} placeholder="e.g., San Francisco, CA" className="w-full outline-none border-2 border-slate-300 rounded-lg p-2 focus:border-slate-500 transition" />
          </div>

          {/* Website */}
          <div className="flex flex-col">
            <label htmlFor="website" className="text-md font-semibold text-slate-600 mb-1">Website</label>
            <input type="url" name="website" value={companyData.website} onChange={handleChange} placeholder="https://example.com" className="w-full outline-none border-2 border-slate-300 rounded-lg p-2 focus:border-slate-500 transition" />
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2 px-4 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg disabled:bg-slate-400 transition-colors">
              {loading ? "Creating..." : "Create Company"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}