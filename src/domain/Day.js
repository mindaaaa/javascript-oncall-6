// Date 객체
// 월이 갖고 있는 모든 일은 Day 클래스다.
// 평일인지 휴일인지를 판단한다.
// 배열 형태로 바꿔준다.

// 0은 1월
// 0은 일 1은 월
class Day {
  #date;
  #weekday; // 요일 정보
  #dayOff; // 휴일인지
  #holidays = [
    { month: 1, day: 1, name: '신정' },
    { month: 3, day: 1, name: '삼일절' },
    { month: 5, day: 5, name: '어린이날' },
    { month: 6, day: 6, name: '현충일' },
    { month: 8, day: 15, name: '광복절' },
    { month: 10, day: 3, name: '개천절' },
    { month: 10, day: 9, name: '한글날' },
    { month: 12, day: 25, name: '성탄절' },
  ];

  constructor(date) {
    this.#date = date; // Date 객체
    this.#weekday = this.getWeekday(); // 요일 정보 ['일']
    this.#dayOff = this.#isDayOff(); // 휴일인지
  }

  getWeekday() {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    return weekdays[this.#date.getDay()];
  } // 요일 정보를 가져옴

  #isDayOff() {
    return this.isHoliday() || this.#isWeekend();
  }

  isHoliday() {
    return this.#holidays.some((holiday) => {
      return (
        holiday.month === this.getMonth() &&
        holiday.day === this.#date.getDate()
      );
    });
  }

  #isWeekend() {
    // 0이거나 6인지 확인
    return this.#date.getDay() === 0 || this.#date.getDay() === 6;
  }

  getMonth() {
    return this.#date.getMonth() + 1;
  }

  get dateArray() {
    return [this.getMonth(), this.#date.getDate()];
  }
}

export default Day;
