exports.sumAndAverageRows = (driverTripRows = []) => {
  //to-do: input validation-- assuming perfect input for now
  let totalDistance = 0;
  let totalTime = 0;
  for (const trip of driverTripRows) {
    const { startTime, endTime, distance } = trip;
    totalDistance += distance;
    totalTime += this.getTime(startTime, endTime);
  }
  // speed rounded to nearest 10th or zero if no trips
  const averageSpeed = totalTime ? Math.round(this.averageSpeed(totalTime, totalDistance)) : 0;
  // distance rounded to nearest whole #
  totalDistance = Math.round(totalDistance);

  return {
    totalDistance,
    averageSpeed,
  };
};

exports.averageSpeed = (time, distance) => {
  return distance / time;
};

exports.getTime = (stringStartTime, stringEndTime) => {
  const startHours = this.convertStringsToHours(stringStartTime);
  const endHours = this.convertStringsToHours(stringEndTime);
  //todo: input validation-- assuming perfect input for now
  return endHours - startHours;
};

exports.convertStringsToHours = (stringTime) => {
  const [hours, minutes] = stringTime.split(":").map((string) => parseInt(string));
  //todo: input validation to ensure hours and minutes are valid-- assuming perfect input for now
  return hours + minutes / 60;
};
