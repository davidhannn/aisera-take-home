const fs = require("fs");
const csvParser = require("csv-parser");

const TaskTypeEnum = require("./enum.js");
const { getTimeDifferenceInMilliseconds } = require("./helper.js");

const csvFilePath = "./sample_dataset.csv";
// const file = fs.readFileSync("sample_dataset.csv", "utf-8");
// const parsedData = [];
const parsedData = {};
const timeData = {};
// create readable stream from CSV file which allows to read from file in smaller chunks
fs.createReadStream(csvFilePath)
  .pipe(csvParser())
  .on("data", (row) => {
    // console.log(row["timestamp, userID, taskID, eventType"], "row");
    const rowData = row["timestamp, userID, taskID, eventType"];
    const textData = rowData.split(", ");
    const [timeStamp, userId, taskId, eventType] = textData;
    // console.log(timeStamp, "time stamp");
    // console.log(userId, "user id");

    // console.log(taskType, "task type");

    //check if userId exists in hash
    if (parsedData[userId]) {
      // check if taskId exists
      parsedData[userId].tasks.find((item) => {
        if (item.taskId === taskId) {
          const startTime =
            item.eventType === TaskTypeEnum.TASK_STARTED
              ? item.timeStamp
              : timeStamp;

          const endTime =
            startTime === item.timeStamp ? timeStamp : item.timeStamp;

          const timeElapsed = getTimeDifferenceInMilliseconds(
            startTime,
            endTime
          );
        } else {
          parsedData[userId].tasks.push({
            taskId: taskId,
            timeStamp: timeStamp,
            eventType: eventType,
          });
        }
      });
      // if (parsedData[userId].tasks) {
      //   console.log(parsedData[userId].tasks, "here");
      // } else {
      //   parsedData[userId].taskId = [timeStamp, taskType];
      // }
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
      parsedData[userId] = {
        tasks: [{ taskId: taskId, timeStamp: timeStamp, eventType: eventType }],
      };
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
    tasks: [{
      taskId,
      timeStamp,
      type
    }]
  }
*/
