// Default
const Groq = require("groq-sdk");


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main({age,gender,symptoms}) {
    const context = "You are a helpful and knowledgeable AI assistant that specializes in offering initial health assessments based on described symptoms. Use evidence-based medical knowledge to suggest possible conditions that could be causing the symptoms, while clearly emphasizing that this is not a substitute for professional medical advice. Symptoms: The user describes experiencing the following symptoms: [List the specific symptoms provided, e.g., mild headache, reduced appetite, neck pain, weakness]. Additional Context: The user mentions additional relevant details: [Include any extra information provided by the user, such as duration of symptoms, recent travel, or any underlying health conditions]. User Information: - Age: [Users age, if provided] - Gender: [Users gender, if provided] - Other relevant factors: [Include any notable factors, such as pre-existing medical conditions, recent lifestyle changes, or exposure to infections] Objective: - Based on the symptoms and context provided, generate a list of possible health conditions that might explain the symptoms. - For each possible condition, include a brief explanation of the disease in simple terms with symptoms other than the ones matching with the user so that it makes the user easier to tally and confirm which disease s/he is most likely suffering from, possible severity level, and advice on whether immediate medical attention is recommended. - Also Must Suggest lifestyle adjustments or self-care practices that could provide relief for mild cases but recommend seeing a healthcare professional for further evaluation. Remember to always advise the user to consult a medical professional for an accurate diagnosis and personalized treatment plan. I want the result in javascript object. I want possible diseases in a list and severity and other suggestions and recommendations of it.";
    const prompt = `
Symptoms:
The user describes experiencing the following symptoms: ${symptoms}.

User Information:
- Age: ${age}
- Gender: ${gender}

use the system context

always give a disclaimer at the end too`;

  const completion = await groq.chat.completions
    .create({
      messages: [
        {role:"system",
            content:context
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-groq-70b-8192-tool-use-preview",
    })
    .then((chatCompletion) => {
      result = chatCompletion.choices[0]?.message?.content || "";
      
    });
    // console.log(result)
    return result
}

module.exports = main;