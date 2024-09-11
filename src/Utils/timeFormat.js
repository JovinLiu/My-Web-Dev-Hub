function timeFormat(createdAt) {
  if (!createdAt) return "";
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    weekday: "long",
    second: "numeric",
    hour12: false,
    timeZoneName: "short"
  };
  const locale = navigator.language;
  const timeArr = new Intl.DateTimeFormat(locale, options).format(new Date(createdAt)).split(", ");
  //Wednesday, 9/11/2024, 15:54:14 GMT+10
  const day = timeArr[0];
  const dateArr = timeArr[1].split("/");
  const date = `${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`;
  const time = timeArr[2].split(" ")[0];
  const createdAtFormatted = [date, time, day];
  //['11/9/2024', '15:50:26', 'Wednesday']
  return createdAtFormatted;
}

export default timeFormat;
