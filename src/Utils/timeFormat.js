function timeFormat(dateInput, short = false) {
  if (!dateInput) return "";
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: short ? "short" : "long",
    second: "numeric",
    hour12: false,
    timeZoneName: "short"
  };
  const locale = "en-US";
  // const locale = navigator.language;
  //Tuesday, August 10, 2021 at 19:30:00 GMT+10
  const timeArr = new Intl.DateTimeFormat(locale, options).format(new Date(dateInput)).split(", ");

  //Wednesday, 9/11/2024, 15:54:14 GMT+10
  const year = timeArr[2].split(" ")[0];
  const weekday = timeArr[0];
  const dateArr = timeArr[1].split(" ");
  const date = `${dateArr[0]}/${dateArr[1]}/${year}`;
  const time = timeArr[2].split(" ")[2];
  const dateFormatted = [date, time, weekday];
  return dateFormatted;
}

export default timeFormat;
