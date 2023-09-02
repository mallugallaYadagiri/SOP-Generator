import React, { useState } from "react";
import "./SOPGenerator.css";
import effizientImage from "../assets/effizient.png";

function SOPGenerator() {
  const initialState = {
    email: "",
    fullName: "",
    age: "",
    educationLevel: "Choose",
    study: "",
    institute: "",
    workExperience: "",
    instituteInCanada: "",
    programOfStudy: "",
    applyingFrom: "",
    futureGoals: "",
    readingScore: "",
    speakingScore: "",
    writingScore: "",
    paidTuition: "Yes",
    tuitionFee: "",
    didGIC: "Yes",
    gicAmount: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithId = {
      ...formData,
    };
    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithId),
      });
      if (!response.ok) {
        throw new Error("HTTP error!Status: ", response.status);
      }
    } catch (error) {
      console.error(error);
    }

    localStorage.setItem("formData", JSON.stringify(formDataWithId));
    // setFormData(initialState);
    alert("Form has been submitted successfully");
  };
  const handleClearForm = () => {
    setFormData(initialState);
  };
  return (
    <div className="container">
      <img
        src={effizientImage}
        alt="Effizient Immigration Inc brand name and logo"
        className="header-image"
      />
      <div className="form-container">
        <h1>Customized SOP Generator</h1>
        <p>
          Fill this questionnaire for the student. After submitting, you will
          receive an email at the email address that you have provided with a
          Statement of Purpose customized for you. You can use and modify that
          as per your needs.
        </p>
        <p>
          If you would like to get it edited, reviewed, or drafted by our
          experts, you can get in touch with us:{" "}
          <a
            href="https://effizient-immigration-inc.square.site/s/shop"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click Here
          </a>
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <label className="label">
            Email <br />
            <input
              className="input"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="text"
              placeholder="Your email"
              required
            />
          </label>
          <label className="label">
            Full Name
            <br />
            <input
              className="input"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              type="text"
              placeholder="Your answer"
              required
            />
          </label>
          <label className="label">
            Age <br />
            <input
              className="input"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              type="text"
              placeholder="Your answer"
              required
            />
          </label>
          <label className="label">
            Highest Level of Education
            <select
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleInputChange}
              required
            >
              <option value="Choose">---Choose---</option>
              <option value="Grade 12">Grade 12</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelors Degree">Bachelors Degree</option>
              <option value="Masters Degree">Masters Degree</option>
              <option value="PhD">PhD</option>
            </select>
          </label>
          <label className="label">
            Institute where you completed your highest level of education
            <br />
            <input
              className="input"
              type="text"
              placeholder="Your answer"
              name="institute"
              value={formData.institute}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="label">
            What did you study
            <br />
            <input
              className="input"
              type="text"
              placeholder="Your answer"
              name="study"
              value={formData.study}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="label">
            Do you have any relevant work experience?
            <br />
            <p className="sub-label">
              Write None if no work experience. Provide the following details if
              yes
              <br />
            </p>
            <ol>
              <li>Job Title</li>
              <li>Company Name</li>
              <li>Job duties</li>
            </ol>
            <p>
              Sample Answer: I worked as a Sales Manager at Effizient
              Immigration Inc from Jan 2022 till Feb 2023. In this role, I
              managed sales operations, reaching out to leads, lead the outreach
              program, ensured meeting monthly targets.
            </p>
            <textarea
              className="input"
              type="text"
              placeholder="Your answer"
              name="workExperience"
              value={formData.workExperience}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="label">
            What institute did you get admitted to in Canada?
            <br />
            <input
              className="input"
              type="text"
              placeholder="Your answer"
              name="instituteInCanada"
              value={formData.instituteInCanada}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="label">
            What is your program of study in Canada?
            <br />
            <input
              className="input"
              type="text"
              placeholder="Your answer"
              name="programOfStudy"
              value={formData.programOfStudy}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="label">
            Which country are you applying from?
            <br />
            <input
              className="input"
              type="text"
              placeholder="Your answer"
              name="applyingFrom"
              value={formData.applyingFrom}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="label">
            What are your future goals?
            <br />
            <textarea
              className="input"
              type="text"
              placeholder="Your answer"
              name="futureGoals"
              value={formData.futureGoals}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="label">
            English Scores - Reading
            <br />
            <input
              className="input"
              type="text"
              placeholder="Your answer"
              name="readingScore"
              value={formData.readingScore}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="label">
            English Scores - Speaking
            <br />
            <input
              className="input"
              type="text"
              placeholder="Your answer"
              name="speakingScore"
              value={formData.speakingScore}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="label">
            English Scores - Writing
            <br />
            <input
              className="input"
              type="text"
              placeholder="Your answer"
              name="writingScore"
              value={formData.writingScore}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="label">
            Did you pay your first year tuition?
            <br />
            <div className="radio-group">
              <input
                type="radio"
                value="Yes"
                name="paidTuition"
                checked={formData.paidTuition === "Yes"}
                onChange={handleInputChange}
              />
              <span>Yes</span>
              <input
                type="radio"
                value="No"
                name="paidTuition"
                checked={formData.paidTuition === "No"}
                onChange={handleInputChange}
              />
              <span>No</span>
            </div>
          </label>
          <label className="label">
            How much tuition fee did you pay?
            <br />
            <input
              className="input"
              type="text"
              placeholder="Your answer"
              name="tuitionFee"
              value={formData.tuitionFee}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="label">
            Did you do a GIC?
            <br />
            <div className="radio-group">
              <input
                type="radio"
                value="Yes"
                name="didGIC"
                checked={formData.didGIC === "Yes"}
                onChange={handleInputChange}
              />
              <span>Yes</span>
              <input
                type="radio"
                value="No"
                name="didGIC"
                checked={formData.didGIC === "No"}
                onChange={handleInputChange}
              />
              <span>No</span>
            </div>
          </label>
          <label className="label">
            How much did you pay towards GIC?
            <br />
            <input
              className="input"
              type="text"
              placeholder="Your answer"
              name="gicAmount"
              value={formData.gicAmount}
              onChange={handleInputChange}
              required
            />
          </label>
          <div className="buttons">
            <button>Submit</button>
            <button
              style={{ backgroundColor: "red" }}
              onClick={handleClearForm}
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SOPGenerator;
