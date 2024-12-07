class WeekSchedule {
  #holidaySchedule;
  #weekdaySchedule;

  // 휴일은 1부터 시작중
  // 평일은 준팍만 반복
  constructor({ weekdaySchedule, holidaySchedule }) {
    this.#weekdaySchedule = weekdaySchedule;
    this.#holidaySchedule = holidaySchedule;
    this.schedule = [];
  }

  assignWorkers(days) {
    let previousWorker = null;
    const originHolidaySchedule = [...this.#holidaySchedule];
    const originWeekdaySchedule = [...this.#weekdaySchedule];
    let holidayIndex = 0; // holiday 배열 index 저장
    let weekdayIndex = 0; // weekDay 배열 index 저장

    days.forEach((day) => {
      let assignedWorker = null;

      if (holidayIndex === 0) {
        this.#holidaySchedule = originHolidaySchedule;
      }

      if (weekdayIndex === 0) {
        this.#weekdaySchedule = originWeekdaySchedule;
      }

      // 휴일일 때
      if (day.dayOff) {
        [previousWorker, assignedWorker, holidayIndex] =
          this.#assignHolidayWorker(
            previousWorker,
            assignedWorker,
            holidayIndex
          );

        if (assignedWorker === previousWorker) {
          assignedWorker = this.#resolveHoliday(holidayIndex);
        }

        holidayIndex += 1;
        previousWorker = assignedWorker;
      }

      // 평일일 때
      if (!day.dayOff) {
        [previousWorker, assignedWorker, weekdayIndex] =
          this.#assignWeekdayWorker(
            previousWorker,
            assignedWorker,
            weekdayIndex
          );

        if (assignedWorker === previousWorker) {
          assignedWorker = this.#resolveWeekday(weekdayIndex);
        }

        weekdayIndex += 1;
        previousWorker = assignedWorker;
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

      this.schedule.push(scheduleEntry);
    });
    return this.schedule;
  }

  #assignHolidayWorker(previousWorker, assignedWorker, holidayIndex) {
    if (holidayIndex === 0) {
      assignedWorker = this.#holidaySchedule[0];
    }

    if (holidayIndex) {
      assignedWorker =
        this.#holidaySchedule[holidayIndex % this.#holidaySchedule.length];
    }

    return [previousWorker, assignedWorker, holidayIndex];
  }

  #assignWeekdayWorker(previousWorker, assignedWorker, weekdayIndex) {
    if (weekdayIndex === 0) {
      assignedWorker = this.#weekdaySchedule[0];
    }

    if (weekdayIndex) {
      assignedWorker =
        this.#weekdaySchedule[weekdayIndex % this.#weekdaySchedule.length];
    }

    return [previousWorker, assignedWorker, weekdayIndex];
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
