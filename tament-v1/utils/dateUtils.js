export function myDate(dateStr) {
  if(!dateStr) dateStr = new Date()
  
  var d = new Date(dateStr);
  var m = d.getMonth();
  var y = d.getFullYear();
  var myD = d.getDate();
  var localeDate = d.toLocaleDateString('en-US', {
    month: 'short',
    weekday: 'short',
    day: 'numeric',
  });
  var localeTime = d.toLocaleTimeString('en-US',{
    hours : 'minutes',
    seconds : 'minutes'
  })

  return {
    date: d,
    Month: m,
    Year: y,
    Day: myD,
    localeDate,
    localeTime
  };
}

export function isToday(dateStr) {
  const pastDate = myDate(dateStr);

  const thisDate = myDate();

  const isSameMonth = pastDate.Month === thisDate.Month;
  const isSameYear = pastDate.Year === thisDate.Year;
  const isSameDay = pastDate.Day === thisDate.Day;

  return isSameMonth && isSameYear && isSameDay;
}

export const isTomorrow = (dateStr) => {
  var d = new Date();
  d.setDate(d.getDate() + 1);
  var date = myDate(d).localeDate.toString();
  return date === dateStr.toString();
};

// is overdue func
export const isOverdue = (dateStr) => {
  return new Date() > new Date(dateStr);
};

// is upcoming func
export const isUpcoming = (dateStr) => !isToday(dateStr) && !isOverdue(dateStr);

export const formateDate = (dateStr) => {
  if (isToday(dateStr)) return 'Today';
  return myDate(dateStr).localeDate.toString();
};
