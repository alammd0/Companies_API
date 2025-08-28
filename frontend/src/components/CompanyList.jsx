import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../backend_URl";
import CreateCompanyModal from "./CreateCompanyModal";

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    name: "",
    industry: "",
    minEmployees: 0,
    maxEmployees: 50000,
    minFounded: 2000,
    maxFounded: new Date().getFullYear(),
  });

  const [loading, setLoading] = useState(false);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/companies`, {
        params: filters,
      });
      setCompanies(response.data.companies);
    } catch (err) {
      console.error("Error fetching companies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearch = () => {
    fetchCompanies();
  };

  const handleCreateNew = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleCompanyCreated = (newCompany) => {
    setCompanies((prev) => [newCompany, ...prev]);
    handleModalClose();
    fetchCompanies();
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-50 min-h-screen p-3">
        
      <h2 className="text-center text-3xl fixed left-1 right-1 z-50 font-bold bg-slate-500 px-2 py-4 rounded-2xl text-white shadow-md">
        Companies Directory
      </h2>

      <div className="flex flex-row gap-8 mt-20">
        {/* Filter Sidebar */}
        <div className="w-1/4 h-fit grid grid-cols-1 gap-3 bg-slate-200 p-6 rounded-2xl shadow-lg self-start sticky top-5">
          <h3 className="text-xl font-bold text-slate-700 border-b pb-2">
            Filter Options
          </h3>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="search"
              className="text-md font-semibold text-slate-600"
            >
              Keyword
            </label>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="e.g., tech, finance"
              className="w-full outline-none border-2 border-slate-300 rounded-lg p-2 focus:border-slate-500 transition"
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="industry"
              className="text-md font-semibold text-slate-600"
            >
              Industry
            </label>
            <input
              type="text"
              id="industry"
              name="industry"
              placeholder="e.g., Software, Finance"
              className="w-full outline-none border-2 border-slate-300 rounded-lg p-2 focus:border-slate-500 transition"
              value={filters.industry}
              onChange={handleFilterChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="minEmployees"
              className="text-md font-semibold text-slate-600"
            >
              Min. Employees:{" "}
              <span className="font-bold text-slate-800">
                {filters.minEmployees}
              </span>
            </label>
            <input
              type="range"
              id="minEmployees"
              name="minEmployees"
              className="w-full cursor-pointer"
              min={0}
              max={50000}
              step={100}
              value={filters.minEmployees}
              onChange={handleFilterChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="maxEmployees"
              className="text-md font-semibold text-slate-600"
            >
              Max. Employees:{" "}
              <span className="font-bold text-slate-800">
                {filters.maxEmployees}
              </span>
            </label>
            <input
              type="range"
              id="maxEmployees"
              name="maxEmployees"
              className="w-full cursor-pointer"
              min={0}
              max={50000}
              step={100}
              value={filters.maxEmployees}
              onChange={handleFilterChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="minFounded"
              className="text-md font-semibold text-slate-600"
            >
              Min. Founded Year:{" "}
              <span className="font-bold text-slate-800">
                {filters.minFounded}
              </span>
            </label>
            <input
              type="range"
              id="minFounded"
              name="minFounded"
              className="w-full cursor-pointer"
              min={1800}
              max={new Date().getFullYear()}
              step={1}
              value={filters.minFounded}
              onChange={handleFilterChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="sort"
              className="text-md font-semibold text-slate-600"
            >
              Sort By
            </label>
            <select
              id="sort"
              name="sort"
              className="w-full outline-none border-2 border-slate-300 rounded-lg p-2 focus:border-slate-500 transition"
              value={filters.sort || ""}
              onChange={handleFilterChange}
            >
              <option value="">Default</option>
              <option value="name">Name (A-Z)</option>
              <option value="-name">Name (Z-A)</option>
              <option value="employees">Employees (Low → High)</option>
              <option value="-employees">Employees (High → Low)</option>
              <option value="founded">Founded Year (Oldest → Newest)</option>
              <option value="-founded">Founded Year (Newest → Oldest)</option>
            </select>
          </div>

          <div>
            <button
              onClick={handleSearch}
              className="w-full bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg disabled:bg-slate-400 transition-colors duration-300 shadow-sm"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Companies List */}
        <div className="w-3/4">
          {loading && (
            <p className="text-center text-slate-500 py-10 text-lg">
              Loading companies...
            </p>
          )}

          <div className="flex justify-between items-center mb-6 p-2">
            <p className="text-slate-500 text-lg font-semibold">
              {" "}
              Total {companies.length} companies
            </p>

            <div>
              <button
                onClick={handleCreateNew}
                className="w-full bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg disabled:bg-slate-400 transition-colors duration-300 shadow-sm"
              >
                Create New
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {!loading && companies.length > 0
              ? companies.map((company) => (
                  <div
                    key={company._id}
                    className="bg-white rounded-xl shadow-xl overflow-hidden shadow-slate-200 transform hover:scale-105 transition-transform duration-300 ease-in-out border-1 border-slate-400"
                  >
                    {/* <div className="h-30 overflow-hidden">
                      <img
                        src={company.imageUrl}
                        alt={`${company.name} logo`}
                        className="object-cover bg-center"
                      />
                    </div> */}

                    <div className="h-30 overflow-hidden flex justify-center">
                        <img
                            src={company.imageUrl}
                            alt={`${company.name} logo`}
                            className=" object-cover h-full w-full"
                        />
                    </div>



                    <div className="p-4">
                      <h3 className="text-xl font-bold text-slate-800 truncate">
                        {company.name}
                      </h3>
                      <p className="text-slate-600 text-sm mt-1">
                        {company.industry}
                      </p>
                      <p className="text-slate-500 text-xs mt-2">
                        {company.location}
                      </p>
                      <div className="flex justify-between items-center text-xs text-slate-500 mt-4 pt-2 border-t">
                        <span>
                          Founded:{" "}
                          <span className="font-semibold">
                            {company.founded}
                          </span>
                        </span>
                        <span>
                          Employees:{" "}
                          <span className="font-semibold">
                            {company.employees}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              : !loading && (
                  <div className="col-span-full text-center py-10">
                    <p className="text-slate-500 text-lg">
                      No companies found.
                    </p>
                    <p className="text-slate-400 text-sm">
                      Try adjusting your search filters.
                    </p>
                  </div>
                )}
          </div>
        </div>        
      </div>

      <CreateCompanyModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCompanyCreated={handleCompanyCreated}
      />

    </div>
  );
}
