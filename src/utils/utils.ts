export const unixToDate = (unixTime: number): string => {
    const date = new Date(unixTime * 1000);
  
    const year = date.getFullYear().toString().slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
  
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[date.getDay()];
  
    return `${month}/${day}/${year}(${dayOfWeek})${hours}:${minutes}:${seconds}`;
  };