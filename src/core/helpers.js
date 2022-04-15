export function getDateString(date) {
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    date.getDate() + " " + monthName[date.getMonth()] + " " + date.getFullYear()
  );
}
