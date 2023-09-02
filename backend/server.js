const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const app = express();
const PORT = process.env.PORT || 5000;

const emailUsername = "yadagiri.mallugalla@gmail.com";
const emailPassword = "vumgdmjohjdllxof";
const mongodbURI =
  "mongodb+srv://yadagiri-mallugalla:12345678Admin@mynewappdev.hchxg8z.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const formDataSchema = new mongoose.Schema({
  email: String,
  fullName: String,
  age: Number,
  educationLevel: String,
  study: String,
  institute: String,
  workExperience: String,
  instituteInCanada: String,
  programOfStudy: String,
  applyingFrom: String,
  futureGoals: String,
  readingScore: Number,
  speakingScore: Number,
  writingScore: Number,
  paidTuition: String,
  tuitionFee: Number,
  didGIC: String,
  gicAmount: Number,
});

const FormDataModel = mongoose.model("FormData", formDataSchema);

const trasporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: emailUsername,
    pass: emailPassword,
  },
});

app.post("/submit", async (req, res) => {
  try {
    const newFormData = req.body;
    const savedFormData = await FormDataModel.create(newFormData);

    const mailOptions = {
      from: emailUsername,
      to: newFormData.email,
      subject: "Form Submission Confirmation",
      html: `
      <p>Thank you for submitting the form. Here is a preview of your data:</p>
      <p>Email: ${newFormData.email}</p>
      <p>Full Name: ${newFormData.fullName}</p>
      <p>Age: ${newFormData.age}</p>
      <p>Highest Level of Education: ${newFormData.educationLevel}</p>
      <p>Institute where you completed your highest level of education: ${newFormData.institute}</p>
      <p>What did you study: ${newFormData.study}</p>
      <p>Work Experience:</p>
      <p>${newFormData.workExperience}</p>
      <p>Institute in Canada: ${newFormData.instituteInCanada}</p>
      <p>Program of Study: ${newFormData.programOfStudy}</p>
      <p>Applying From: ${newFormData.applyingFrom}</p>
      <p>Future Goals: ${newFormData.futureGoals}</p>
      <p>Reading Score: ${newFormData.readingScore}</p>
      <p>Speaking Score: ${newFormData.speakingScore}</p>
      <p>Writing Score: ${newFormData.writingScore}</p>
      <p>Did you pay your first year tuition? ${newFormData.paidTuition}</p>
      <p>Tuition Fee: ${newFormData.tuitionFee}</p>
      <p>Did GIC: ${newFormData.didGIC}</p>
      <p>GIC Amount: ${newFormData.gicAmount}</p>
      `,
    };

    trasporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res
      .status(200)
      .json({ message: "Data received successfully!", data: savedFormData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/data", async (req, res) => {
  try {
    const allFormData = await FormDataModel.find();
    res.status(200).json(allFormData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
