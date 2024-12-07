class WeekSchedule {
  #weekdaySchedule; // 문자열 배열
  #holidaySchedule; // 문자열 배열
  #schedule; // 최종 스케줄

  constructor({ weekdaySchedule, holidaySchedule }) {
    this.#weekdaySchedule = weekdaySchedule;
    this.#holidaySchedule = holidaySchedule;
    this.#schedule = schedule;
  }

  assignWorkers(days) {
    let previousWorker = null; // 전날 근무자

    days.forEach((day) => {
      let assignedWorker;
      let holidayIndex; // holiday 배열 index 저장
      let weekdayIndex; // weekDay 배열 index 저장

      if (day.dayOff) {
        this.#assignHolidayWorker(); // 여기서 holidayIndex 넘겨줘야하나?
      }

      this.#assignWeekdayWorker();

      if (assignedWorker === previousWorker) {
        if (day.dayOff) {
          this.#resolveHoliday();
        }

        this.#resolveWeekday();
      }
      const scheduleEntry = {
        month: day.dateArray[0],
        day: day.dateArray[1],
        weekday: day.weekday,
        worker: assignedWorker,
      };

      previousWorker = assignedWorker;

      if (day.isHoliday()) {
        scheduleEntry.note = '(휴일)';
      }

      this.#schedule.push(scheduleEntry);
    });
    return this.#schedule;
  }

  #assignHolidayWorker() {
    if (!previousWorker) {
      assignedWorker = this.#holidaySchedule[0];
    }
    assignedWorker = this.#holidaySchedule.indexOf(
      this.#holidaySchedule[holidayIndex + 1]
    );
  }

  #assignWeekdayWorker(day) {
    if (!previousWorker) {
      assignedWorker = this.#weekdaySchedule[0];
    }
    assignedWorker = this.#weekdaySchedule.indexOf(
      this.#holidaySchedule[weekdayIndex + 1]
    );
  }

  #resolveHoliday() {
    // TODO: 휴일 중복 방지
    this.#holidaySchedule.splice(
      holidayIndex,
      1,
      this.#holidaySchedule[(holidayIndex + 1) % this.#holidaySchedule.length] // 수아 루루 글로 -> 루루 수아 글로
    );
    assignedWorker = this.#holidaySchedule[currentIndex];
  }

  #resolveWeekday() {
    // 다음 평일 근무자 배정
    const currentIndex = this.#weekdaySchedule.indexOf(assignedWorker);
    this.#weekdaySchedule.splice(
      currentIndex,
      1,
      this.#weekdaySchedule[(currentIndex + 1) % this.#weekdaySchedule.length]
    );
    assignedWorker = this.#weekdaySchedule[currentIndex];
  }
}

export default WeekSchedule;
