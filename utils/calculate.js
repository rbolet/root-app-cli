module.exports = {
  sumAndAverageRows(driverRows = []) {
    let totalDistance = 0;
    let totalTime = 0;
    for (const trip of driverRows) {
      const { startTime, endTime, distance } = trip;
      totalDistance += distance;
      totalTime += this.getTime(startTime, endTime);
    }
    // speed rounded to nearest 10th or zero if no trips
    const averageSpeed = totalTime
      ? Math.round(this.averageSpeed(totalTime, totalDistance) * 10) / 10
      : 0;
    // distance rounded to nearest whole #
    totalDistance = Math.round(totalDistance);

    return {
      totalDistance,
      averageSpeed
    };
  },
  averageSpeed(time, distance) {
    return distance / time;
  },
  getTime(stringStartTime, stringEndTime) {
    const startHours = this.convertStringsToHours(stringStartTime);
    const endHours = this.convertStringsToHours(stringEndTime);
    return endHours - startHours;
  },
  convertStringsToHours(stringTime) {
    const [hours, minutes] = stringTime.split(":").map(string => parseInt(string));
    return hours + minutes / 60;
  }
};
