#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// for API link of Quiz we searched for openTDB(open trivia data base)
async function fetching(data) {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.results;
}
let apiLink; //declaring apiLink
// let ArrayData = data.results; //results is an array which is present in an object so we can access it through a dot(.)
// console.log(ArrayData); //printing an array which include all questions and answers in the form of objects
let quiz = async () => {
    let score = 0;
    let playerName = await inquirer.prompt({
        name: "name",
        type: "input",
        message: chalk.yellow.bold("INPUT YOUR NAME..."),
        validate: function (val) {
            if (val.trim() !== "") {
                return true;
            }
            else {
                return chalk.red("NAME CANNOT BE EMPTY!");
            }
        },
    });
    console.log(chalk.magenta(chalk.green("-".repeat(50)), `${playerName.name} WELCOME TO THE QUIZ GAME `), chalk.green("-".repeat(50)));
    let operation = await inquirer.prompt({
        name: "select",
        type: "list",
        message: chalk.yellow.bold("SELECT MODE FOR THE QUIZ"),
        choices: ["EASY", "MEDIUM", "HARD"],
    });
    console.log(chalk.bgRed("NOTE:"), chalk.red(`THERE WILL BE ${chalk.yellow("FIVE(5)")} QUESTIONS. EACH QUESTION WILL CONTAIN ${chalk.yellow("one(1)")} MARK!`));
    if (operation.select === "EASY") {
        apiLink = "https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple"; //initializing apiLink
        let data = await fetching(apiLink); //calling the uppermost function
        for (let i = 1; i <= 5; i++) {
            let mcqsOption = [...data[i].incorrect_answers, data[i].correct_answer];
            //to change the position of the correct answer
            let randomNumber = Math.floor(Math.random() * 3 + 1); //generate number from 1-3
            let MCQsOption = mcqsOption[randomNumber];
            let Options = mcqsOption.filter((e, i) => i !== randomNumber);
            Options.push(MCQsOption);
            let question = await inquirer.prompt({
                name: "answer",
                type: "list",
                message: chalk.yellow.italic(data[i].question),
                choices: Options.map((val) => val)
            });
            if (question.answer === data[i].correct_answer) {
                console.log(chalk.green("YOU GUESSED THE RIGHT ANSWER"));
                score++;
            }
            if (question.answer !== data[i].correct_answer) {
                console.log(chalk.red("YOU GUESSED THE WRONG ANSWER"), chalk.green(`THE CORRECT ANSWER IS: ${data[i].correct_answer}`));
            }
            console.log("-".repeat(100));
        }
        console.log(chalk.yellow(`YOU OBTAINED ${chalk.magenta(score)} FROM ${chalk.magenta("5")}`));
    }
    if (operation.select === "MEDIUM") {
        apiLink =
            "https://opentdb.com/api.php?amount=6&category=18&difficulty=medium&type=multiple";
        let data = await fetching(apiLink); //calling the above function
        for (let i = 1; i <= 5; i++) {
            let mcqsOption = [...data[i].incorrect_answers, data[i].correct_answer];
            //to change the position of the correct answer
            let randomNumber = Math.floor(Math.random() * 3 + 1); //generate number from 1-3
            let MCQsOption = mcqsOption[randomNumber];
            let Options = mcqsOption.filter((e, i) => i !== randomNumber);
            Options.push(MCQsOption);
            let question = await inquirer.prompt({
                name: "answer",
                type: "list",
                message: chalk.yellow.italic(data[i].question),
                choices: Options.map(val => val)
            });
            if (question.answer === data[i].correct_answer) {
                console.log(chalk.green("YOU GUESSED THE RIGHT ANSWER"));
                score++;
            }
            if (question.answer !== data[i].correct_answer) {
                console.log(chalk.red("YOU GUESSED THE WRONG ANSWER"), chalk.green(`THE CORRECT ANSWER IS: ${data[i].correct_answer}`));
            }
            console.log("-".repeat(100));
        }
        console.log(chalk.yellow(`YOU OBTAINED ${chalk.magenta(score)} FROM ${chalk.magenta("5")}`));
    }
    if (operation.select === "HARD") {
        apiLink =
            "https://opentdb.com/api.php?amount=6&category=18&difficulty=hard&type=multiple";
        let data = await fetching(apiLink); //calling the above function
        for (let i = 1; i <= 5; i++) {
            let mcqsOption = [...data[i].incorrect_answers, data[i].correct_answer];
            //to change the position of the correct answer
            let randomNumber = Math.floor(Math.random() * 3 + 1); //generate number from 1-3
            let MCQsOption = mcqsOption[randomNumber];
            let Options = mcqsOption.filter((e, i) => i !== randomNumber);
            Options.push(MCQsOption);
            let question = await inquirer.prompt({
                name: "answer",
                type: "list",
                message: chalk.yellow.italic(data[i].question),
                choices: Options.map(val => val)
            });
            if (question.answer === data[i].correct_answer) {
                console.log(chalk.green("YOU GUESSED THE RIGHT ANSWER"));
                score++;
            }
            if (question.answer !== data[i].correct_answer) {
                console.log(chalk.red("YOU GUESSED THE WRONG ANSWER"), chalk.green(`THE CORRECT ANSWER IS: ${data[i].correct_answer}`));
            }
            console.log("-".repeat(100));
        }
        console.log(chalk.yellow(`YOU OBTAINED ${chalk.magenta(score)} FROM ${chalk.magenta("5")}`));
    }
};
quiz();
