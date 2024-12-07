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
    // day를 이용해 근무를 배정한다.
    // dayOff로 휴일/평일을 나눔
    // 평일과 휴일 순번에 따라 근무자 배정
    // weekdaySchedule, holidaySchedule
    // 연속 근무자 방지
    let previousWorker = null; // 전날 근무자

    days.forEach((day) => {
      let assignedWorker;

      if (day.dayOff) {
        // 휴일 근무자 배정
      }
      // 평일 근무자 배정

      if (assignedWorker === previousWorker) {
        if (day.dayOff) {
          // 다음 휴일 근무자 배정
        }
        // 다음 평일 근무자 배정
      }
      previousWorker = assignedWorker;

      const scheduleEntry = {
        month: day.dateArray[0],
        day: day.dateArray[1],
        weekday: day.weekday,
        worker: assignedWorker,
      };

      if (day.isHoliday()) {
        scheduleEntry.note = '(휴일)';
      }

      this.#schedule.push(scheduleEntry);
    });
    return this.#schedule;
  }
}

export default WeekSchedule;
