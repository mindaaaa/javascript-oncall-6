class WeekSchedule {
  #holidaySchedule; // 문자열 배열
  #weekdaySchedule; // 문자열 배열
  #schedule; // 최종 스케줄

  constructor({ weekdaySchedule, holidaySchedule }) {
    this.#weekdaySchedule = weekdaySchedule;
    this.#holidaySchedule = holidaySchedule;
    this.#schedule = schedule;
  }

  assignWorkers(days) {
    let previousWorker = null; // 전날 근무자
    const originHolidaySchedule = [...this.#holidaySchedule];
    const originWeekdaySchedule = [...this.#weekdaySchedule];

    days.forEach((day) => {
      let assignedWorker;
      let holidayIndex; // holiday 배열 index 저장
      let weekdayIndex; // weekDay 배열 index 저장

      if (holidayIndex === 0) {
        this.#holidaySchedule = originHolidaySchedule;
      }

      if (weekdayIndex === 0) {
        this.#weekdaySchedule = originWeekdaySchedule;
      }

      if (day.dayOff) {
        [assignedWorker, holidayIndex] =
          this.#assignHolidayWorker(holidayIndex); //[assignedWorker, holidayIndex]
      }

      if (!day.dayOff) {
        [assignedWorker, weekdayIndex] =
          this.#assignWeekdayWorker(weekdayIndex); // [assignedWorker, weekdayIndex]
      }

      if (assignedWorker === previousWorker) {
        if (day.dayOff) {
          assignedWorker = this.#resolveHoliday(holidayIndex);
        }

        if (!day.dayOff) {
          assignedWorker = this.#resolveWeekday(weekdayIndex);
        }
      }

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
      previousWorker = assignedWorker;
    });
    return this.#schedule;
  }

  #assignHolidayWorker(holidayIndex) {
    if (!previousWorker) {
      assignedWorker = this.#holidaySchedule[0];
    }
    assignedWorker = this.#holidaySchedule.indexOf(
      this.#holidaySchedule[(holidayIndex + 1) % holidayIndex.length]
    );

    holidayIndex = this.#holidaySchedule.indexOf(assignedWorker);

    return [assignedWorker, holidayIndex];
  }

  #assignWeekdayWorker(weekdayIndex) {
    if (!previousWorker) {
      assignedWorker = this.#weekdaySchedule[0];
    }
    assignedWorker = this.#weekdaySchedule.indexOf(
      this.#holidaySchedule[(weekdayIndex + 1) % weekdayIndex.length]
    );

    weekdayIndex = this.#weekdaySchedule.indexOf(assignedWorker);

    return [assignedWorker, weekdayIndex];
  }

  #resolveHoliday(holidayIndex) {
    this.#holidaySchedule[holidayIndex + 1] = this.#holidaySchedule.splice(
      holidayIndex,
      1,
      this.#holidaySchedule[holidayIndex + 1]
    )[0];

    return this.#holidaySchedule[holidayIndex];
  }

  #resolveWeekday(weekdayIndex) {
    this.#weekdaySchedule[weekdayIndex + 1] = this.#weekdaySchedule.splice(
      weekdayIndex,
      1,
      this.#weekdaySchedule[weekdayIndex + 1]
    )[0];

    return this.#weekdaySchedule[weekdayIndex];
  }
}

export default WeekSchedule;
