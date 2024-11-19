import './App.css';
import './Style.css';
import React, { useState } from 'react';
import InputFieldComponent from "./components/InputFieldComponent";

function App() {
  const [formData, setFormData] = useState({
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userContact: "",
    gender: "",
    subjects: [],
    url: "",
    choice: "",
    about: "",
  });
  const [errors, setErrors] = useState({});

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubjectChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      subjects: checked
        ? [...prev.subjects, value]
        : prev.subjects.filter((subject) => subject !== value),
    }));
  };

  const handleResetClick = () => {
    setFormData({
      userFirstName: "",
      userLastName: "",
      userEmail: "",
      userContact: "",
      gender: "",
      subjects: [],
      url: "",
      choice: "",
      about: "",
    });
    setErrors({});
  };

  const validateFormField = () => {
    const newErrors = {};
    if (!formData.userFirstName) newErrors.userFirstName = "First Name is required";
    if (!formData.userLastName) newErrors.userLastName = "Last Name is required";
    if (!formData.userEmail || !/\S+@\S+\.\S+/.test(formData.userEmail))
      newErrors.userEmail = "Valid userEmail is required";
    if (!formData.userContact || !/^\d{10}$/.test(formData.userContact))
      newErrors.userContact = "Valid 10-digit userContact is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.url || !/^https?:\/\//.test(formData.url))
      newErrors.url = "Valid URL is required";
    if (!formData.choice) newErrors.choice = "Please select an option";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateFormField()) {
      alert("Form submitted successfully!");
      console.log(formData);
      setFormData({
        userFirstName: "",
        userLastName: "",
        userEmail: "",
        userContact: "",
        gender: "",
        subjects: [],
        url: "",
        choice: "",
        about: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form-container">
      <h1 className="form-header">Form in React</h1>
        <InputFieldComponent
          label="First Name"
          name="userFirstName"
          type="text"
          value={formData.userFirstName}
          onChange={handleFormDataChange}
          placeholder="Enter First Name"
          errorMessage={errors.userFirstName}
          required
        />
        <InputFieldComponent
          label="Last Name"
          name="userLastName"
          type="text"
          value={formData.userLastName}
          onChange={handleFormDataChange}
          placeholder="Enter Last Name"
          errorMessage={errors.userLastName}
          required
        />
        <InputFieldComponent
          label="Email"
          name="userEmail"
          type="email"
          value={formData.userEmail}
          onChange={handleFormDataChange}
          placeholder="Enter userEmail"
          errorMessage={errors.userEmail}
          required
        />
        <InputFieldComponent
          label="Contact"
          name="userContact"
          type="tel"
          value={formData.userContact}
          onChange={handleFormDataChange}
          placeholder="Enter userContact"
          errorMessage={errors.userContact}
          required
        />

        <div>
          <label className='radio-label'>Gender <span>*</span></label>
          <div className="radio-option">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleFormDataChange}
              />
              Male
            </label>
            <label >
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleFormDataChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleFormDataChange}
              />
              Other
            </label>
          </div>
          {errors.gender && <small className='formError'>{errors.gender}</small>}
        </div>

        <div>
          <label  className='subject-label'>Your Best Subject</label>
          <div className='subject-option'>
            <label>
              <input className="form-field"
                type="checkbox"
                name="subjects"
                value="English"
                checked={formData.subjects.includes("English")}
                onChange={handleSubjectChange}
              />
              English
            </label>
            <label>
              <input className="form-field"
                type="checkbox"
                name="subjects"
                value="Maths"
                checked={formData.subjects.includes("Maths")}
                onChange={handleSubjectChange}
              />
              Maths
            </label>
            <label>
              <input className="form-field"
                type="checkbox"
                name="subjects"
                value="chemistry"
                checked={formData.subjects.includes("chemistry")}
                onChange={handleSubjectChange}
              />
              chemistry
            </label>
          </div>
          {errors.subjects && <small className='formError'>{errors.subjects}</small>}
        </div>

        <InputFieldComponent
          label="Enter URL"
          name="url"
          type="url"
          value={formData.url}
          onChange={handleFormDataChange}
          placeholder="Enter URL"
          errorMessage={errors.url}
          required
        />

        <div className="dropdown">
          <label  className='choice-label'>Select your choice</label>
          <select className="form-field"
            name="choice"
            value={formData.choice}
            onChange={handleFormDataChange}
          >
            <option value="">Select your answer</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
          {errors.choice && <small className='formError'>{errors.choice}</small>}
        </div>

        <div>
          <label className='about-label'>About</label>
          <textarea className="form-field"
            name="about"
            value={formData.about}
            onChange={handleFormDataChange}
            placeholder="About yourself"
          />
        </div>

        <div>
          <button type="button" onClick={handleResetClick} className="reset-button">
            Reset
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
