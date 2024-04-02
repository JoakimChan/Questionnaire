const prompt = require(`prompt-sync`)({ sigint: true });
const fs = require('fs');
const quest = require('./questions.json');
const jsonArray = JSON.parse(fs.readFileSync('./result.json', 'utf-8'));
const animals = ['cat', 'dog', 'rabbit', 'fish'];

let main = false;
while (!main) {
  let choice = prompt("1. run the form    2. show all results     q. exit the program   answer: ").trim().toLocaleLowerCase();
  switch (choice) {
    case '1':
      theForm()
      break;
    case '2':
      displayResult()
      break;
    case 'q':
      writeToJason()
      main = true;
      break;
    default:
      invaladeValue()
  }
}

function theForm() {
  let endTheForm = false;
  while (!endTheForm) {
    let points = [0, 0, 0, 0];
    let totalPoint = 0;
    let name = prompt("name: ").trim().toLocaleLowerCase();

    for (let i = 0; i < quest.length; i++) {
      if (i === 'stop') { break; }
      let answer = false;
      while (!answer) {
        console.log(quest[i].q);
        let choice2 = prompt("y. Yes    n. No    q. Stop the form    answer: ").trim().toLocaleLowerCase();
        switch (choice2) {
          case 'y':
            //caculate yes-points
            for (let j = 0; j < points.length; j++) {
              points[j] += quest[i].y[j];
            }
            answer = true;
            break;
          case 'n':
            //caculate no-points
            for (let j = 0; j < points.length; j++) {
              points[j] += quest[i].n[j];
            }
            answer = true;
            break;
          case 'q':
            //break the for-loop
            i = 'stop';
            answer = true;
            break;
          default:
            invaladeValue()
        }
      };
    }

    caculateAndPunch(points, totalPoint, name)

    let endForm = false;
    while (!endForm) {
      let playAgain = prompt("1. run the form again     q. close the forms     answer: ").trim().toLocaleLowerCase();
      switch (playAgain) {
        case '1':
          endForm = true;
          break;
        case 'q':
          endTheForm = true;
          endForm = true;
          break;
        default:
          invaladeValue()
      }
    };
  };
}

function caculateAndPunch(points, totalPoint, name) {
  //caculate totalpoints
  totalPoint = points.reduce((prev, curr) => prev + curr, 0)

  const scores = [];
  //puch object into scores-array with animal name and score in percentage
  for (let i = 0; i < animals.length; i++) {
    if (points[i] <= 0) {
      scores[i] = { animal: animals[i], score: points[i].toFixed(2) };
    } else {
      scores[i] = { animal: animals[i], score: ((points[i] / totalPoint) * 100).toFixed(2) };
    }
  }

  //sort the score
  scores.sort((a, b) => b.score - a.score);

  //puch to arrey
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

  //console the result
  console.log(name + " : ");
  scores.forEach(scoreObject => {
    console.log(JSON.stringify(scoreObject));
  });
}

function displayResult() {
  if (jsonArray.length === 0) {
    console.log("There are no previous results!");
  } else {
    for (let i = 0; i < jsonArray.length; i++) {
      for (let key in jsonArray[i]) {
        console.log(`${key} :`);
        if (jsonArray[i].hasOwnProperty(key)) {
          for (let j = 0; j < jsonArray[i][key].length; j++) {
            console.log(`Time: ${jsonArray[i][key][j].time}`)
            console.table(jsonArray[i][key][j].scores);
          }
        }
      }
    }
  }
}

function invaladeValue() {
  console.log("the choice does not exist!")
}

function writeToJason() {
  fs.writeFile('./result.json', JSON.stringify(jsonArray, null, 2), (err) => {
    if (err) throw err;
    console.log("Successfully wrote file");
  });
}