import React, { useState } from 'react';

const Information = () => {
    
    // State to manage form data and errors
    const [formData, setFormData] = useState({
        age: '',
        gender: 'male',
        symptoms: ''
    });
    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(
            { ...formData,
                [name]: value 
            });
    };

    const validate = () => {
        let formErrors = {};
        if (!formData.age || formData.age < 1 || formData.age > 100) formErrors.age = 'Age must be a number between 1 and 100';
        if (!formData.symptoms) formErrors.symptoms = 'Please enter your symptoms';
        return formErrors;
    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate()

        // Object.keys(validationErrors) returns a list of the keys of the dict in the same order
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
        } else {
            setErrors({})
            fetchAPI(formData); // Pass the input value to fetchAPI
        }

    };

    const fetchAPI = async (data) => {
        console.log(data)
        try {
          const response = await fetch("http://localhost:8080/api", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body:  JSON.stringify(data) // Send the input text in the body
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
        //   const data = await response.json();
        //   setOutput(data.response); // Assume response contains a 'response' key
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    return (
        <div className="">

            <h2 className="text-3xl font-bold text-indigo-600 mb-12 mx-auto">
                Enter your information to diagnose your symptoms <br />
                <span
                className='text-sm text-black font-normal underline'>
                    Note: We use Artificial Intelligence and data from credible 
                medical databases for diagnosis. 
                </span>
                </h2>

            <form onSubmit={handleSubmit}>

                <div className='flex justify-around'>
                    <div className="mb-4">
                        <label htmlFor="age" className="text-2xl font-medium text-gray-700 mb-1">
                            Age:
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            min="1"
                            max="100"
                            className="h-9 p-2 border ml-4 border-stone-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.age && <p className="text-sm text-red-600">{errors.age}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="gender" className="text-2xl font-medium text-gray-700 mb-1">
                            Gender:
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="p-2 ml-4 border border-stone-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="symptoms" className="block text-2xl font-medium text-gray-700 mb-1">
                        Enter your symptoms (Note: Entering more symptoms leads to a more accurate diagnosis):
                    </label>
                    <textarea
                        id="symptoms"
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleChange}
                        rows="8"
                        className="w-9/12 block mx-auto my-8 border border-stone-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                    {errors.symptoms && <p className="text-sm text-red-600">{errors.symptoms}</p>}
                </div>

                <button
                    type="submit"
                    className="mx-auto block bg-indigo-600 text-white py-2 px-4 my-8 rounded-md text-2xl
                    hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Information;
