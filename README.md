# TestingAlgos
Generate testing data and execute all methods defined inside Classes for Quadratic and NLogN comlexity of Algorigthm

## Initialization
```
npm install
```

## Preparation
1. add your methods inside Class ./sorts/Quadratic.js or ./sorts/nLogNSorts.js
2. open file index.js and uncomment one of Class constructor function, on strings 2,3 and 8,9

// const Quadratic = require("./sorts/quadraticSorts");
const nLogNSorts = require("./sorts/nLogNSorts");

const instance = new Quadratic([]); // Instantiate the Quadratic class
// const instance = new nLogNSorts([]); // Instantiate the nLogNSorts class

# Execution 
run command
```
node index.js
```

Results of testing should appear somewhere in a files. In a current directory with a name of sorting algorithm
