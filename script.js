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

async function getQuestions2(amount, catagories, difficulty) {
    try {
        const response = await fetch(`https://the-trivia-api.com/v2/questions?limit=${amount}&categories=${catagories}&difficulties=${difficulty}`);//attempt to get data
        const data = await response.json();//parse json into js object
        return data;
    } catch (error) {
        console.error('Error:', error);//log error
    }
}

function checkAnswer(question, answer) {//as yet to implemented answer checking logic
    console.log(question);
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


    //TODO add onclick 'this' to check answer
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
        <button onclick="checkAnswer(this)">Submit</button>`;
    }
    // else if (question.questionType === "fillInBlank") {
    //     text = `<p>${questionText}</p>
    //     <input type="text" id="answer" placeholder="Type your answer here">
    //     <button onclick="checkAnswer()">Submit</button>`;
    // }
    // else if (question.questionType === 'TF') {
    //     text = `<p>${questionText}</p>
    //     <form>
    //         <div>
    //             <input type="radio" id="true" name="answer" value="true">
    //             <label for="true">True</label>
    //         </div>
    //         <div>
    //             <input type="radio" id="false" name="answer" value="false">
    //             <label for="false">False</label>
    //         </div>
    //     </form>
    //     <button onclick="checkAnswer()">Submit</button>`;
    // }
    else {
        console.log('Invalid question type');
        text = `<p> invalid q</p>\n`;
    }
    questionArea.innerHTML += text;

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
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const questions = await getQuestions2(3, "science", "easy");
        console.log(questions);
        
    } catch (error) {
        console.error('Error:', error);
    }
});


function fixCategory(categoryName){
    switch(categoryName){        
        case "music":
            return "<h2 class='music'>Music";
        case "sport and leisure":
            return "<h2 class='sport_leisure'>Sport and Leisure";
        case "film and tv":
            return "<h2 class='film_tv'>Film and TV";
        case "arts and literature":
            return "<h2 class='arts_literature'>Arts and Literature";
        case "history":
            return "<h2 class='history'>History";
        case "society and culture":
            return "<h2 class='society_culture'>Society and Culture";
        case "science":
            return "<h2 class='science'>Science";
        case "geography":
            return "<h2 class='geography'>Geography";
        case "food and drink":
            return "<h2 class='food_drink'>Food and Drink";
        case "general knowledge":
            return "<h2 class='general_knowledge'>General Knowledge";
        default:
            return "<h2 class='unknown'>Unknown";
    }
}

function parseCategory(categories){
    let capitalisedCategories = categories==="general_knowledge" ? //ternary expression to check if category is "general_knowledge"
        "General Knowledge" : //handle special case, else...
        categories.replace("_", " and ")//replace underscore with 'and'
        .split(" ")//split string into words
        .map((word) => word === "and" ? "and" : word.charAt(0).toUpperCase() + word.slice(1)).join(" ");//capitalise first letter of each word except 'and'
    console.log(capitalisedCategories);
}
