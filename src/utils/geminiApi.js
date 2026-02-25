import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDi5x6FLgwv97m1rqZkXoHSb87YmzIX0no";
const genAI = new GoogleGenerativeAI(API_KEY);

export const analyzeStudentProfile = async (formData, mode) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let prompt = "";
    
    if (mode === 'A') {
      prompt = `
You are an expert AI Career Counselor. Analyze this student's profile to suggest the best career paths and create a 6-month study roadmap.

Student Profile:
- Name: ${formData.name}
- Branch/Major: ${formData.branch}
- Current Skills: ${formData.skills || "None specified"}
- Core Interests: ${formData.interests || "None specified"}
- Available Study Hours/Week: ${formData.studyHours}
- Preferred Study Mode: ${formData.studyMode}

Return the output STRICTLY as a JSON object with this exact structure (do not include markdown syntax or extra text outside the JSON):
{
  "readiness": 75,
  "topCareers": [
    { "name": "AI Engineer", "score": 85, "description": "Short description." },
    { "name": "Data Analyst", "score": 70, "description": "Short description." },
    { "name": "Software Developer", "score": 60, "description": "Short description." }
  ],
  "missingSkills": [
    { "name": "Maths", "priority": "High" },
    { "name": "Cloud", "priority": "Medium" }
  ],
  "studyInsights": {
    "recommendedDeepWorkHours": 10,
    "focusScore": 80,
    "burnoutRisk": "Low",
    "pattern": "A short 1-sentence tip based on study mode."
  },
  "roadmap": [
    {
      "month": 1,
      "focus": "Monthly Focus",
      "weeklyFocus": ["Week 1 task", "Week 2 task", "Week 3 task", "Week 4 task"],
      "deepWorkWeekly": 10,
      "activeRecallWeekly": 3,
      "spacedRepetitionDays": [1, 3, 7],
      "milestone": "Month 1 milestone"
    },
    { "month": 2, "focus": "...", "weeklyFocus": ["...","...","...","..."], "deepWorkWeekly": 0, "activeRecallWeekly": 0, "spacedRepetitionDays": [1], "milestone": "..." },
    { "month": 3, "focus": "...", "weeklyFocus": ["...","...","...","..."], "deepWorkWeekly": 0, "activeRecallWeekly": 0, "spacedRepetitionDays": [1], "milestone": "..." },
    { "month": 4, "focus": "...", "weeklyFocus": ["...","...","...","..."], "deepWorkWeekly": 0, "activeRecallWeekly": 0, "spacedRepetitionDays": [1], "milestone": "..." },
    { "month": 5, "focus": "...", "weeklyFocus": ["...","...","...","..."], "deepWorkWeekly": 0, "activeRecallWeekly": 0, "spacedRepetitionDays": [1], "milestone": "..." },
    { "month": 6, "focus": "...", "weeklyFocus": ["...","...","...","..."], "deepWorkWeekly": 0, "activeRecallWeekly": 0, "spacedRepetitionDays": [1], "milestone": "..." }
  ]
}
Note for roadmap: create exactly 6 months of data array. Make sure the numerical values reflect the student's study hours.
`;
    } else {
      prompt = `
You are an expert AI Career Counselor. Analyze this student's readiness for their TARGET career and create a 6-month study roadmap to help them achieve it.

Student Profile:
- Name: ${formData.name}
- Branch/Major: ${formData.branch}
- Current Skills: ${formData.skills || "None specified"}
- Target Career: ${formData.targetCareer}
- Available Study Hours/Week: ${formData.studyHours}
- Preferred Study Mode: ${formData.studyMode}

Return the output STRICTLY as a JSON object with this exact structure (do not include markdown syntax or extra text outside the JSON):
{
  "readiness": 50,
  "topCareers": [],
  "missingSkills": [
    { "name": "Required Skill 1", "priority": "High" }
  ],
  "studyInsights": {
    "recommendedDeepWorkHours": 10,
    "focusScore": 80,
    "burnoutRisk": "Low",
    "pattern": "A short 1-sentence tip based on study mode."
  },
  "roadmap": [
    {
      "month": 1,
      "focus": "Monthly Focus",
      "weeklyFocus": ["Week 1 task", "Week 2 task", "Week 3 task", "Week 4 task"],
      "deepWorkWeekly": 10,
      "activeRecallWeekly": 3,
      "spacedRepetitionDays": [1, 3, 7],
      "milestone": "Month 1 milestone"
    },
    { "month": 2, "focus": "...", "weeklyFocus": ["...","...","...","..."], "deepWorkWeekly": 0, "activeRecallWeekly": 0, "spacedRepetitionDays": [1], "milestone": "..." },
    { "month": 3, "focus": "...", "weeklyFocus": ["...","...","...","..."], "deepWorkWeekly": 0, "activeRecallWeekly": 0, "spacedRepetitionDays": [1], "milestone": "..." },
    { "month": 4, "focus": "...", "weeklyFocus": ["...","...","...","..."], "deepWorkWeekly": 0, "activeRecallWeekly": 0, "spacedRepetitionDays": [1], "milestone": "..." },
    { "month": 5, "focus": "...", "weeklyFocus": ["...","...","...","..."], "deepWorkWeekly": 0, "activeRecallWeekly": 0, "spacedRepetitionDays": [1], "milestone": "..." },
    { "month": 6, "focus": "...", "weeklyFocus": ["...","...","...","..."], "deepWorkWeekly": 0, "activeRecallWeekly": 0, "spacedRepetitionDays": [1], "milestone": "..." }
  ]
}
Note for roadmap: create exactly 6 months of data array. Make sure the numerical values reflect the student's study hours.
`;
    }

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    
    // Clean markdown
    responseText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to connect to AI. Please try again.");
  }
};
