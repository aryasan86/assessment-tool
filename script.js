// script.js

// State variables
let currentStep = 0;
const userAnswers = {};

// DOM Elements
const stepCounterEl = document.getElementById('step-counter');
const currentCategoryNameEl = document.getElementById('current-category-name');
const progressBarFillEl = document.getElementById('progress-bar-fill');
const progressPercentageEl = document.getElementById('progress-percentage');
const stepperWrapperEl = document.getElementById('stepper-wrapper');
const formContainerEl = document.getElementById('form-container');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnSubmit = document.getElementById('btn-submit');

function init() {
    buildStepper();
    renderStep();
    attachEventListeners();
}

// Dynamically generate the visual nodes from questions.js
function buildStepper() {
    assessmentData.forEach((cat, index) => {
        // Strip "Category X: " prefix to get short name for the small labels
        const shortName = cat.title.includes(': ') ? cat.title.split(': ')[1] : cat.title;
        
        const item = document.createElement('div');
        item.className = 'stepper-item';
        item.innerHTML = `
            <div class="stepper-circle"></div>
            <div class="stepper-label">${shortName}</div>
        `;
        stepperWrapperEl.appendChild(item);
    });
}

function renderStep() {
    const category = assessmentData[currentStep];
    const totalSteps = assessmentData.length;
    
    // 1. Update Header Texts
    stepCounterEl.textContent = `CATEGORY ${currentStep + 1} OF ${totalSteps}`;
    const cleanTitle = category.title.includes(': ') ? category.title.split(': ')[1] : category.title;
    currentCategoryNameEl.textContent = cleanTitle;

    // 2. Update Thick Progress Bar
    const progress = (currentStep / totalSteps) * 100;
    progressBarFillEl.style.width = `${progress}%`;
    progressPercentageEl.textContent = `${Math.round(progress)}% Complete`;

    // 3. Update Visual Stepper Nodes
    const stepperItems = document.querySelectorAll('.stepper-item');
    stepperItems.forEach((item, index) => {
        item.classList.remove('active', 'completed');
        if (index < currentStep) {
            item.classList.add('completed');
        } else if (index === currentStep) {
            item.classList.add('active');
        }
    });

    // 4. Render Questions
    formContainerEl.innerHTML = '';
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

// ... Keep your existing validateCurrentStep(), updateNavigationButtons(), and attachEventListeners() below here ...
