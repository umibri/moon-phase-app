export const getJD = (date? : Date) => {
  const currDate = typeof date !== 'undefined' ? date : new Date();
  const currTime = currDate.getTime();
  
  return Math.floor(currTime / 86400000) - (currDate.getTimezoneOffset() / 1440) + 2440587.5;
}

export const getDate = () => {
  const date = new Date();

  return date.toDateString();
}
