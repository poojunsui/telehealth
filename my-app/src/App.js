import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './App.css';
import Papa from 'papaparse';
import symptomsData from './symptoms.csv';
import NavBar from './components/Navbar';

function App() {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [medicalConditions, setMedicalConditions] = useState([]);
  const [medicationData, setMedicationData] = useState({});

  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
    setMedicationData({});
  };

  useEffect(() => {
    // Fetch data from symptoms.csv
    const fetchData = async () => {
      const response = await fetch(symptomsData);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);
      const results = Papa.parse(csv, { header: false }).data;

      // Filter out all unique symptoms to populate options
      const uniqueSymptoms = [...new Set(results.map((row) => row[1]))];
      const optionsArray = uniqueSymptoms.map((symptom) => ({
        value: symptom,
        label: symptom,
      }));

      // Create an array of objects with medical condition and respective symptoms
      const medicalConditionsArray = results.map((row) => {
        const medicalCondition = row[0];
        const symptoms = row.slice(1);

        return {
          medicalCondition,
          symptoms,
        };
      });

      setOptions(optionsArray);
      setMedicalConditions(medicalConditionsArray);
    };

    fetchData();
  }, []);


// Match selected symptoms with medical conditions
const renderMatchingMedicalConditions = () => {
  // If no symptoms are selected
  if (selectedOptions.length === 0) {
    return (
      <div className="medicalConditionNotFound">
        Please select your symptoms.
      </div>
    );
  }

  // Initialize a set for storing unique medical conditions
  const uniqueMedicalConditions = new Set();

  // Loop through selected symptoms
  selectedOptions.forEach((symptom) => {
    console.log("symptom", symptom);
    // Filter medical conditions that include the current symptom
    const matchingConditions = medicalConditions.filter((condition) =>
    selectedOptions.every((selectedSymptom) => condition.symptoms.includes(selectedSymptom.value))
  );
  
    console.log("matchingConditions", matchingConditions);

    // Add the matching medical conditions to the set
    matchingConditions.forEach((condition) => {
      // Update the uniqueMedicalConditions set to include all matching medical conditions
      uniqueMedicalConditions.add(condition.medicalCondition);
    });
  });

  const uniqueMedicalConditionsArray = Array.from(uniqueMedicalConditions);

  if (uniqueMedicalConditionsArray.length === 0) {
    return (
      <div className="medicalConditionNotFound">
        No matching medical condition found. Please consult a doctor.
      </div>
    );
  }

  // If there is at least one matching medical condition
  return (
    <div>
      {/* Populate Unique Medical Conditions */}
      {uniqueMedicalConditionsArray.map((condition) => (
        <div key={condition}>
          <button
            className="medicalConditionButton"
            // Fetch medication data from backend onclick
            onClick={() => {
              const conditionName = condition;
              fetch(`https://candidate-assignment-5hohk5qryq-as.a.run.app/getDrugs/${conditionName}`)
                .then((response) => response.json())
                .then((data) => {
                  // If medication is found from backend
                  console.log("response", data);
  
                  // Assuming data is an array of medication names
                  if (Array.isArray(data)) {
                    const medication = data;
  
                    // Change data format from array of objects to string
                    setMedicationData((prevState) => ({
                      ...prevState,
                      [conditionName]: medication.join(', '), // Join medication names into a string
                    }));
                  } else {
                    // If no medication is found from backend
                    const medication = "Not found. Please consult a doctor for prescription.";
                    setMedicationData((prevState) => ({
                      ...prevState,
                      [conditionName]: medication,
                    }));
                  }
                })
                .catch((error) => {
                  const medication = "Service is currently unavailable. Please try again later.";
                  setMedicationData((prevState) => ({
                    ...prevState,
                    [conditionName]: medication,
                  }));
                });
            }}
          >
            {condition}
          </button>
          {medicationData[condition] && (
            // Display medication data if available
            <div className="medicationData">
              Medication: {medicationData[condition]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
  
  
};



  return (
    <div className="App">
      {/* NavBar */}
      <NavBar />
      {/* Screen Contents */}
      <div className='container'>
        <div className='centered'>
          <h2>
            What are your symptoms?
          </h2>

          <Select
            options={options}
            value={selectedOptions}
            isMulti
            onChange={handleSelectChange}
            className="selectBar"
          />
        </div>
      </div>

      <div className="containerMedicalConditions">
        <h2>
          Possible Medical Conditions:
        </h2>

        <div className="medicalConditions">
          {renderMatchingMedicalConditions()}
        </div>
      </div>
    </div>
  );
};

export default App;
