// questions.js
const assessmentData = [
    {
        id: "cat_1",
        title: "Category 1: Leadership",
        questions: [
            { id: "q1_1", text: "I actively communicate a clear and inspiring vision to my team.", type: "likert", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }] },
            { id: "q1_2", text: "When dealing with team underperformance, what is your primary approach?", type: "mcq", options: [{ value: "a", label: "Provide immediate corrective feedback privately" }, { value: "b", label: "Reassign tasks to higher-performing members" }, { value: "c", label: "Develop a structured Performance Improvement Plan" }] },
            { id: "q1_3", text: "I effectively delegate tasks to empower team members rather than micromanaging.", type: "likert", options: [{ value: 1, label: "Rarely" }, { value: 2, label: "Occasionally" }, { value: 3, label: "Sometimes" }, { value: 4, label: "Frequently" }, { value: 5, label: "Always" }] }
        ]
    },
    {
        id: "cat_2",
        title: "Category 2: Communication",
        questions: [
            { id: "q2_1", text: "My written and verbal communications are clear, concise, and easy to understand.", type: "likert", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }] },
            { id: "q2_2", text: "How do you prefer to handle the resolution of a highly complex, multi-department issue?", type: "mcq", options: [{ value: "a", label: "Detailed email thread documenting all points" }, { value: "b", label: "A quick direct message or phone call" }, { value: "c", label: "A structured cross-functional meeting" }] },
            { id: "q2_3", text: "I practice active listening by letting others finish speaking before formulating my response.", type: "likert", options: [{ value: 1, label: "Rarely" }, { value: 2, label: "Occasionally" }, { value: 3, label: "Sometimes" }, { value: 4, label: "Frequently" }, { value: 5, label: "Always" }] }
        ]
    },
    {
        id: "cat_3",
        title: "Category 3: Execution",
        questions: [
            { id: "q3_1", text: "I consistently deliver high-quality work within the agreed-upon deadlines.", type: "likert", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }] },
            { id: "q3_2", text: "If a major project is at risk of falling behind schedule, what is your first action?", type: "mcq", options: [{ value: "a", label: "Work overtime to catch up personally" }, { value: "b", label: "Flag the risk to stakeholders and propose a revised timeline" }, { value: "c", label: "Reduce the scope of the project to meet the deadline" }] },
            { id: "q3_3", text: "I effectively prioritize daily tasks based on business impact and urgency.", type: "likert", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }] }
        ]
    },
    {
        id: "cat_4",
        title: "Category 4: Strategy",
        questions: [
            { id: "q4_1", text: "I understand how my daily work contributes directly to the company's long-term goals.", type: "likert", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }] },
            { id: "q4_2", text: "I proactively analyze market trends and competitor activities to inform my decisions.", type: "likert", options: [{ value: 1, label: "Rarely" }, { value: 2, label: "Occasionally" }, { value: 3, label: "Sometimes" }, { value: 4, label: "Frequently" }, { value: 5, label: "Always" }] },
            { id: "q4_3", text: "When allocating resources for the next quarter, what drives your decision?", type: "mcq", options: [{ value: "a", label: "Historical spending patterns" }, { value: "b", label: "Current urgent operational needs" }, { value: "c", label: "Projected ROI and strategic alignment" }] }
        ]
    },
    {
        id: "cat_5",
        title: "Category 5: Innovation",
        questions: [
            { id: "q5_1", text: "I frequently propose new ideas or process improvements to increase efficiency.", type: "likert", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }] },
            { id: "q5_2", text: "I am willing to take calculated risks to explore potentially high-reward solutions.", type: "likert", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }] },
            { id: "q5_3", text: "How do you typically react to the introduction of a disruptive new technology in your field?", type: "mcq", options: [{ value: "a", label: "Wait to see how competitors adopt it first" }, { value: "b", label: "Immediately test it to find potential use cases" }, { value: "c", label: "Maintain current processes until the tech is fully proven" }] }
        ]
    },
    {
        id: "cat_6",
        title: "Category 6: Teamwork",
        questions: [
            { id: "q6_1", text: "I actively support my peers during periods of high workload.", type: "likert", options: [{ value: 1, label: "Rarely" }, { value: 2, label: "Occasionally" }, { value: 3, label: "Sometimes" }, { value: 4, label: "Frequently" }, { value: 5, label: "Always" }] },
            { id: "q6_2", text: "When a conflict arises with a team member, how do you resolve it?", type: "mcq", options: [{ value: "a", label: "Escalate immediately to a manager" }, { value: "b", label: "Avoid confrontation and work around the issue" }, { value: "c", label: "Initiate a direct, constructive conversation to find a compromise" }] },
            { id: "q6_3", text: "I effectively collaborate with departments outside of my immediate team.", type: "likert", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }] }
        ]
    },
    {
        id: "cat_7",
        title: "Category 7: Adaptability",
        questions: [
            { id: "q7_1", text: "I can quickly adjust my working style when project scopes change unexpectedly.", type: "likert", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }] },
            { id: "q7_2", text: "When leadership shifts primary business priorities mid-quarter, I...", type: "mcq", options: [{ value: "a", label: "Continue with my original goals to ensure completion" }, { value: "b", label: "Pause work and wait for explicit new instructions" }, { value: "c", label: "Quickly realign my tasks to support the new directive" }] },
            { id: "q7_3", text: "I am comfortable learning and integrating new software or methodologies into my workflow.", type: "likert", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }] }
        ]
    },
    {
        id: "cat_8",
        title: "Category 8: Accountability",
        questions: [
            { id: "q8_1", text: "I take full ownership of my mistakes without shifting blame to others or external factors.", type: "likert", options: [{ value: 1, label: "Rarely" }, { value: 2, label: "Occasionally" }, { value: 3, label: "Sometimes" }, { value: 4, label: "Frequently" }, { value: 5, label: "Always" }] },
            { id: "q8_2", text: "If you realize you are going to miss a critical Key Performance Indicator (KPI), you...", type: "mcq", options: [{ value: "a", label: "Explain the external factors that caused the miss at the end of the quarter" }, { value: "b", label: "Communicate the shortfall early and present a recovery plan" }, { value: "c", label: "Adjust the KPI metrics to reflect a more favorable outcome" }] },
            { id: "q8_3", text: "I consistently follow through on commitments made to colleagues and clients.", type: "likert", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }] }
        ]
    }
];
