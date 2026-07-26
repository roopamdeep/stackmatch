import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function scoreResume(
  resumeText: string,
  jobDescription: string,
  jobStack: string[],
): Promise<number> {
  const prompt = `
You are a technical recruiter. Score how well this resume matches the job description.

Job Description:
${jobDescription}

Required Tech Stack:
${jobStack.join(", ")}

Resume:
${resumeText}

Return ONLY a number between 0 and 100 representing the match score.
0 = no match, 100 = perfect match.
Return only the number, nothing else.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 10,
  });

  const score = parseInt(response.choices[0].message.content?.trim() || "0");
  return isNaN(score) ? 0 : Math.min(100, Math.max(0, score));
}
