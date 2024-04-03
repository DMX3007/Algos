const { writingIntoFile, getAllMethods } = require("./utils");
// const Quadratic = require("./sorts/quadraticSorts");
const nLogNSorts = require("./sorts/nLogNSorts");
const AllOfGroups = require("./data");

async function main() {
  try {
    // const instance = new Quadratic([]); // Instantiate the Quadratic class
    const instance = new nLogNSorts([]); // Instantiate the nLogNSorts class
    const arrayOfSorts = getAllMethods(instance).filter(
      (el) => el !== "constructor"
    );

    for (let i = 0; i < AllOfGroups.AllOfGroups.length; i++) {
      instance.array = AllOfGroups.AllOfGroups[i][1];
      let typeOfTestData = AllOfGroups.AllOfGroups[i][0];

      // === for MergeSort algo test ONLY===
      // try {
      //   let array = AllOfGroups.AllOfGroups[i][1];
      //   let typeOfTestData = AllOfGroups.AllOfGroups[i][0];
      //   let text = "";
      //   let nameOfSortingAlgo = "mergeSort";
      //   let start = performance.now().toFixed(2);

      //   instance.sort(array);
      //   let end = performance.now().toFixed(2);
      //   let timeBetweenStartStopMS =
      //     (end - start).toFixed(2) + " " + "miliseconds";
      //   text = `${nameOfSortingAlgo} ${typeOfTestData} ${timeBetweenStartStopMS}\n'`;

      //   let statusOfWriting = writingIntoFile(nameOfSortingAlgo, text);
      //   console.log(statusOfWriting);
      // } catch (err) {
      //   console.log(err);
      // }
      // === END OF MERGE SORT TESTING

      try {
        arrayOfSorts.forEach((typeOfSortingAlgo) => {
          let nameOfSortingAlgo = typeOfSortingAlgo;
          let start = performance.now().toFixed(2);
          instance[typeOfSortingAlgo]();
          let end = performance.now().toFixed(2);
          let timeBetweenStartStopMS =
            (end - start).toFixed(2) + " " + "miliseconds";
          text = `${typeOfSortingAlgo} ${typeOfTestData} ${timeBetweenStartStopMS}\n'`;

          let statusOfWriting = writingIntoFile(nameOfSortingAlgo, text);
          console.log(statusOfWriting);
        });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

main();
