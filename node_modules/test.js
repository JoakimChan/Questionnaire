//cat - dog - rabbit - fish

[
  {
    "q": "gillar du vara ute?",
    "y": [
      1,
      2,
      1,
      0
    ],
    "n": [
      1,
      0,
      1,
      2
    ]
  },
  {
    "q": "är du allergisk mot päls?",
    "y": [
      0,
      0,
      0,
      2
    ],
    "n": [
      1,
      1,
      1,
      1
    ]
  },
  {
    "q": "gillar du uppmärksamhet?",
    "y": [
      1,
      2,
      1,
      0
    ],
    "n": [
      1,
      0,
      1,
      1
    ]
  },
  {
    "q": "orkar du ta hand om ditt djur ofta",
    "y": [
      0,
      2,
      1,
      1
    ],
    "n": [
      2,
      0,
      1,
      2
    ]
  },
  {
    "q": "orkar du städa undan ditt djur efter",
    "y": [
      2,
      2,
      1,
      0
    ],
    "n": [
      0,
      0,
      1,
      2
    ]
  },
]
/*
    JSON.stringify(data);
    jsonFil.push(data);
*/

/*
      //asynchronously
      fs.readFile('./result.json', 'utf-8', (err, jsonString) => {
        if (err) {
          console.log(err);
        } else {
          try {
            const jsonData = JSON.parse(jsonString);
            console.log(jsonData);
          } catch (err) {
            console.log('Error parsing JSON', err);
          }
        }
      });

//synchronously
try {
  const jsonData = fs.readFileSync('./result.json', 'utf-8');
  const data = JSON.parse(jsonData);
  JSON.stringify(data);
  console.log(JSON.stringify(data, null, 2));
} catch (err) {
  console.log(err);
}
*/