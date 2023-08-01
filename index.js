const fs = require("fs");
const csvParser = require("csv-parser");

const csvFilePath = "./sample_dataset.csv";
// const file = fs.readFileSync("sample_dataset.csv", "utf-8");
const parsedData = [];

// create readable stream from CSV file which allows to read from file in smaller chunks
fs.createReadStream(csvFilePath)
  .pipe(csvParser())
  .on("data", (row) => {
    console.log(row, "row");
    parsedData.push(row);
  })
  .on("end", () => {
    console.log("Parsed CSV data:", parsedData);
    // Your further processing with the parsed data goes here
  });

console.log("testing");
