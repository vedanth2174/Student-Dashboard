import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./middleware/auth.js";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
const GROQ_KEY = process.env.GROQ_API_KEY;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
app.use(express.json());
app.use(cors());

//MongoDB connection
mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("MongoDB connected."))
.catch((err)=>{console.log("Error: "+ err)})

//example schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    pass: String
});

const User = mongoose.model("Student", userSchema);

app.post("/signup", async (req, res)=>{
    try{
        const {name, email, pass} = req.body;
        const ifExists = await User.findOne({email});
        if(ifExists){
            return res.status(400).send("User already exists. Try loggin in.");
        }
        const hashedPass = await bcrypt.hash(pass, 10);
        const newUser = new User ({name, email, pass: hashedPass});
        await newUser.save();


        res.status(201).send("User Saved.")
    }catch(err){
        res.status(500).send("Error saving user."+err);
    }
})
app.post("/login", async (req, res)=>{
    try{
        const {email, pass} = req.body;
        const user = await User.findOne({email});
         if (!user) {
            return res.status(400).send("User not found.");
        }
        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(pass, user.pass);
        if (!isMatch) {
            return res.status(401).send("Invalid password.");
        }

        //Generate jwt
        const token = jwt.sign(
            {id: user._id, username: user.email },
            JWT_SECRET,
            {expiresIn: "1h"}
       );

        res.json({message: "Login Successful", token});
    }catch(err){
        res.status(500).send("Error loggin in."+err);
    }
})


if (!GROQ_KEY) {
  console.warn("GROQ_API_KEY not set. Put it in .env");
}

app.use(cors());
app.use(bodyParser.json());
// app.use(express.static(path.join(process.cwd(), "public")));

app.get("/api/health", authMiddleware, (_req, res) => res.json({ ok: true }));

// Doubt solver
app.post("/api/ask", authMiddleware, async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "Missing question" });

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are a helpful academic tutor. Explain step-by-step and be concise." },
          { role: "user", content: question }
        ],
        max_tokens: 800
      })
    });
    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content || "No response";
    res.json({ answer });
  } catch (err) {
    console.error("ask error:", err);
    res.status(500).json({ error: String(err) });
  }
});

// Notes explainer
app.post("/api/explain-notes", authMiddleware, async (req, res) => {
  try {
    const { notesText } = req.body;
    if (!notesText) return res.status(400).json({ error: "Missing notesText" });
    const prompt = `You are a patient teacher. Explain the following student notes in clear, simple language, provide summaries, key points, and examples if relevant. Notes:\n\n${notesText}`;
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are a helpful notes explainer for students." },
          { role: "user", content: prompt }
        ],
        max_tokens: 1200
      })
    });
    const data = await response.json();
    const explanation = data?.choices?.[0]?.message?.content || "No response";
    res.json({ explanation });
  } catch (err) {
    console.error("explain-notes error:", err);
    res.status(500).json({ error: String(err) });
  }
});

// Generate MCQ test
app.post("/api/generate-test", authMiddleware, async (req, res) => {
  try {
    const { subject, topic, count } = req.body;
    if (!subject || !topic || !count) return res.status(400).json({ error: "subject, topic, count required" });
    const prompt = `Create ${count} multiple-choice questions (4 options each) on the topic "${topic}" for subject "${subject}". For each question return a JSON object with fields: question, options (array of 4 strings), answer (index 0-3). Return a JSON array only.`;
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are a helpful MCQ generator for student practice." },
          { role: "user", content: prompt }
        ],
        max_tokens: 1000
      })
    });
    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || "[]";
    let questions = [];
    try {
      questions = JSON.parse(text);
    } catch (e) {
      const m = text.match(/\[.*\]/s);
      if (m) {
        try { questions = JSON.parse(m[0]); } catch {}
      }
    }
    res.json({ questions, raw: text });
  } catch (err) {
    console.error("generate-test error:", err);
    res.status(500).json({ error: String(err) });
  }
});

app.get("*", (_req, res) => {
  res.send("This is backend");
});

app.listen(PORT, () => console.log(`Student Dashboard running at http://localhost:${PORT}`));
