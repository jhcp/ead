/******************** QUIZ ****************************/

$(document).ready(function () {
    $('.quiz-container').each(function (i, quiz) {

        id = 'quiz' + i;
        $(quiz).attr('id', id);
        text = $(quiz).data('quiz-text');
        answers = $(quiz).data('quiz-answers');
        correctAnswer = $(quiz).data('quiz-correct');
        quizObject = {
            id: id,
            text: text,
            answers: answers,
            correctAnswer: correctAnswer
        };
        generateQuiz2(quizObject);
    });
});

/* quiz code adapted from https://simplestepscode.com/javascript-quiz-tutorial/ */
function generateQuiz2(quiz) {
    quizDiv = $('#'+quiz.id);
    quizDiv.append('<div class="quiz">' + quiz.text + '</div>');


    function shuffle(sourceArray) {
        //Fisher-Yates-Durstenfeld shuffle
        //from https://stackoverflow.com/questions/3718282/javascript-shuffling-objects-inside-an-object-randomize
        for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));

            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];
            sourceArray[i] = temp;
        }
        return sourceArray;
    }

    function showQuestions(questions, quizContainer) {
        // we'll need a place to store the output and the answer choices
        var output = [];
        var answers = [];

        // for each available answer to this question...
        for (letter in questions.answers) {
            // ...add an html radio button
            answers.push(
                '<label class="quiz answer-container">'
                + '<input type="radio" name="' + quiz.id + '" value="' + letter + '">'
                // + letter + ') '
                + questions.answers[letter]
                + '<span class="checkmark"></span></label>'
            );
        }
        shuffle(answers);

        // add this question and its answers to the output
        output.push('<div class="answers quiz">' + answers.join('') + '</div>');

        // finally combine our output list into one string of html and put it on the page
        quizContainer.append(output.join(''));
    }

    function showResult(questions, quizContainer, resultsContainer, submitButton) {

        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');
        answerContainers = answerContainers[0];

        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;

        // find selected answer
        userAnswer = (answerContainers.querySelector('input[name=' + quiz.id + ']:checked') || {}).value;

        // if answer is correct
        if (userAnswer === questions.correctAnswer) {
            // add to the number of correct answers
            numCorrect++;

            // color the answers green
            answerContainers.style.color = 'green';
            animateCSS(submitButton, 'rubberBand');
            // moTimeline.replay();
        }
        // if answer is wrong or blank
        else {
            // color the answers red
            answerContainers.style.color = 'red';
            // animateCSS('#submit', 'hinge');
            animateCSS(submitButton, 'shake');
        }
        animateCSS(resultsContainer, 'fadeInDown');


        if (numCorrect === 1) {
            resultsContainer.innerHTML = 'correto!'
        } else {
            resultsContainer.innerHTML = 'errado, tente de novo!'
        }

        // show number of correct answers out of total
        // resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    }

    // show the possible answers
    showQuestions(quiz, quizDiv);
    quizDiv.append('<button id="submit-' + quiz.id + '" class="quiz-submit">responder</button>');
    quizDiv.append('<div id="result-' + quiz.id + '" class="quiz-results"></div>');

    // when user clicks submit, show results
    $('#submit-' + quiz.id).click(function () {
        showResult(quiz, document.getElementById(quiz.id), document.getElementById('result-' + quiz.id), this);
    });


}
function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {

    function shuffle(sourceArray) {
        //Fisher-Yates-Durstenfeld shuffle
        //from https://stackoverflow.com/questions/3718282/javascript-shuffling-objects-inside-an-object-randomize
        for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));

            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];
            sourceArray[i] = temp;
        }
        return sourceArray;
    }

    function showQuestions(questions, quizContainer) {
        // we'll need a place to store the output and the answer choices
        var output = [];
        var answers;

        // for each question...
        for (var i = 0; i < questions.length; i++) {

            // first reset the list of answers
            answers = [];

            // for each available answer to this question...
            for (letter in questions[i].answers) {
                // ...add an html radio button
                answers.push(
                    '<label class="quiz answer-container">'
                    + '<input type="radio" name="question' + i + '" value="' + letter + '">'
                    // + letter + ') '
                    + questions[i].answers[letter]
                    + '<span class="checkmark"></span></label>'
                );
            }
            shuffle(answers);

            // add this question and its answers to the output
            output.push(
                '<div class="question quiz">' + questions[i].question + '</div>'
                + '<div class="answers quiz">' + answers.join('') + '</div>'
            );
        }

        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }

    function showResults(questions, quizContainer, resultsContainer) {

        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;

        // for each question...
        for (var i = 0; i < questions.length; i++) {

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

            // if answer is correct
            if (userAnswer === questions[i].correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[i].style.color = 'green';
                animateCSS(submitButton, 'rubberBand');
                // moTimeline.replay();
            }
            // if answer is wrong or blank
            else {
                // color the answers red
                answerContainers[i].style.color = 'red';
                // animateCSS('#submit', 'hinge');
                animateCSS(submitButton, 'shake');
            }
            animateCSS(resultsContainer, 'fadeInDown');
        }


        if (numCorrect === 1) {
            resultsContainer.innerHTML = 'correto!'
        } else {
            resultsContainer.innerHTML = 'errado, tente de novo!'
        }

        // show number of correct answers out of total
        // resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    }

    // show the questions
    showQuestions(questions, quizContainer);

    // when user clicks submit, show results
    submitButton.onclick = function () {
        showResults(questions, quizContainer, resultsContainer);
    };
}

// function removerResultado

//facilitate use of Animate.css
function animateCSS(element, animationName, callback) {
    var node = $(element);
    node.addClass('animated ' + animationName);

    var actualNode = node.get(0);
    actualNode.addEventListener('animationend', handleAnimationEnd);

    function handleAnimationEnd() {
        node.removeClass('animated ' + animationName);
        actualNode.removeEventListener('animationend', handleAnimationEnd);

        if (typeof callback === 'function') callback();
    }
}