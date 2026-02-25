/**
 * Generates an AI-powered smart roadmap based on student inputs.
 * // TODO: Replace this mock logic with real AI API call later
 */
export const generateRoadmap = (targetCareer, studyHours, studyMode) => {
  const deepWorkMultiplier = studyMode === 'Deep Work Focused' ? 0.8 : studyMode === 'Balanced' ? 0.6 : 0.4;
  const deepWorkHours = Math.round(studyHours * deepWorkMultiplier);
  const activeRecallSessions = Math.max(1, Math.round(studyHours / 5));

  const months = [
    {
      month: 1,
      focus: "Foundations & Core Concepts",
      weeklyFocus: [
        "Week 1: Fundamentals and Setup",
        "Week 2: Basic Syntax & Logic",
        "Week 3: Data Structures",
        "Week 4: Mini Assessment"
      ],
      deepWorkWeekly: deepWorkHours,
      activeRecallWeekly: activeRecallSessions,
      spacedRepetitionDays: [1, 3, 7],
      milestone: "Build a basic CLI application"
    },
    {
      month: 2,
      focus: "Intermediate Skills & Specifics",
      weeklyFocus: [
        "Week 1: Frameworks Introduction",
        "Week 2: Advanced Data Handling",
        "Week 3: API Integration",
        "Week 4: Optimization"
      ],
      deepWorkWeekly: deepWorkHours,
      activeRecallWeekly: activeRecallSessions + 1,
      spacedRepetitionDays: [1, 3, 7, 14],
      milestone: "Integrate a public API into a project"
    },
    {
      month: 3,
      focus: "Advanced Topics & Architecture",
      weeklyFocus: [
        "Week 1: System Design Basics",
        "Week 2: Database Management",
        "Week 3: Security Basics",
        "Week 4: Performance Tuning"
      ],
      deepWorkWeekly: deepWorkHours + 2,
      activeRecallWeekly: activeRecallSessions,
      spacedRepetitionDays: [1, 7, 21],
      milestone: "Deploy a full-stack minimal viable product"
    },
    {
      month: 4,
      focus: "Interview Prep & Portfolio",
      weeklyFocus: [
        "Week 1: Resume Polish & Portfolio Setup",
        "Week 2: Mock Interviews",
        "Week 3: Complex Algorithms",
        "Week 4: Final Project Ideation"
      ],
      deepWorkWeekly: deepWorkHours,
      activeRecallWeekly: activeRecallSessions * 2,
      spacedRepetitionDays: [1, 3],
      milestone: "Complete 10 mock interviews and finalize portfolio"
    },
    {
      month: 5,
      focus: "Capstone Project Development",
      weeklyFocus: [
        "Week 1: Architecture Planning",
        "Week 2: MVP Development",
        "Week 3: Testing & Debugging",
        "Week 4: Polish & Documentation"
      ],
      deepWorkWeekly: deepWorkHours + 5,
      activeRecallWeekly: activeRecallSessions,
      spacedRepetitionDays: [7, 14],
      milestone: "Launch Capstone Project publicly"
    },
    {
      month: 6,
      focus: "Job Hunting & Networking",
      weeklyFocus: [
        "Week 1: Applications & Outreach",
        "Week 2: System Design Interviews",
        "Week 3: Negotiation Tactics",
        "Week 4: Offer Evaluation"
      ],
      deepWorkWeekly: Math.max(10, deepWorkHours),
      activeRecallWeekly: activeRecallSessions,
      spacedRepetitionDays: [3, 7],
      milestone: "Secure at least 3 final round interviews"
    }
  ];

  return months;
};
