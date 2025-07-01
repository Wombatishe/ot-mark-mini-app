// Данные торговых точек
const stores = [
  { id: 'goncharova', name: 'Гончарова 19к1' },
  { id: 'gagarina', name: 'Гагарина 27' },
  { id: 'kmarx', name: 'К.Маркса 13а' },
  { id: 'nevskogo', name: 'А.Невского 2е' },
  { id: 'radishcheva', name: 'Радищева 39' },
  { id: 'olimp', name: 'Олимпийский 10' },
];

// Пример теста по теме «Кондитерские изделия»
const testQuestions = [
  {
    question: "Какой бисквит входит в торт груша -финик?",
    answers: ["Ванильный", "Кексовый", "Шоколадный", "Миндальный"],
    correctIndex: 1,
  },
  {
    question: "Какой крем в эклере шу?",
    answers: ["Заварной с маслом", "Заварной со сливками", "Крем чиз", "Шоколадный"],
    correctIndex: 1,
  },
  // ... добавь остальные вопросы сюда ...
];

let currentQuestionIndex = 0;
let userAnswers = [];

// Элементы DOM
const registrationForm = document.getElementById('registration-form');
const testSection = document.getElementById('test-section');
const questionContainer = document.getElementById('question-container');
const answersContainer = document.getElementById('answers-container');
const nextButton = document.getElementById('next-question-btn');
const userNameInput = document.getElementById('user-name');
const userPositionInput = document.getElementById('user-position');
const userPhoneInput = document.getElementById('user-phone');
const userStoreSelect = document.getElementById('user-store');

// Инициализация селекта торговых точек
function initStoreSelect() {
  stores.forEach(store => {
    const option = document.createElement('option');
    option.value = store.id;
    option.textContent = store.name;
    userStoreSelect.appendChild(option);
  });
}

// Показать вопрос
function showQuestion(index) {
  const q = testQuestions[index];
  questionContainer.textContent = q.question;
  answersContainer.innerHTML = '';

  q.answers.forEach((answer, i) => {
    const label = document.createElement('label');
    label.classList.add('answer-option');

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'answer';
    input.value = i;

    input.addEventListener('change', () => {
      nextButton.disabled = false;
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(' ' + answer));
    answersContainer.appendChild(label);
  });

  nextButton.disabled = true;
}

// Обработка нажатия кнопки «Далее»
nextButton.addEventListener('click', () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return;

  userAnswers.push(parseInt(selected.value));
  currentQuestionIndex++;

  if (currentQuestionIndex < testQuestions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    showResults();
  }
});

// Показать результаты (без правильных ответов, просто оценка)
function showResults() {
  testSection.innerHTML = <h2>Спасибо за прохождение теста!</h2><p>Ваш результат: ${userAnswers.length} из ${testQuestions.length} вопросов отвечено.</p>;
}

// Обработка регистрации
registrationForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Простая валидация
  if (!userNameInput.value.trim()  !userPositionInput.value.trim()  !userPhoneInput.value.trim() || !userStoreSelect.value) {
    alert('Пожалуйста, заполните все поля регистрации');
    return;
  }

  registrationForm.style.display = 'none';
  testSection.style.display = 'block';
  showQuestion(currentQuestionIndex);
});

// Запуск инициализации
initStoreSelect();
