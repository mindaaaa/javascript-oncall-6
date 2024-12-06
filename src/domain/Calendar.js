import Day from './Day.js';

class Calendar {
  #month;
  #weekday;

  constructor([month, weekday]) {
    this.#month = month;
    this.#weekday = weekday;
  }
  generateMonthDays() {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const startWeekdayIndex = weekdays.indexOf(this.#weekday); // 숫자로

    const totalDays = new Date(2001, this.#month, 0).getDate(); // 총 며칠로 이루어져있는가
    const days = [];

    for (let day = 1; day <= totalDays; day++) {
      const mockedWeekday = weekdays[(startWeekdayIndex + (day - 1)) % 7];

      days.push({
        date: new Date(2001, this.#month - 1, day, 12, 0, 0),
        weekday: mockedWeekday,
      });
    }

    return days.map(({ date, weekday }) => new Day({ date, weekday }));
  }
}

export default Calendar;

const calendar = new Calendar([5, '월']); // 5월, 월요일 시작
const days = calendar.generateMonthDays();

console.log(days[0].dateArray);
