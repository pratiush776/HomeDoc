import React from 'react';

// Utility function to format key names into readable headings
const formatKeyName = (key) => {
  return key
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

const Result = ({ data, resetData}) => {
  if (!data) {
    return <p>No data available.</p>;
  }

  return (
    <div
      className="flex flex-col justify-center w-11/12 md:w-3/4 lg:w-1/2 m-auto p-4 rounded-3xl text-center"
      style={{ backgroundColor: `rgb(205,204,204)` }}
    >
      {Object.entries(JSON.parse(data)).map(([key, value]) => {
        const heading = formatKeyName(key);

        // Check if the value is an array
        if (Array.isArray(value)) {
          // Check if it's an array of objects with a 'condition' property
          if (
            value.length > 0 &&
            typeof value[0] === 'object' &&
            value[0].condition
          ) {
            // Render conditions as cards in a horizontal list
            return (
              <div className="mb-6" key={key}>
                <h2 className="text-xl font-semibold mb-2">{heading}</h2>
                <div className="flex space-x-8 overflow-auto">
                  {value.map((condition, index) => (
                    <div
                      key={index}
                      className="min-w-[250px] border p-4 rounded-lg shadow-md bg-gray-100"
                    >
                      <h3 className="text-lg font-bold text-rose-600">
                        {condition.condition}
                      </h3>
                      <p className="text-sm mt-2">
                        <strong>Explanation:</strong> {condition.explanation}
                      </p>
                      <p className="text-sm mt-2">
                        <strong>Severity:</strong> {condition.severity}
                      </p>
                      <p className="text-sm mt-2">
                        <strong>Advice:</strong> {condition.advice}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          } else {
            // Render array of strings as a bulleted list
            return (
              <div className="mb-6" key={key}>
                <h2 className="text-xl font-semibold mb-2">{heading}</h2>
                <ul className="list-disc pl-5 list-none">
                  {value.map((item, index) => (
                    <li key={index} className="text-sm mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
        } else if (typeof value === 'string') {
          // Render string values as paragraphs
          return (
            <div className="mb-6" key={key}>
              <h2 className="text-xl font-semibold mb-2">{heading}</h2>
              <p className="text-sm">{value}</p>
            </div>
          );
        } else {
          // Handle other data types if necessary
          return null;
        }
      })}

    <button
        onClick={resetData}
        className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow-md hover:bg-blue-600 transition"
      >
        Diagnose Another Set of Symptoms
      </button>
    </div>
  );
};

export default Result;
