const quizData = [
    { question: "When will be the release of the new Demon Slayer movie?", answers: ["It will be next month", "It will be yesterday", "It will be last week", "It will be two years ago"], correct: 0 },
    { question: "When will be the next Copa América?", answers: ["It will be in 2028", "It will be in 2024", "It will be in 2030", "It will be in 1998"], correct: 2 },
    { question: "Will Madara's clones be fighting with Susano'o?", answers: ["They will be fighting with Susano'o", "They will be fighting without Susano'o", "They will be eating ramen", "They will be hiding"], correct: 0 },
    { question: "How will be the weather tomorrow in Circasia?", answers: ["It will be sunny", "It will be raining money", "It will be cloudy", "It will be snowing in the desert"], correct: 0 },
    { question: "How many fingers will Sukuna have in total?", answers: ["He will have twenty", "He will have ten", "He will have eight", "He will have twelve"], correct: 0 },
    { question: "What color will Naruto's shoes be?", answers: ["They will be blue", "They will be orange", "They will be black", "They will be white"], correct: 2 },
    { question: "What will be the name of Kisame's sword?", answers: ["It will be Samehada", "It will be Kubikiribōchō", "It will be Kusanagi", "It will be Zangetsu"], correct: 0 },
    { question: "Why will Sasuke be winning against Itachi?", answers: ["Because Itachi will be sick", "Because Sasuke will be stronger", "Because Itachi will be blind", "Because Sasuke will be using Rasengan"], correct: 0 },
    { question: "How many transformations will Goku be having?", answers: ["He will be having more than ten", "He will be having two", "He will be having five", "He will be having none"], correct: 0 },
    { question: "How strong will Escanor be?", answers: ["He will be as strong as the sun", "He will be as weak as a cat", "He will be stronger than Saitama", "He will be weaker than Meliodas"], correct: 0 }
];

let currentQuestion = 0;
let score = 0;
let respuestasJugador = [];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultEl = document.getElementById("result");
const anyaImg = document.getElementById("advertencia");
const yameteSound = document.getElementById("yameteSound");

function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        showResult();
        return;
    }

    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;
    answersEl.innerHTML = "";

    currentQuiz.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.textContent = answer;

        btn.onclick = () => {
            checkAnswer(index);
        };

        answersEl.appendChild(btn);
    });
}

function checkAnswer(selected) {
    respuestasJugador.push(selected);

    if (selected === quizData[currentQuestion].correct) {
        score++;
        yameteSound.currentTime = 0;
        yameteSound.play();
    }

    currentQuestion++;
    loadQuestion();
}

function showResult() {
    questionEl.textContent = "";
    answersEl.innerHTML = "";

    let resultadoHTML = `<h2>You got ${score} out of ${quizData.length} correct!</h2>`;
    resultadoHTML += "<ul>";

    quizData.forEach((q, i) => {
        const correcta = q.answers[q.correct];
        const jugador = q.answers[respuestasJugador[i]];
        const esCorrecta = respuestasJugador[i] === q.correct;

        resultadoHTML += `
            <li style="margin-bottom:10px;">
                <strong>Q${i + 1}:</strong> ${q.question} <br>
                ${esCorrecta 
                    ? `<span style="background:lightgreen;padding:2px 5px;border-radius:4px;">✅ Correct: ${correcta}</span>`
                    : `<span style="background:#ffb3b3;padding:2px 5px;border-radius:4px;">❌ Your answer: ${jugador}</span> <br>
                       <span style="background:lightgreen;padding:2px 5px;border-radius:4px;">✅ Correct: ${correcta}</span>`
                }
            </li>
        `;
    });
    resultadoHTML += "</ul>";
    resultEl.innerHTML = resultadoHTML;
}

// Interacción de Anya
document.addEventListener("mouseover", (e) => {
    if (e.target.tagName === "BUTTON") {
        anyaImg.classList.add("visible");
    }
});

document.addEventListener("mouseout", (e) => {
    if (e.target.tagName === "BUTTON") {
        anyaImg.classList.remove("visible");
    }
});

document.addEventListener("mousemove", (e) => {
    if (anyaImg.classList.contains("visible")) {
        anyaImg.style.left = `${e.pageX + 20}px`;
        anyaImg.style.top = `${e.pageY + 20}px`;
    }
});

loadQuestion();
