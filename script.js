const questionArea = document.getElementById('question-area');

async function getQuestions2(amount, catagories, difficulty) {
    try {
        const response = await fetch(`https://the-trivia-api.com/v2/questions?limit=${amount}&categories=${catagories}&difficulties=${difficulty}`);//attempt to get data
        const data = await response.json();//parse json into js object
        return data;
    } catch (error) {
        console.error('Error:', error);//log error
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
    <div>
    ${choices.map((choice) =>
        `<button onclick="${choice === correctAnswer ? 'correctAnswer()' : 'incorrectAnswer()'}">${choice}</button>`
    ).join('')}
    </div>`;//put each choice in a button element and join them together
    }

    else {
        console.log('Invalid question type');
        text = `<p> invalid q</p>\n`;
    }
    questionArea.innerHTML += text;

}

function incorrectAnswer(){
    console.log('Incorrect answer!');
}

function correctAnswer(){
    console.log('Correct answer!');
}

async function initQuiz() {
    const questions = await getQuestions2(10, "general_knowledge", "easy");
    if (questions) {
        questions.forEach(question => {
            displayQuestion(question);
        });
    }
    else{
        console.error('No questions found');
    }
}

initQuiz();

function parseCategory(categories){
    let capitalisedCategories = categories==="general_knowledge" ? //ternary expression to check if category is "general_knowledge"
        "General Knowledge" : //handle special case, else...
        categories.replace("_", " and ")//replace underscore with 'and'
        .split(" ")//split string into words
        .map((word) => word === "and" ? "and" : word.charAt(0).toUpperCase() + word.slice(1)).join(" ");//capitalise first letter of each word except 'and'
    console.log(capitalisedCategories);
}
