import React, { useState } from 'react';

const Information = ({setResult}) => {
    const [outputData,setOutputData]=useState("")
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
        try {
                fetch('http://localhost:3000/api', {
                        method: 'POST',  
                        headers: {
                            'Content-Type': 'application/json'  
                        },
                        body: JSON.stringify(data)  ,
                        })
                .then(response => response.json())  
                .then(result => {
                    setResult(result)
                })
                .catch(err=>{
                    console.log("there is an error",err)
                });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    return (
        <div class="w-full sm:max-w-md mx-auto bg-white shadow-md rounded-md p-6 mt-10"
        style={{ backgroundColor: `rgb(205,204,204)` }}>

            <h2 className="text-3xl font-bold text-black mb-12 mx-auto">
                Enter your information to diagnose <br />
                <span
                className='text-sm text-black font-normal '>
                    Note: We use Artificial Intelligence (llama3) for diagnosis. 
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
                    <textarea
                        id="symptoms"
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleChange}
                        rows="8"
                        className="w-9/12 block mx-auto my-8 border border-stone-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                        placeholder='Enter your symptoms (Note: Entering more symptoms and explanations lead to a more accurate diagnosis)'
                    ></textarea>
                    {errors.symptoms && <p className="text-sm text-red-600">{errors.symptoms}</p>}
                </div>

                <button
                    className="block mx-auto bg-indigo-600 text-white py-2 px-4 my-8 rounded-md text-2xl
                    hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                    sm:w-full sm:max-w-xs sm:py-4 sm:px-6 sm:text-xl sm:rounded-lg"
                    style={{ zIndex: 9999, position: "relative", maxWidth: '200px' }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Information;
