// [1,1] [월,일]형식 배열
class Day {
  #month;
  #day;
  #holiday;
  constructor(dayArray) {
    this.#month = dayArray[0];
    this.#day = dayArray[1];
    this.#holiday = this.#isHoliday();
  }
  #holidays = [
    { month: 1, day: 1, name: 신정 },
    { month: 3, day: 1, name: 삼일절 },
    { month: 5, day: 5, name: 어린이날 },
    { month: 6, day: 6, name: 현충일 },
    { month: 8, day: 15, name: 광복절 },
    { month: 10, day: 3, name: 개천절 },
    { month: 10, day: 9, name: 한글날 },
    { month: 12, day: 25, name: 성탄절 },
  ];

  #isHoliday() {
    return this.#holidays.some((holiday) => {
      return holiday.month === this.#month && holiday.day === this.#day;
    });
  }
}
