// script.js

// State variables
let currentStep = 0;
const userAnswers = {};

// DOM Elements
const stepLabelEl = document.getElementById('step-label');
const progressBarFillEl = document.getElementById('progress-bar-fill');
const progressPercentageEl = document.getElementById('progress-percentage');
const formContainerEl = document.getElementById('form-container');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnSubmit = document.getElementById('btn-submit');

function init() {
    renderStep();
    attachEventListeners();
}

function renderStep() {
    const category = assessmentData[currentStep];
    const totalSteps = assessmentData.length;
    
    // Update Progress UI
    stepLabelEl.textContent = `Step ${currentStep + 1} of ${totalSteps}: ${category.title}`;
    const progress = (currentStep / totalSteps) * 100;
    progressBarFillEl.style.width = `${progress}%`;
    progressPercentageEl.textContent = `${Math.round(progress)}%`;

    // Clear previous form content
    formContainerEl.innerHTML = '';

    // Generate Question Cards
    category.questions.forEach(question => {
        const card = document.createElement('div');
        card.className = 'question-card';
        
        const title = document.createElement('h3');
        title.className = 'question-title';
        title.textContent = question.text;
        card.appendChild(title);

        const optionsContainer = document.createElement('div');
        optionsContainer.className = `options-container ${question.type === 'likert' ? 'likert-style' : ''}`;

        question.options.forEach(option => {
            const label = document.createElement('label');
            label.className = 'option-label';
            
            if (userAnswers[question.id] == option.value) {
                label.classList.add('selected');
            }

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = question.id;
            input.value = option.value;
            
            if (userAnswers[question.id] == option.value) {
                input.checked = true;
            }

            input.addEventListener('change', (e) => {
                userAnswers[question.id] = e.target.value;
                
                const siblings = optionsContainer.querySelectorAll('.option-label');
                siblings.forEach(sib => sib.classList.remove('selected'));
                label.classList.add('selected');

                validateCurrentStep();
            });

            label.appendChild(input);
            label.appendChild(document.createTextNode(option.label));
            optionsContainer.appendChild(label);
        });

        card.appendChild(optionsContainer);
        formContainerEl.appendChild(card);
    });

    updateNavigationButtons();
    validateCurrentStep(); 
}

function validateCurrentStep() {
    const currentQuestions = assessmentData[currentStep].questions;
    const isStepComplete = currentQuestions.every(q => userAnswers[q.id] !== undefined);
    
    if (isStepComplete) {
        btnNext.disabled = false;
        btnSubmit.disabled = false;
    } else {
        btnNext.disabled = true;
        btnSubmit.disabled = true;
    }
}

function updateNavigationButtons() {
    btnPrev.disabled = currentStep === 0;

    if (currentStep === assessmentData.length - 1) {
        btnNext.classList.add('hidden');
        btnSubmit.classList.remove('hidden');
    } else {
        btnNext.classList.remove('hidden');
        btnSubmit.classList.add('hidden');
    }
}

function attachEventListeners() {
    btnNext.addEventListener('click', () => {
        if (currentStep < assessmentData.length - 1) {
            currentStep++;
            renderStep();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            renderStep();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    btnSubmit.addEventListener('click', () => {
        // Complete progress bar visually
        progressBarFillEl.style.width = '100%';
        progressPercentageEl.textContent = '100%';
        
        // 1. Calculate Scores
        let totalScore = 0;
        let maxTotalScore = 0;
        const categoryScores = [];

        // Map MCQ options to point values
        const mcqScoringMap = { 'a': 1, 'b': 3, 'c': 5 };

        assessmentData.forEach(cat => {
            let catScore = 0;
            let catMax = cat.questions.length * 5; // Max 5 points per question

            cat.questions.forEach(q => {
                const ans = userAnswers[q.id];
                if (q.type === 'likert') {
                    catScore += parseInt(ans);
                } else if (q.type === 'mcq') {
                    catScore += mcqScoringMap[ans] || 0;
                }
            });

            totalScore += catScore;
            maxTotalScore += catMax;

            // Save clean category name
            const cleanTitle = cat.title.includes(': ') ? cat.title.split(': ')[1] : cat.title;

            categoryScores.push({
                title: cleanTitle,
                percentage: Math.round((catScore / catMax) * 100)
            });
        });

        const overallPercentage = Math.round((totalScore / maxTotalScore) * 100);

        // 2. Determine Performance Band
        let band = "Novice";
        if (overallPercentage >= 50) band = "Intermediate";
        if (overallPercentage >= 75) band = "Advanced";
        if (overallPercentage >= 90) band = "Master";

        // 3. Render Dashboard
        formContainerEl.classList.add('hidden');
        document.querySelector('.progress-section').classList.add('hidden');
        document.querySelector('.app-footer').classList.add('hidden');
        
        const resultsContainer = document.getElementById('results-container');
        resultsContainer.classList.remove('hidden');

        document.getElementById('overall-band').textContent = band;
        document.getElementById('overall-score-val').textContent = overallPercentage;

        const breakdownEl = document.getElementById('category-breakdown');
        breakdownEl.innerHTML = '';

        categoryScores.forEach(cat => {
            breakdownEl.innerHTML += `
                <div class="category-score-row">
                    <div class="category-name">${cat.title}</div>
                    <div class="category-bar-bg">
                        <div class="category-bar-fill" style="width: 0%"></div>
                    </div>
                    <div class="category-score-text">${cat.percentage}%</div>
                </div>
            `;
        });

        setTimeout(() => {
            const bars = breakdownEl.querySelectorAll('.category-bar-fill');
            bars.forEach((bar, index) => {
                bar.style.width = `${categoryScores[index].percentage}%`;
            });
        }, 100);

        console.log("Final Assessment Payload ready for Google Sheets:", JSON.stringify(userAnswers));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Boot application
init();
