export default {
  formatTime(time) {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.round((time - minutes * 60) || 0);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  },
  addHoursToDate(date, hours) {
    const mlSeconds = date.getTime();
    const addMlSeconds = (hours * 60) * 60 * 1000;
    const newDate = new Date(mlSeconds + addMlSeconds);

    return newDate;
  },
  randomRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
};
