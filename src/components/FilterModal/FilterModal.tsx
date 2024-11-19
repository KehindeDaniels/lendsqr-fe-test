// src/components/FilterModal.tsx
import React, { useState } from "react";
import "./filterModal.scss";

interface FilterModalProps {
  toggleModal: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ toggleModal }) => {
  const [name, setName] = useState<string>("");
  const [organization, setOrganization] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const handleFilter = () => {
    console.log("Filtering with:", { name, organization, year });
    toggleModal();
  };

  return (
    <div className="filter-modal">
      <div className="filters">
        <div className="organization">
          <h5>Organization</h5>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="username">
          <h5>Username</h5>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="Organization"
          />
        </div>

        <div className="year">
          <h5>Date</h5>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Select Year</option>
            {new Array(30).fill(0).map((_, idx) => (
              <option key={idx} value={2020 - idx}>
                {2020 - idx}
              </option>
            ))}
          </select>
        </div>
        <div className="buttons">
          <button onClick={toggleModal}>Reset</button>
          <button onClick={handleFilter}>Filter</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
