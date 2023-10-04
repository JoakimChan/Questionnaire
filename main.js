const prompt = require(`prompt-sync`)({ sigint: true });
const fs = require('fs');
const quest = require('./questions.json');
const result = require('./result.json');

let quit1 = false;
const animals = ['cat', 'dog', 'rabbit', 'fish'];
const jsonArray = [];

for (let i = 0; i < result.length; i++) {
  jsonArray.push(result[i])
}

while (!quit1) {
  let choice1 = prompt("1. köra formulärten    2. visa alla resultat     q. avsluta programet   svar: ").trim().toLocaleLowerCase();
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
            let choice2 = prompt("y. ja    n. nej    q. sluta formuläret    svar: ").trim().toLocaleLowerCase();
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
                console.log("valet finns inte!");
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
          //input 3
          let playAgain = prompt("1. kör formuläret igen     q. sluta spela     svar: ").trim().toLocaleLowerCase();
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
              console.log("valet finns inte!");
          }
        } while (!quit4);
      } while (!quit2);

      //write to the file
      fs.writeFile('./result.json', JSON.stringify(jsonArray, null, 2), (err) => {
        if (err) throw err;
        console.log("Successfully wrote file");
      });
      break;
    case '2':
      //display the result
      if (jsonArray.length === 0) {
        console.log("det finns inge tidigre resultater!")
      } else {
        for (let i = 0; i < jsonArray.length; i++) {
          console.log(jsonArray[i]);
        }
      }
      break;
    case 'q':
      //quit the program
      quit1 = true;
      break;
    default:
      //invalade value
      console.log("valet finns inte! 3")
  }
}