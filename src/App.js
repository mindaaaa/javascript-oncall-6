import ConsoleInput from './infrastructure/ConsoleInput';
import ConsoleOutput from './infrastructure/ConsoleOutput';
import Calendar from './domain/Calendar';
import WeekSchedule from './domain/WeekSchedule';
import Validator from './validation/Validator';

class App {
  async run() {
    try {
      const monthAndDay = await this.getMonthAndDay();
      const [weekdaySchedule, holidaySchedule] = this.getShiftOrder();
    } catch (error) {}
  }

  //   비상 근무를 배정할 월과 시작 요일을 입력하세요> 1,금
  async getMonthAndDay() {
    const monthAndStartDay = await ConsoleInput.read(
      '비상 근무를 배정할 월과 시작 요일을 입력하세요\n'
    );
    const [month, startDay] = monthAndStartDay
      .split(',')
      .map((item) => item.trim());
    return [Number(month), startDay];
  }

  // TODO: 평일 순번 또는 휴일 순번의 입력 값이 올바르지 않은 경우, '평일 순번'부터 다시 입력 받는다.
  async getShiftOrder() {}

  // 평일 비상 근무 순번대로 사원 닉네임을 입력하세요> 준팍,도밥,고니,수아,루루,글로
  async getWeekdayShiftOrder() {
    const weekdayShift = await ConsoleInput.read(
      '평일 비상 근무 순번대로 사원 닉네임을 입력하세요\n'
    );
    return weekdayShift.split(',').map((worker) => worker.trim());
  }

  // 휴일 비상 근무 순번대로 사원 닉네임을 입력하세요> 수아,수아,글로,고니,도밥,준팍
  async getHolidayShiftOrder() {
    const holidayShift = await ConsoleInput.read(
      '휴일 비상 근무 순번대로 사원 닉네임을 입력하세요\n'
    );
    return holidayShift.split(',').map((worker) => worker.trim());
  }
}

export default App;
