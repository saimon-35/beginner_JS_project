document.addEventListener("DOMContentLoaded", function () {
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('options');
const submitBtn = document.getElementById('submit-btn');
const resultElement = document.getElementById('result');

let quizQuestions = [];
let currentQuestionIndex = 0;
let selectedOption = null;
let score = 0;

// Add questions
function addQuestion(questionText, options, correctIndex) {
  quizQuestions.push({
    question: questionText,
    options: options,
    correctAnswer: correctIndex
  });
}

addQuestion(
  "What is CSS?",
  ["Database", "Styling language", "OS", "Browser"],
  1
);

addQuestion(
  "What is JavaScript?",
  ["Styling language", "Programming language", "Database", "Browser"],
  1
);

addQuestion(
  "Which tag is used for paragraph?",
  ["<div>", "<span>", "<p>", "<a>"],
  2
);

// Show question
function showQuestion() {
  const q = quizQuestions[currentQuestionIndex];

  questionElement.textContent = q.question;
  choicesElement.innerHTML = "";
  selectedOption = null;

  q.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.dataset.index = index;
    choicesElement.appendChild(li);
  });
}

// Handle option click
choicesElement.addEventListener("click", function (event) {
  const li = event.target.closest("li");
  if (!li) return;

  // remove previous selection
  Array.from(choicesElement.children).forEach(el =>
    el.classList.remove("selected")
  );

  li.classList.add("selected");
  selectedOption = Number(li.dataset.index);
});

// Submit Next button
submitBtn.addEventListener("click", function () {
  if (selectedOption === null) {
    alert("Please select an option!");
    return;
  }

  if (selectedOption === quizQuestions[currentQuestionIndex].correctAnswer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

// Show final result
function showResult() {
  questionElement.textContent = "Quiz Finished!";
  choicesElement.innerHTML = "";
  submitBtn.style.display = "none";
  resultElement.textContent =
    `Your score: ${score} / ${quizQuestions.length}`;
}

// Start quiz
showQuestion();
});