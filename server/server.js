const express = require("express");
const app = express();
const cors=require("cors");
const corsOptions ={
    origin: ["http://localhost:5173"]
};
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(express.json());
app.use(cors(corsOptions));

app.post("/api",(req,res)=>{
    console.log("api called")
    console.log(req.body)
    result=main(req.body.symptoms)
    console.log(result)
    res.json("Server running...")
});

app.get("/test",(req,res)=>{
    res.json("server is running...")
})

app.listen(8080, ()=> {
    console.log("Server started running on port 8080...")
});

async function main(prompt) {
    try {
      const response = await AiHandler(prompt); // Use await
      return response // This will log the full response from AiHandler
    } catch (error) {
      console.error("Error calling AiHandler:", error);
    }
  }

async function AiHandler(data) {
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        {
          "role": "user",
          "content": data
        },
        {
          "role": "assistant",
          "content": "I'm happy to help you with your initial health assessment. Please provide the symptoms, additional context, user information, and any other relevant details. \n\nOnce you've provided the necessary information, I'll do my best to generate a list of possible health conditions that could be causing your symptoms. I'll provide a brief explanation, possible severity level, and advice on whether immediate medical attention is recommended for each possible condition. I'll also suggest lifestyle adjustments or self-care practices that could provide relief for mild cases.\n\nRemember, it's essential to consult a medical professional for an accurate diagnosis and personalized treatment plan.\n\nPlease provide the necessary information, and I'll get started on your initial health assessment."
        }
      ],
      "model": "llama3-groq-70b-8192-tool-use-preview",
      "temperature": 0.5,
      "max_tokens": 1024,
      "top_p": 0.65,
      "stream": true,
      "stop": null
    });
    let result = ""; // Initialize an empty string to accumulate the response

  // Iterate through the streamed chunks and accumulate the response content
  for await (const chunk of chatCompletion) {
    result += chunk.choices[0]?.delta?.content || '';
  }
  console.log(result,"here")
  return result; // Return the final accumulated response

  }