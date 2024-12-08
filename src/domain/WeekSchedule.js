class WeekSchedule {
  #holidaySchedule;
  #weekdaySchedule;
  #originalHolidaySchedule;
  #originalWeekdaySchedule;

  constructor({ weekdaySchedule, holidaySchedule }) {
    this.#weekdaySchedule = weekdaySchedule;
    this.#holidaySchedule = holidaySchedule;
    this.#originalWeekdaySchedule = this.#weekdaySchedule;
    this.#originalHolidaySchedule = this.#holidaySchedule;
    this.schedule = [];
  }

  assignWorkers(days) {
    let previousWorker = null;
    let holidayIndex = 0;
    let weekdayIndex = 0;

    days.forEach((day) => {
      [previousWorker, holidayIndex, weekdayIndex] = this.#processDay(
        day,
        previousWorker,
        holidayIndex,
        weekdayIndex
      );
    });

    return this.schedule;
  }

  #processDay(day, previousWorker, holidayIndex, weekdayIndex) {
    let assignedWorker = null;

    this.#resetSchedule(holidayIndex, weekdayIndex);

    if (day.dayOff) {
      [previousWorker, assignedWorker, holidayIndex] =
        this.#scheduleHolidayWorker(
          previousWorker,
          assignedWorker,
          holidayIndex
        );
    }

    if (!day.dayOff) {
      [previousWorker, assignedWorker, weekdayIndex] =
        this.#scheduleWeekdayWorker(
          previousWorker,
          assignedWorker,
          weekdayIndex
        );
    }

    const scheduleEntry = this.#createScheduleEntry(day, assignedWorker);
    this.schedule.push(scheduleEntry);

    return [previousWorker, holidayIndex, weekdayIndex];
  }

  #resetSchedule(holidayIndex, weekdayIndex) {
    if (holidayIndex === 0) {
      this.#holidaySchedule = this.#originalHolidaySchedule;
    }

    if (weekdayIndex === 0) {
      this.#weekdaySchedule = this.#originalWeekdaySchedule;
    }
  }

  #scheduleHolidayWorker(previousWorker, assignedWorker, holidayIndex) {
    [previousWorker, assignedWorker, holidayIndex] = this.#assignHolidayWorker(
      previousWorker,
      assignedWorker,
      holidayIndex
    );

    if (assignedWorker === previousWorker) {
      assignedWorker = this.#resolveHoliday(holidayIndex);
    }

    holidayIndex += 1;
    previousWorker = assignedWorker;

    return [previousWorker, assignedWorker, holidayIndex];
  }

  #scheduleWeekdayWorker(previousWorker, assignedWorker, weekdayIndex) {
    [previousWorker, assignedWorker, weekdayIndex] = this.#assignWeekdayWorker(
      previousWorker,
      assignedWorker,
      weekdayIndex
    );

    if (assignedWorker === previousWorker) {
      assignedWorker = this.#resolveWeekday(weekdayIndex);
    }

    weekdayIndex += 1;
    previousWorker = assignedWorker;
    return [previousWorker, assignedWorker, weekdayIndex];
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

  #createScheduleEntry(day, assignedWorker) {
    const scheduleEntry = {
      month: day.dateArray[0],
      day: day.dateArray[1],
      weekday: day.weekday,
      worker: assignedWorker,
      note: null,
    };

    if (day.isHoliday()) {
      scheduleEntry.note = '(휴일)';
    }

    return scheduleEntry;
  }
}

export default WeekSchedule;
