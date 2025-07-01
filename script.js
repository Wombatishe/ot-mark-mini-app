
const registration = document.getElementById('registration');
const mainMenu = document.getElementById('mainMenu');
const knowledge = document.getElementById('knowledge');
const test = document.getElementById('test');
const stats = document.getElementById('stats');

const registerBtn = document.getElementById('registerBtn');
const knowledgeBtn = document.getElementById('knowledgeBtn');
const testBtn = document.getElementById('testBtn');
const statsBtn = document.getElementById('statsBtn');
const logoutBtn = document.getElementById('logoutBtn');

const backToMenu1 = document.getElementById('backToMenu1');
const backToMenu2 = document.getElementById('backToMenu2');
const backToMenu3 = document.getElementById('backToMenu3');

const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
const slides = document.querySelectorAll('.slide');

const questionContainer = document.getElementById('questionContainer');
const answersContainer = document.getElementById('answersContainer');
const timerEl = document.getElementById('timer');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const finishTestBtn = document.getElementById('finishTestBtn');

let currentSlide = 0;
let currentQuestionIndex = 0;
let timer;
let timeLeft = 30; // 30 секунд на вопрос
let score = 0;

const questions = [
    {
        question: "Что такое мини-приложение?",
        options: ["Веб-сайт", "Телеграм-бот", "Нативное приложение", "Приложение внутри платформы"],
        answer: 3
    },
    {
        question: "Какой язык программирования используется для веб-разработки?",
        options: ["Python", "JavaScript", "C#", "Java"],
        answer: 1
    },
    {
        question: "Что значит ФИО?",
        options: ["Фамилия Имя Отчество", "Фирменное имя организации", "Форма идентификации объекта", "Файл информации о сотруднике"],
        answer: 0
    },
    {
        question: "Что такое база знаний?",
        options: ["Коллекция обучающих материалов", "Программа для хранения данных", "Система управления сотрудниками", "Сайт компании"],
        answer: 0
    },
    {
        question: "Что такое тестирование сотрудников?",
        options: ["Процесс оценки знаний", "Обзор работы", "Анализ прибыли", "Подготовка отчетов"],
        answer: 0
    },
    {
        question: "Для чего служит личный кабинет сотрудника?",
        options: ["Просмотр статистики", "Отправка писем", "Регистрация новых сотрудников", "Оплата труда"],
        answer: 0
    },
    {
        question: "Что такое внутренняя валюта в компании?",
        options: ["Баллы за успехи", "Деньги компании", "Кредитная карта", "Налоговые вычеты"],
        answer: 0
    },
    {
        question: "Какой инструмент позволяет проводить тесты в Telegram Mini App?",
        options: ["HTML", "CSS", "JavaScript", "Telegram API"],
        answer: 3
    },
    {
        question: "Что такое таймер в тесте?",
        options: ["Отсчет времени", "Время на обед", "Длительность видео", "Пауза в игре"],
        answer: 0
    },
    {
        question: "Что означает кнопка 'Выйти' в приложении?",
        options: ["Выход из аккаунта", "Закрытие приложения", "Отмена регистрации", "Удаление данных"],
        answer: 0
    }
];

function showSlide(n) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === n);
    });
}

function nextSlideHandler() {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function prevSlideHandler() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

function showSection(section) {
    registration.style.display = 'none';
    mainMenu.style.display = 'none';
    knowledge.style.display = 'none';
    test.style.display = 'none';
    stats.style.display = 'none';

    section.style.display = 'block';
}

function startRegistration() {
    const fio = document.getElementById('fio').value.trim();
    const position = document.getElementById('position').value.trim();
    const workplace = document.getElementById('workplace').value.trim();
    if (!fio || !position || !workplace) {
        alert('Пожалуйста, заполните все поля');
        return;
    }
    localStorage.setItem('fio', fio);
    localStorage.setItem('position', position);
    localStorage.setItem('workplace', workplace);
    localStorage.setItem('testCompleted', 'false');
    showSection(mainMenu);
}

function logout() {
    localStorage.clear();
    showSection(registration);
}

function loadUserData() {
    const fio = localStorage.getItem('fio');
    const position = localStorage.getItem('position');
    const workplace = localStorage.getItem('workplace');
    if (fio && position && workplace) {
        showSection(mainMenu);
    } else {
        showSection(registration);
    }
}

function showKnowledge() {
    showSection(knowledge);
    showSlide(0);
}

function startTest() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    showSection(test);
    showQuestion();
    startTimer();
}

function showQuestion() {
    const q = questions[currentQuestionIndex];
    questionContainer.textContent = q.question;
    answersContainer.innerHTML = '';
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index);
        answersContainer.appendChild(btn);
    });
    nextQuestionBtn.style.display = 'none';
    finishTestBtn.style.display = 'none';
    timerEl.textContent = '';
}

function selectAnswer(index) {
    const correct = questions[currentQuestionIndex].answer;
    if (index === correct) {
        score++;
    }
    stopTimer();
    if (currentQuestionIndex < questions.length - 1) {
        nextQuestionBtn.style.display = 'block';
    } else {
        finishTestBtn.style.display = 'block';
    }
    Array.from(answersContainer.children).forEach(btn => btn.disabled = true);
}

function nextQuestion() {
    currentQuestionIndex++;
    timeLeft = 30;
    showQuestion();
    startTimer();
}

function finishTest() {
    alert(`Тест завершён! Ваш результат: ${score} из ${questions.length}`);
    localStorage.setItem('testCompleted', 'true');
    localStorage.setItem('score', score);
    showSection(mainMenu);
}

function startTimer() {
    timerEl.textContent = `Осталось времени: ${timeLeft} сек`;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Осталось времени: ${timeLeft} сек`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Время вышло! Переход к следующему вопросу.');
            selectAnswer(-1);
            if (currentQuestionIndex < questions.length - 1) {
                nextQuestionBtn.style.display = 'block';
            } else {
                finishTestBtn.style.display = 'block';
            }
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function showStats() {
    showSection(stats);
    const completed = localStorage.getItem('testCompleted') === 'true';
    const score = localStorage.getItem('score');
    const content = completed ? `<p>Тест пройден. Результат: ${score} из ${questions.length}</p>` : '<p>Тест не пройден.</p>';
    document.getElementById('statsContent').innerHTML = content;
}

registerBtn.onclick = startRegistration;
knowledgeBtn.onclick = showKnowledge;
testBtn.onclick = startTest;
statsBtn.onclick = showStats;
logoutBtn.onclick = logout;

backToMenu1.onclick = () => showSection(mainMenu);
backToMenu2.onclick = () => showSection(mainMenu);
backToMenu3.onclick = () => showSection(mainMenu);

nextSlide.onclick = nextSlideHandler;
prevSlide.onclick = prevSlideHandler;
nextQuestionBtn.onclick = nextQuestion;
finishTestBtn.onclick = finishTest;

window.onload = loadUserData;
