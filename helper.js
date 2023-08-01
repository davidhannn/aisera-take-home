function getTimeDifferenceInMilliseconds(timestamp1, timestamp2) {
  // Convert UNIX timestamps to JavaScript Date objects
  const date1 = new Date(timestamp1 * 1000); // Multiply by 1000 to convert seconds to milliseconds
  const date2 = new Date(timestamp2 * 1000);

  // Calculate the time difference in milliseconds
  const timeDifferenceInMilliseconds = date2 - date1;

  return timeDifferenceInMilliseconds;
}

module.exports = { getTimeDifferenceInMilliseconds };
// Example usage:
const unixTimestamp1 = 1627835941; // Replace this with your first UNIX timestamp
const unixTimestamp2 = 1630456541; // Replace this with your second UNIX timestamp

const timeDifference = getTimeDifferenceInMilliseconds(
  unixTimestamp1,
  unixTimestamp2
);
console.log("Time difference in milliseconds:", timeDifference);
