const questionArea = document.getElementById('question-area');

async function getQuestions(url) {
    try {
        const response = await fetch("https://the-trivia-api.com/v2/questions");//attempt to get data
        const data = await response.json();//parse json into js object
        return data;
    } catch (error) {
        console.error('Error:', error);//log error
    }
}

function checkAnswer(question, answer) {//as yet to implemented answer checking logic
    if (question.answer === answer) {
        console.log('Correct answer!');
    } else {
        console.log('Incorrect answer!');
    }
}

function displayQuestion(question) {
    if (!question) {//if question exists
        console.error('Question is undefined');
        return;
    }
    //get question text, correct answer, and choices from question object
    const questionText = question.question.text;
    const correctAnswer = question.correctAnswer;
    const choices = [...question.incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);//the .sort randomsies the order
    let text = "";

    if (question.type === "text_choice") {
        text = `<p>${questionText}</p>
        <form>
        ${choices.map((choice, index) =>
            `<div>
                <input type="radio" id="choice${choice+index}" name="answer" value="${choice}">
                <label for="choice${choice+index}">${choice}</label>
            </div>`
        ).join('')}
        </form>
        <button onclick="checkAnswer()">Submit</button>`;
    }
    else if (question.questionType === "fillInBlank") {
        text = `<p>${questionText}</p>
        <input type="text" id="answer" placeholder="Type your answer here">
        <button onclick="checkAnswer()">Submit</button>`;
    }
    else if (question.questionType === 'TF') {
        text = `<p>${questionText}</p>
        <form>
            <div>
                <input type="radio" id="true" name="answer" value="true">
                <label for="true">True</label>
            </div>
            <div>
                <input type="radio" id="false" name="answer" value="false">
                <label for="false">False</label>
            </div>
        </form>
        <button onclick="checkAnswer()">Submit</button>`;
    }
    else {
        console.log('Invalid question type');
        text = `<p> invalid q</p>\n`;
    }
    questionArea.innerHTML += text;

}

async function initQuiz() {
    const questions = await getQuestions();
    if (questions && questions.length > 0) {
        questions.forEach(question => {
            displayQuestion(question);
        });
    }
}

initQuiz();