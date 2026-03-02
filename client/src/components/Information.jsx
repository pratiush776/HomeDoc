import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

// LoadingState component shows a spinner and rotating messages while waiting for the backend response
const LoadingState = () => {
  const messages = [
    "Analyzing your symptoms...",
    "Consulting our knowledge base...",
    "Generating insights...",
    "Reviewing potential conditions...",
    "Almost there...",
  ];
  const [messageIndex, setMessageIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);

    const timeInterval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-slate-950 max-w-md mx-auto mt-12 flex flex-col items-center justify-center">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>

      <div className="h-8 flex items-center justify-center">
        <p
          key={messageIndex}
          className="text-center text-white animate-fade-in"
        >
          {messages[messageIndex]}
        </p>
      </div>

      {elapsedTime > 8 && (
        <p className="text-sm text-gray-600 mt-4 animate-fade-in">
          This is taking longer than usual. Please wait...
        </p>
      )}
    </div>
  );
};

const Information = ({ setResult }) => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    symptoms: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.age || formData.age < 1 || formData.age > 100)
      formErrors.age = "Age must be a number between 1 and 100";
    if (!formData.symptoms.trim())
      formErrors.symptoms = "Please enter your symptoms";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission while preserving your backend interaction (setResult)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      console.log("Submitting form data:", formData);
      const response = await fetch("https://homedoc-backend.onrender.com/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      // Pass the result to the parent via setResult (which controls the ternary rendering)
      setResult(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show the loading state while fetching data
  if (loading) return <LoadingState />;

  return (
    <div className="h-auto flex items-center justify-center ">
      <motion.div
        initial={{
          opacity: 0.5,
          filter: "drop-shadow(0 0 0rem rgba(255,255,255,0))",
        }}
        whileInView={{ opacity: 1 }}
        whileHover={{
          filter: "drop-shadow(0 0 0.25rem rgb(241 245 249))",
          transition: { duration: 0.3 },
        }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className=" max-h-[45rem] aspect-[2/3] flex flex-col justify-around gap-[1.5rem] items-center bg-slate-700 text-slate-50 rounded-xl p-[2rem]"
      >
        <h2 className=" text-3xl font-bold text-center text-slate-100">
          Enter Your Information
        </h2>

        <form
          onSubmit={handleSubmit}
          className="text-slate-100 flex flex-col gap-[1rem]"
        >
          {/* Age Field */}
          <div className="space-y-2">
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="1"
              max="100"
              placeholder="Enter your age"
              className={`text-slate-800 w-full h-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                errors.age ? "border-red-300" : "border-gray-200"
              }`}
            />
            {errors.age && (
              <p className="text-xs text-red-500 mt-1">{errors.age}</p>
            )}
          </div>

          {/* Gender Field */}
          <div className="space-y-2">
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Male</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Female</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === "other"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Other</span>
              </label>
            </div>
          </div>

          {/* Symptoms Field */}
          <div className="space-y-2">
            <textarea
              id="symptoms"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              rows="6"
              placeholder="Describe your symptoms in detail. Enter all relevant history and information for more accurate diagnostics..."
              className={` text-slate-800 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                errors.symptoms ? "border-red-300" : "border-gray-200"
              }`}
            ></textarea>
            {errors.symptoms && (
              <p className="text-xs text-red-500 mt-1">Symptoms are required</p>
            )}
          </div>
          <p className="text-center text-sm font-light mb-8">
            Note: We use Artificial Intelligence (llama3) for diagnosis.
          </p>
          <button
            type="submit"
            className=" mt-[1rem] w-full bg-green-500 hover:bg-green-200 hover:text-slate-800 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Get Diagnosis
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Information;
