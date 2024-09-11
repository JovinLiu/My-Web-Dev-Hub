function getTime() {
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

  const time = new Intl.DateTimeFormat(navigator.language, options).format(new Date());
  return time;
}

export default getTime;
