const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

const questions = [{
  question: 'When you eat a devil fruit, what ability do you lose?',
  answers: [{text: 'The ability to walk', correct: false},
            {text: 'The ability to see', correct: false},
            {text: 'The ability to swim', correct: true},
            {text: 'The ability to poop', correct: false}]
          },{
  question: 'Which of the following arcs is filler?',
  answers: [{text: "The G-8 Marine Base arc", correct: true},
            {text: "The Foxy's Return arc", correct: false},
            {text: 'The Long Ring Long Land arc', correct: false},
            {text: 'The Jaya arc', correct: false}]
          },{
  question: 'How many times was Whitebeard shot in Marineford arc?',
  answers: [{text: '273', correct: false},
            {text: '64', correct: false},
            {text: '574', correct: false},
            {text: '152', correct: true}]
          },{
  question: 'In the time-skip who was the first Straw Hat to reach the Thousand Sunny?',
  answers: [{text: 'Brook', correct: false},
            {text: 'Franky', correct: true},
            {text: 'Robin', correct: false},
            {text: 'Nami', correct: false}]
}];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;

  questionElement.innerHTML = questionNumber + '. ' + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('answer-button');
    answerButtons.appendChild(button);
    
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer);
  })
}

function resetState() {
  nextButton.style.display = 'none';

  while(answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === 'true';

  if (isCorrect) {
    selectedButton.classList.add('correct');
    score++;
  } else {
    selectedButton.classList.add('incorrect');
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = 'Play Again';
  nextButton.style.display = 'block';
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
})

startQuiz();