// Import necessary modules
const prompt = require('prompt-sync')({ sigint: true }); // For user input
const fs = require('fs'); // For file system operations
const quest = require('./questions.json'); // Load questions from JSON file
const jsonArray = JSON.parse(fs.readFileSync('./result.json', 'utf-8')); // Load previous results
const animals = ['cat', 'dog', 'rabbit', 'fish']; // List of animals for scoring

let main = false; // Flag to control the main loop
while (!main) {
  // Prompt user for action
  let choice = prompt("1. run the form    2. show all results     q. exit the program   answer: ").trim().toLocaleLowerCase();
  switch (choice) {
    case '1':
      theForm(); // Run the form
      break;
    case '2':
      displayResult(); // Display all results
      break;
    case 'q':
      writeToJason(); // Save results to file and exit
      main = true;
      break;
    default:
      invaladeValue(); // Handle invalid choices
  }
}

// Function to run the form
function theForm() {
  let endTheForm = false; // Flag to control the form loop
  while (!endTheForm) {
    let points = [0, 0, 0, 0]; // Initialize points for each animal
    let totalPoint = 0; // Total points
    let name = prompt("name: ").trim().toLocaleLowerCase(); // Get user name

    // Iterate through each question
    for (let i = 0; i < quest.length; i++) {
      if (i === 'stop') { break; } // Exit loop if 'stop' is encountered
      let answer = false; // Flag for user answer
      while (!answer) {
        console.log(quest[i].q); // Display question
        let choice2 = prompt("y. Yes    n. No    q. Stop the form    answer: ").trim().toLocaleLowerCase();
        switch (choice2) {
          case 'y':
            // Calculate points for 'Yes'
            for (let j = 0; j < points.length; j++) {
              points[j] += quest[i].y[j];
            }
            answer = true;
            break;
          case 'n':
            // Calculate points for 'No'
            for (let j = 0; j < points.length; j++) {
              points[j] += quest[i].n[j];
            }
            answer = true;
            break;
          case 'q':
            // Stop the form
            i = 'stop';
            answer = true;
            break;
          default:
            invaladeValue(); // Handle invalid choices
        }
      }
    }

    // Calculate and display results
    caculateAndPunch(points, totalPoint, name);

    // Prompt user to either run the form again or close it
    let endForm = false;
    while (!endForm) {
      let playAgain = prompt("1. run the form again     q. close the forms     answer: ").trim().toLocaleLowerCase();
      switch (playAgain) {
        case '1':
          endForm = true; // Run the form again
          break;
        case 'q':
          endTheForm = true; // Exit the form
          endForm = true;
          break;
        default:
          invaladeValue(); // Handle invalid choices
      }
    }
  }
}

// Function to calculate and display results
function caculateAndPunch(points, totalPoint, name) {
  // Calculate total points
  totalPoint = points.reduce((prev, curr) => prev + curr, 0);

  const scores = [];
  // Prepare scores array with animal names and scores in percentage
  for (let i = 0; i < animals.length; i++) {
    if (points[i] <= 0) {
      scores[i] = { animal: animals[i], score: points[i].toFixed(2) };
    } else {
      scores[i] = { animal: animals[i], score: ((points[i] / totalPoint) * 100).toFixed(2) };
    }
  }

  // Sort scores in descending order
  scores.sort((a, b) => b.score - a.score);

  // Update results in jsonArray
  if (jsonArray.find(player => Object.keys(player)[0] === name)) {
    const existingPlayer = jsonArray.find(player => Object.keys(player)[0] === name);
    existingPlayer[name].push({
      'time': new Date().toLocaleString(),
      'scores': scores
    });
  } else {
    let player = {};
    player[name] = [{
      'time': new Date().toLocaleString(),
      'scores': scores
    }];
    jsonArray.push(player);
  }

  // Display the result
  console.log(name + " : ");
  scores.forEach(scoreObject => {
    console.log(JSON.stringify(scoreObject));
  });
}

// Function to display all results
function displayResult() {
  if (jsonArray.length === 0) {
    console.log("There are no previous results!");
  } else {
    for (let i = 0; i < jsonArray.length; i++) {
      for (let key in jsonArray[i]) {
        console.log(`${key} :`);
        if (jsonArray[i].hasOwnProperty(key)) {
          for (let j = 0; j < jsonArray[i][key].length; j++) {
            console.log(`Time: ${jsonArray[i][key][j].time}`);
            console.table(jsonArray[i][key][j].scores);
          }
        }
      }
    }
  }
}

// Function to handle invalid choices
function invaladeValue() {
  console.log("The choice does not exist!");
}

// Function to save results to file
function writeToJason() {
  fs.writeFile('./result.json', JSON.stringify(jsonArray, null, 2), (err) => {
    if (err) throw err;
    console.log("Successfully wrote file");
  });
}
