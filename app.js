// Questions Array
const questions = [
    {question: 'Enter Your First Name'},
    {question: 'Enter Your Last Name'},
    {question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/
},
    {question: 'Create A Password', type: 'password'}
];

// Welcome Text After Completing Form
const welcomeText = 'Welcome to our company';

// Transition Times
const shakeTime = 100; // Shake Transition Time
const switchTime = 200; // Transition Between questions

// Init Position At First Question
let position = 0;

// Init DOM  Elements
const formBox = document.querySelector('#form-box');
const prevButton = document.querySelector('#prev-btn');
const nextButton = document.querySelector('#next-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progressBar = document.querySelector('#progress-bar');

// EVENTS

// Get Question On DOM Load
document.addEventListener('DOMContentLoaded', getQuestion);

// Next Button Click
nextButton.addEventListener('click', validate);

// Input Field Enter Click
inputField.addEventListener('keyup', (e) => {
   if (e.keyCode === 13) {
       validate();
   }
});


// FUCTIONS

// Get Questions From Array & Add To Markup
function getQuestion() {
    // Get Current Question
    inputLabel.innerHTML = questions[position].question;
    // Get Current Type
     inputField.type = questions[position].type || 'text';
     // Get Current Answer
     inputField.value = questions[position].answer || ' ';
     // Focus On Element
     inputField.focus();

     // Set Progress Bar width - Variable to the questions length
     progressBar.style.width = (position * 100) / questions.length + '%';

     // Add User Icon OR Back Arrow Depending On Question
     prevButton.className = position ? 'fas fa-arrow-left': 'fas fa-user' // if position is not 0

     showQuestion();
}

// Display Question To User
function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = ' ';
    inputProgress.style.width = '100%';
}


// Hide Question From User
function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
}

// Transform To Create Shake Motion
function transform(x, y) {
    // console.log(x, y);
     formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate Field
function validate() {
    // Make Sure Pattern Matches If There Is One
    if (!inputField.value.match(questions[position].pattern || /.+/)){
        inputFail();
    } else {
        inputPass();
    }
}

//  Field Input Fail
function inputFail() {
    formBox.className = 'error';
    // Repeat Shake Motion - Set i to number of shakes
    for (let i = 0; i < 6; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
        setTimeout(transform, shakeTime * 6, 0, 0);
    }
}

// Field Input Pass
function inputPass() {
    formBox.className = ' ';
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);

    // Store Answer In Array
    questions[position].answer = inputField.value;

    // Increment Position
    position++;

    // If  New Question, Hide Current and Get Next
    if (questions[position]) {
        hideQuestion();
        getQuestion();
    } else {
        // Remove If No More Questions
        hideQuestion();
        formBox.className = 'close';
        progressBar.style.width = '100%';

        // Form Complete
        formComplete();
    }
}

// All Fields complete - Show h1 end
function formComplete() {
    console.log(questions);
    
    const h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer} ${questions[1].answer}, You are registered and will get an email shortly`));
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => (h1.style.opacity = 1), 50);
    }, 1000)
}
