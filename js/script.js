const calendar = document.getElementById("calendar");
let selectedYear = 2023;
let selectedMonth = 1;

const holidays = [
  {
    day: 1,
    month: 1,
    name: "Novo leto",
  },
  {
    day: 2,
    month: 1,
    name: "Novo leto",
  },
  {
    day: 8,
    month: 2,
    name: "Prešernov dan",
  },
  {
    day: 27,
    month: 4,
    name: "Dan upora proti okupatorju",
  },
  {
    day: 1,
    month: 5,
    name: "Praznik dela",
  },
  {
    day: 2,
    month: 5,
    name: "Praznik dela",
  },
  {
    day: 25,
    month: 6,
    name: "Dan državnosti",
  },
  {
    day: 15,
    month: 8,
    name: "Marijino vnebovzetje",
  },
  {
    day: 31,
    month: 10,
    name: "Dan reformacije",
  },
  {
    day: 1,
    month: 11,
    name: "Dan spomina na mrtve",
  },
  {
    day: 25,
    month: 12,
    name: "Božič",
  },
  {
    day: 26,
    month: 12,
    name: "Dan samostojnosti in enotnosti",
  },
];
function isEaster(year, month, day) {
  let date, a, b, c, m, d;
  date = new Date();
  date.setFullYear(year);
  date.setMonth(month - 1);
  date.setDate(day);
  a = year % 19;
  b = 2200 <= year && year <= 2299 ? (11 * a + 4) % 30 : (11 * a + 5) % 30;
  c = b === 0 || (b === 1 && a > 10) ? b + 1 : b;
  m = 1 <= c && c <= 19 ? 3 : 2;
  d = (50 - c) % 31;
  date.setMonth(m, d);
  date.setMonth(m, d + (7 - date.getDay()));
  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
}
function isEasterMonday(year, month, day) {
  let date, a, b, c, m, d;
  date = new Date();
  date.setFullYear(year);
  date.setMonth(month - 1);
  date.setDate(day);
  a = year % 19;
  b = 2200 <= year && year <= 2299 ? (11 * a + 4) % 30 : (11 * a + 5) % 30;
  c = b === 0 || (b === 1 && a > 10) ? b + 1 : b;
  m = 1 <= c && c <= 19 ? 3 : 2;
  d = (50 - c) % 31;
  date.setMonth(m, d);
  date.setMonth(m, d + (7 - date.getDay()));
  date.setDate(date.getDate() + 1);
  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month && // Add 1 to the month because it's zero-based
    date.getDate() === day
  );
}
const daysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};
const getFirstDay = (year, month) => {
  return new Date(year, month - 1, 1).getDay();
};
const getDay = (year, month, day) => {
  return new Date(year, month - 1, day).getDay();
};
const getHoliday = (year, month, day) => {
  if (isEaster(year, month, day)) {
    return {
      day: day,
      month: month,
      name: "Velika noč",
    };
  }
  if (isEasterMonday(year, month, day)) {
    return {
      day: day,
      month: month,
      name: "Velikonočni ponedeljek",
    };
  }
  return holidays.find(
    (holiday) => holiday.day === day && holiday.month === month,
  );
};
const nextMonth = () => {
  if (selectedMonth === 12) {
    selectedMonth = 1;
    selectedYear++;
  } else {
    selectedMonth++;
  }
  calendar.innerHTML = generateCalendar(selectedYear, selectedMonth);
};
const previousMonth = () => {
  if (selectedMonth === 1) {
    selectedMonth = 12;
    selectedYear--;
  } else {
    selectedMonth--;
  }
  calendar.innerHTML = generateCalendar(selectedYear, selectedMonth);
};
const showMontNameAndYear = (year, month) => {
  const monthNames = [
    "Januar",
    "Februar",
    "Marec",
    "April",
    "Maj",
    "Junij",
    "Julij",
    "Avgust",
    "September",
    "Oktober",
    "November",
    "December",
  ];
  return `${monthNames[month - 1]} ${year}`;
};

const generateCalendar = (year, month) => {
  let calendarHTML =
    `<table>
        <tr>
            <th onclick="previousMonth()" class="selectMonth">
                <
            </th>
            <th colspan="5">
                ${showMontNameAndYear(year, month)}
            </th>
            <th onclick="nextMonth()" class="selectMonth">
                >
            </th>
        </tr>` +
    "<tr><th>Ned</th><th>Pon</th><th>Tor</th><th>Sre</th><th>Čet</th><th>Pet</th><th>Sob</th></tr>";
  const firstDayInMonth = getFirstDay(year, month);

  for (let i = 1 - firstDayInMonth; i <= daysInMonth(year, month); i++) {
    const dayInWeek = getDay(year, month, i);
    const isWeekend = dayInWeek === 0 || dayInWeek === 6;
    const holiday = getHoliday(year, month, i);

    if (i < 1) {
      calendarHTML += `<td></td>`;
      continue;
    }
    if (dayInWeek % 7 === 0) {
      calendarHTML += "</tr><tr>";
    }
    calendarHTML += `
        <td 
            title="${!!holiday ? holiday.name : ""}" 
            class="day ${isWeekend ? "weekend" : ""} ${
              !!holiday ? "holiday" : ""
            }">
                ${i}
        </td>`;
  }
  calendarHTML += "</tr></table>";
  return calendarHTML;
};

calendar.innerHTML = generateCalendar(selectedYear, selectedMonth);
