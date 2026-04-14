// config.js
const assessmentConfig = {
    title: "Professional Skills Assessment",
    // To support multiple clients without duplicating code, we can eventually 
    // grab a client ID from the URL. For now, we define a default.
    defaultClient: "DemoCorp", 
    
    categories: [
        {
            id: "cat_1",
            title: "Category 1: Communication",
            questions: [
                { id: "q1", text: "How effectively do you resolve team conflicts?", options: [1, 2, 3, 4, 5] },
                { id: "q2", text: "I regularly provide constructive feedback.", options: [1, 2, 3, 4, 5] }
            ]
        },
        {
            id: "cat_2",
            title: "Category 2: Technical Execution",
            questions: [
                { id: "q3", text: "I prioritize clean, modular code over quick fixes.", options: [1, 2, 3, 4, 5] },
                { id: "q4", text: "How comfortable are you with Vanilla JavaScript?", options: [1, 2, 3, 4, 5] }
            ]
        }
        // Add categories 3 through 8 following this exact structure...
    ],

    // Define the score thresholds for the final dashboard
    scoreBands: [
        { max: 25, label: "Novice" },
        { max: 50, label: "Intermediate" },
        { max: 75, label: "Advanced" },
        { max: 100, label: "Master" }
    ]
};
