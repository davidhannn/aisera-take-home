const fs = require("fs");
const csvParser = require("csv-parser");

const TaskTypeEnum = require("./enum.js");
const { getTimeDifferenceInMilliseconds } = require("./helper.js");

const csvFilePath = "./sample_dataset.csv";
// const file = fs.readFileSync("sample_dataset.csv", "utf-8");
// const parsedData = [];
const parsedData = {};

// create readable stream from CSV file which allows to read from file in smaller chunks
fs.createReadStream(csvFilePath)
  .pipe(csvParser())
  .on("data", (row) => {
    // console.log(row["timestamp, userID, taskID, eventType"], "row");
    const rowData = row["timestamp, userID, taskID, eventType"];
    const textData = rowData.split(", ");
    const [timeStamp, userId, taskId, taskType] = textData;
    // console.log(timeStamp, "time stamp");
    // console.log(userId, "user id");
    console.log(taskId, "task id");
    // console.log(taskType, "task type");

    //check if userId exists in hash
    if (parsedData[userId]) {
      // check if taskId exists
      if (parsedData[userId].taskId) {
        console.log(parsedData[userId].taskId, "here");
      } else {
        parsedData[userId].taskId = [timeStamp, taskType];
      }
      // if true
      // compare the task type with the current task type
      // compare values
      // set task Id to the time difference
      // else
      // set taskId with time stamp and task type
    } else {
      // create new user Id as key and taskId as value and taskId has
      // parsedData[userId] = { taskId: [timeStamp, taskType] };
      // parsedData[userId] = { taskId };
      parsedData[userId] = [taskId];
    }
    // const data = row.split(":");
    // console.log(data, "data");
    // console.log(row);

    // parsedData.push(row);
  })
  .on("end", () => {
    console.log("Parsed CSV data:", parsedData);
    // console.log(TaskTypeEnum);
    // Your further processing with the parsed data goes here
  });

console.log("testing");

/*
  userId: {
    taskId: [EventType, TimeStamp]
  }
*/
