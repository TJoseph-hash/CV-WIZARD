
import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import { OpenAI } from "openai";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();



//Main server script
const app = express( );
const upload = multer();
app.use(cors());

    const token= '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';
    const URL=  'https://models.inference.ai.azure.com'


const openai = new OpenAI({ baseURL: URL, apiKey: token });
//recieves post request trigger onload alert when index.html loads
app.post("/trigger" , (req, res) => {
    console.log("Server Triggered");
    res.send("Server Logic ran");
});
// Uncomment the following line if using Firebase Functions
// import * as functions from "firebase-functions";

// Export the app for Firebase Functions
export const api = app;


app.post("/api/tailor-resume", upload.single("resume"), async (req, res) => {
try {
if (!req.file || !req.body.jobDescription) {
return res.status(400).send("Resume file and job description are required.");
}

// Extract text from PDF
const pdfText = await pdfParse(req.file.buffer).then(data => data.text);
const jobDescription = req.body.jobDescription;

// Call OpenAI API to tailor resume
const response = await openai.chat.completions.create({

messages: [
{ role: "system", content: "You are an expert resume tailor. Modify the resume to match the job description while keeping it professional and truthful.Ensure to remove any conclusion statements" },
{ role: "user", content: `Resume:\n${pdfText}\n\nJob Description:\n${jobDescription}\n\nPlease tailor the resume accordingly.` }
],
 model: "gpt-4o",
 temperature: 1,
 max_tokens: 4096,
 top_p: 1
});

res.send(response.choices[0].message.content);
} catch (error) {
console.error(error);
res.status(500).send("Error processing request.");
} 
});
app.listen(3000, () => console.log("Server running on port 3000....."));
console.log("Processing pdf document.....");
