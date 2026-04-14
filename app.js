// app.js

// State Management
let currentCategoryIndex = 0;
let userAnswers = {}; // Format: { "q1": 5, "q2": 3, ... }

// DOM Elements
const titleEl = document.getElementById('app-title');
const currentCategoryTitleEl = document.getElementById('current-category-title');
const questionAreaEl = document.getElementById('question-area');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const btnSubmit = document.getElementById('btn-submit');
const progressFill = document.getElementById('progress-fill');
const assessmentView = document.getElementById('assessment-view');
const resultsView = document.getElementById('results-view');

// Initialization
function init() {
    titleEl.textContent = assessmentConfig.title;
    renderCategory(currentCategoryIndex);
}

// Render the current category and its questions
function renderCategory(index) {
    const category = assessmentConfig.categories[index];
    currentCategoryTitleEl.textContent = category.title;
    
    // Clear previous questions
    questionAreaEl.innerHTML = '';

    category.questions.forEach(q => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-block';
        
        // Build the HTML for the options dynamically
        let optionsHtml = '<div class="options-group">';
        q.options.forEach(opt => {
            const isChecked = userAnswers[q.id] === opt ? 'checked' : '';
            optionsHtml += `
                <label>
                    <input type="radio" name="${q.id}" value="${opt}" ${isChecked} onchange="saveAnswer('${q.id}', ${opt})">
                    ${opt}
                </label>
            `;
        });
        optionsHtml += '</div>';

        questionDiv.innerHTML = `
            <p><strong>${q.text}</strong></p>
            ${optionsHtml}
        `;
        questionAreaEl.appendChild(questionDiv);
    });

    updateUI();
}

// Save answer to state
window.saveAnswer = function(questionId, value) {
    userAnswers[questionId] = value;
};

// Update buttons and progress bar
function updateUI() {
    const totalCategories = assessmentConfig.categories.length;
    
    // Progress Bar
    const progressPercent = ((currentCategoryIndex) / totalCategories) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Buttons
    btnPrev.disabled = currentCategoryIndex === 0;
    
    if (currentCategoryIndex === totalCategories - 1) {
        btnNext.style.display = 'none';
        btnSubmit.style.display = 'block';
    } else {
        btnNext.style.display = 'block';
        btnSubmit.style.display = 'none';
    }
}

// Event Listeners
btnNext.addEventListener('click', () => {
    if (currentCategoryIndex < assessmentConfig.categories.length - 1) {
        currentCategoryIndex++;
        renderCategory(currentCategoryIndex);
    }
});

btnPrev.addEventListener('click', () => {
    if (currentCategoryIndex > 0) {
        currentCategoryIndex--;
        renderCategory(currentCategoryIndex);
    }
});

btnSubmit.addEventListener('click', () => {
    // For Phase 1, we just log the data. Phase 2 & 3 will build the Dashboard and Google Sheet Sync.
    console.log("Assessment Complete!", userAnswers);
    alert("Assessment Submitted! Check browser console for data.");
    
    // Set progress to 100% on submit
    progressFill.style.width = '100%'; 
    
    // Hide form, show results view (to be built out in Phase 3)
    assessmentView.style.display = 'none';
    resultsView.style.display = 'block';
});

// Boot up the app
init();
