import ConsoleInput from './infrastructure/ConsoleInput.js';
import ConsoleOutput from './infrastructure/ConsoleOutput.js';
import Calendar from './domain/Calendar.js';
import WeekSchedule from './domain/WeekSchedule.js';
import Validator from './validation/Validator.js';

class App {
  async run() {
    const monthAndDay = await this.getValidatedMonthAndDay();
    const calendar = new Calendar(monthAndDay).generateMonthDays(); // 객체배열: new Day({ date, weekday }
    const shiftOrder = await this.getValidatedShiftOrder();
    const weekSchedule = new WeekSchedule(shiftOrder);

    const scheduleEntries = weekSchedule.assignWorkers(calendar); // 배열 객체
    scheduleEntries.forEach((entry) => {
      this.printResult(entry);
    });
  }

  // [Number(month), startDay];
  async getValidatedMonthAndDay() {
    while (true) {
      try {
        const monthAndDay = await this.#getMonthAndDay();
        const validator = new Validator(monthAndDay);
        validator.validateMonthAndDay();

        return monthAndDay;
      } catch (error) {
        ConsoleOutput.writeError(error.message);
      }
    }
  }

  async #getMonthAndDay() {
    const monthAndStartDay = await ConsoleInput.read(
      '비상 근무를 배정할 월과 시작 요일을 입력하세요\n'
    );
    const [month, startDay] = monthAndStartDay
      .split(',')
      .map((item) => item.trim());
    return [Number(month), startDay];
  }

  async getValidatedShiftOrder() {
    while (true) {
      try {
        const shiftOrder = await this.#getShiftOrder();

        Object.values(shiftOrder).forEach((shift) => {
          const validator = new Validator(shift);
          validator.validateDutyRoster();
        });

        return shiftOrder;
      } catch (error) {
        ConsoleOutput.writeError(error.message);
      }
    }
  }

  async #getShiftOrder() {
    const weekdayShift = await this.#getWeekdayShiftOrder();
    const holidayShift = await this.#getHolidayShiftOrder();

    return { weekdayShift, holidayShift };
  }

  // 평일 비상 근무 순번대로 사원 닉네임을 입력하세요> 준팍,도밥,고니,수아,루루,글로
  async #getWeekdayShiftOrder() {
    const weekdayShift = await ConsoleInput.read(
      '평일 비상 근무 순번대로 사원 닉네임을 입력하세요\n'
    );
    return weekdayShift.split(',').map((worker) => worker.trim());
  }

  // 휴일 비상 근무 순번대로 사원 닉네임을 입력하세요> 수아,수아,글로,고니,도밥,준팍
  async #getHolidayShiftOrder() {
    const holidayShift = await ConsoleInput.read(
      '휴일 비상 근무 순번대로 사원 닉네임을 입력하세요\n'
    );
    return holidayShift.split(',').map((worker) => worker.trim());
  }

  printResult(scheduleEntry) {
    ConsoleOutput.write(
      `${scheduleEntry.month}월 ${scheduleEntry.day}일 ${
        scheduleEntry.weekday
      }${scheduleEntry.note || ''} ${scheduleEntry.worker}`
    );
  }
}

export default App;
