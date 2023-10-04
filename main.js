const prompt = require(`prompt-sync`)({ sigint: true });
const fs = require('fs');
const quest = require('./questions.json');
const result = require('./result.json');

const jsonArray = [];
let quit1 = false;
let isEmpty = false;
const animals = ['cat', 'dog', 'rabbit', 'fish'];

//reoad file
const jsonData = fs.readFileSync('./result.json', 'utf-8', (err) => {
  if (err) console.error('Error reading the JSON file: ', err)
  return;
});

//cheack if the file is empty
try {
  JSON.parse(jsonData);
  if (isObjectEmpty(jsonData)) {
    console.log("file is empty");
    isEmpty = true;
  } else {
    console.log("file is not empty")
    for (let i = 0; i < result.length; i++) {
      jsonArray.push(result[i])
    }
  }
} catch (err) {
  console.log(err);
}

while (!quit1) {
  let choice1 = prompt("1. köra formulärten    2. visa tidigare resultat     q. avsluta programet   svar: ").trim().toLocaleLowerCase();
  switch (choice1) {
    case '1':
      let quit2 = false;
      do {
        let points = [0, 0, 0, 0];
        let totalPoint = 0;
        let name = prompt("vad heter du?: ");

        for (let i = 0; i < quest.length; i++) {
          if (i === 'stop') { break; }
          let quit3 = false;
          do {
            console.log(quest[i].q);
            let choice2 = ' ';
            choice2 = prompt("y. ja    n. nej    q. sluta formuläret    svar: ").trim().toLocaleLowerCase();
            switch (choice2) {
              case 'y':
                //caculate yes-points
                for (let j = 0; j < points.length; j++) {
                  points[j] += quest[i].y[j];
                }
                quit3 = true;
                break;
              case 'n':
                //caculate no-points
                for (let j = 0; j < points.length; j++) {
                  points[j] += quest[i].n[j];
                }
                quit3 = true;
                break;
              case 'q':
                //break the for-loop
                i = 'stop';
                quit3 = true;
                break;
              default:
                //invalade value
                console.log("valet finns inte!  1");
            }
          } while (!quit3);
        }

        //caculate totalpoints
        totalPoint = points.reduce((prev, curr) => prev + curr, 0)

        const scores = [];
        //add object in scores-array with animal name and score in percentage
        for (let i = 0; i < animals.length; i++) {
          if (points[i] <= 0) {
            scores[i] = { animal: animals[i], score: points[i].toFixed(2) };
          } else {
            scores[i] = { animal: animals[i], score: ((points[i] / totalPoint) * 100).toFixed(2) };
          }
        }

        //sort the score
        scores.sort((a, b) => b.score - a.score);

        let player = {
          'name': name,
          'time': new Date().toLocaleString(),
          'scores': scores
        };

        console.log(player);

        jsonArray.push(player);

        let quit4 = false;
        do {
          let playAgain = " ";
          //input 3
          playAgain = prompt("1. kör formuläret igen     q. sluta spela     svar: ").trim().toLocaleLowerCase();
          switch (playAgain) {
            case '1':
              quit4 = true;
              break;
            case 'q':
              quit2 = true;
              quit4 = true;
              break;
            default:
              //invalade value
              console.log("valet finns inte! 2");
          }
        } while (!quit4);
      } while (!quit2);

      //write to the file
      fs.writeFile('./result.json', JSON.stringify(jsonArray, null, 2), (err) => {
        if (err) throw err;
        console.log('Successfully wrote file');
      });
      break;
    case '2':
      //display the result from the file
      if (isEmpty == true) {
        console.log("filen är tom!")
      } else {
        for (let i = 0; i < result.length; i++) {
          console.log(result[i]);
        }
      }
      break;
    case 'q':
      quit1 = true;
      break;
    default:
      //invalade value
      console.log("valet finns inte! 3")
  }
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}