export const MOCK_API_RESPONSE_MODE_A = {
  readiness: 72,
  topCareers: [
    { name: "Data Analyst", score: 85, description: "Analyze data to help companies make better decisions." },
    { name: "AI Engineer", score: 72, description: "Build intelligent systems and machine learning models." },
    { name: "Software Developer", score: 65, description: "Design and implement scalable software solutions." }
  ],
  missingSkills: [
    { name: "Python", priority: "High" },
    { name: "Statistics", priority: "High" },
    { name: "SQL", priority: "Medium" }
  ],
  studyInsights: {
    recommendedDeepWorkHours: 14,
    focusScore: 82,
    burnoutRisk: "Low",
    pattern: "Maintain consistent evening blocks."
  }
};

export const MOCK_API_RESPONSE_MODE_B = {
  readiness: 55,
  topCareers: [],
  missingSkills: [
    { name: "Machine Learning Concepts", priority: "High" },
    { name: "Linear Algebra", priority: "High" },
    { name: "Cloud Deployment", priority: "Medium" }
  ],
  studyInsights: {
    recommendedDeepWorkHours: 18,
    focusScore: 65,
    burnoutRisk: "Medium",
    pattern: "Increase spaced repetition."
  }
};
