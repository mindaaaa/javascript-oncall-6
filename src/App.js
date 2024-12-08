import ConsoleInput from './infrastructure/ConsoleInput';
import ConsoleOutput from './infrastructure/ConsoleOutput';
import Calendar from './domain/Calendar';
import WeekSchedule from './domain/WeekSchedule';
import Validator from './validation/Validator';

class App {
  async run() {
    try {
      const monthAndDay = await this.getValidatedMonthAndDay();
      const calendar = new Calendar(monthAndDay); // 객체배열: new Day({ date, weekday }
      const shiftOrder = this.getValidatedShiftOrder();
      const weekSchedule = new WeekSchedule(shiftOrder);

      const scheduleEntries = weekSchedule.assignWorkers(calendar); // 배열 객체
      scheduleEntries.forEach((entry) => {
        this.printResult(entry);
      });
    } catch (error) {
      ConsoleOutput.writeError();
    }
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

  // const shiftOrder = {
  //   weekdayShift: ['준팍', '도밥', '고니'],
  //   holidayShift: ['수아', '루루', '글로']
  // };
  async getValidatedShiftOrder() {
    while (true) {
      try {
        const shiftOrder = await this.#getShiftOrder();

        const validator = new Validator();
        Object.values(shiftOrder).forEach((shift) => {
          validator.validateDutyRoster(shift);
        });

        return shiftOrder;
      } catch (error) {
        ConsoleOutput.writeError(error.message);
      }
    }
  }

  printResult(scheduleEntry) {
    ConsoleOutput.write(
      `${scheduleEntry.month}월 ${scheduleEntry.day}일 ${scheduleEntry.weekday}${scheduleEntry.note} ${scheduleEntry.worker}`
    );
    ConsoleOutput.write('\n');
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

  async #getShiftOrder() {
    const weekdayShift = this.#getWeekdayShiftOrder();
    const holidayShift = this.#getHolidayShiftOrder();

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
}

export default App;
