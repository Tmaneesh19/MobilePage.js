import React, { useState } from 'react';
import { mobileData } from '../data/mobiles';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const MobilePage = () => {
   // 1) setting up s tate
  const [selectedCompanies, setSelectedCompanies] = useState([]);

    // 2) Get unique companies for checkbox options
    const uniqueCompanies = [...new Set(mobileData.map(item => item.company))];

  // 3 ) Handle the change in checkbox selection
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

   if(checked){
    setSelectedCompanies([...selectedCompanies,value])
   } 
   else{
    setSelectedCompanies(selectedCompanies.filter(company=>company!==value))
   }
  };

  // 4) Filter mobile data based on selected companies
  const filteredMobileData = selectedCompanies.length > 0
    ? mobileData.filter(item => selectedCompanies.includes(item.company))
    : mobileData;

  return (
    <>
      <Navbar />
      <div className="pageContainer" style={{ display: 'flex' }}>
        {/* Filter Section */}
        <div className="filterSection" style={{ width: '200px', padding: '10px' }}>
          <h3>Filter by Company</h3>
          {uniqueCompanies.map((company, index) => (
            <div key={index}>
              <input
                type="checkbox"
                value={company}
                onChange={handleCheckboxChange} // Attach change handler
                checked={selectedCompanies.includes(company)} // Check if selected
              />
              <label>{company}</label>
            </div>
          ))}
        </div>

        {/* Product Section */}
        <div className="pageSection" style={{ marginLeft: '20px' }}>
          {filteredMobileData.map((item) => (
            <div key={item.id}>
              <Link to={`/mobiles/${item.id}`}>
                <div className="pageImg">
                  <img src={item.image} alt="" />
                </div>
              </Link>
              <div className="proModel">
                {item.company}, {item.model}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobilePage;
