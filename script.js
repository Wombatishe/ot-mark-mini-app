let currentTest = 0;
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let questions = [];

function registerUser() {
  const name = document.getElementById('fullName').value;
  const position = document.getElementById('position').value;
  const workplace = document.getElementById('workplace').value;
  const phone = document.getElementById('phone').value;

  if (!name || !position || !workplace || !phone) {
    alert('Заполните все поля');
    return;
  }

  localStorage.setItem('name', name);
  localStorage.setItem('position', position);
  localStorage.setItem('workplace', workplace);
  localStorage.setItem('phone', phone);

  showSection('mainMenu');
  showAvailableTests();
}

function showSection(id) {
  document.querySelectorAll('section').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function showKnowledge() {
  showSection('knowledge');
}

function showAvailableTests() {
  const position = localStorage.getItem('position');
  const testMap = {
    'Кондитер': [1, 6],
    'Пекарь': [2, 6],
    'Администратор': [3, 4, 6, 7],
    'Повар': [5, 6]
  };

  const testNames = {
    1: 'Кондитерские изделия',
    2: 'Выпечка',
    3: 'Кулинария',
    4: 'Кассовая дисциплина',
    5: 'Поварское дело',
    6: 'Трудовой этикет',
    7: 'Сервис'
  };

  const container = document.getElementById('testButtonsContainer');
  container.innerHTML = '';

  const availableTests = testMap[position] || [];
  availableTests.forEach(testId => {
    const btn = document.createElement('button');
    btn.textContent = `Пройти тест: ${testNames[testId]}`;
    btn.onclick = () => startTestById(testId);
    container.appendChild(btn);
  });
}

function startTestById(testId) {
  currentTest = testId;
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 30;
  questions = getQuestionsForTest(testId);
  showSection('test');
  showQuestion();
  startTimer();
}

function getQuestionsForTest(id) {
  return [
    { question: 'Вопрос 1', answers: ['Ответ 1', 'Ответ 2', 'Ответ 3', 'Ответ 4'], correct: 0 },
    { question: 'Вопрос 2', answers: ['Ответ 1', 'Ответ 2', 'Ответ 3', 'Ответ 4'], correct: 1 }
  ];
}

function showQuestion() {
  const q = questions[currentQuestionIndex];
  document.getElementById('questionText').textContent = q.question;
  const container = document.getElementById('answersContainer');
  container.innerHTML = '';
  q.answers.forEach((a, i) => {
    const btn = document.createElement('button');
    btn.textContent = a;
    btn.onclick = () => {
      if (i === q.correct) score++;
      nextQuestion();
    };
    container.appendChild(btn);
  });
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    alert(`Тест завершён. Правильных ответов: ${score} из ${questions.length}`);
    showSection('mainMenu');
  }
}

function startTimer() {
  const timerEl = document.getElementById('timer');
  const interval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Осталось времени: ${timeLeft} сек`;
    if (timeLeft <= 0) {
      clearInterval(interval);
      alert('Время вышло!');
      showSection('mainMenu');
    }
  }, 1000);
}
