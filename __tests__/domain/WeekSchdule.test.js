import WeekSchedule from '../../src/domain/WeekSchedule.js';
import Day from '../../src/domain/Day.js';

describe('WeekSchedule 클래스', () => {
  const weekdaySchedule = ['준팍', '도밥', '고니'];
  const holidaySchedule = ['수아', '루루', '글로'];

  let weekSchedule;
  let days;

  beforeEach(() => {
    weekSchedule = new WeekSchedule({ weekdaySchedule, holidaySchedule });

    days = [
      new Day({ date: new Date(2024, 4, 1), weekday: '수', dayOff: false }), // 평일
      new Day({ date: new Date(2024, 4, 2), weekday: '목', dayOff: false }), // 평일
      new Day({ date: new Date(2024, 4, 3), weekday: '금', dayOff: false }), // 평일
      new Day({ date: new Date(2024, 4, 4), weekday: '토', dayOff: true }), // 휴일
      new Day({ date: new Date(2024, 4, 5), weekday: '일', dayOff: true }), // 휴일
      new Day({ date: new Date(2024, 4, 6), weekday: '월', dayOff: false }), // 평일
      new Day({ date: new Date(2024, 4, 7), weekday: '화', dayOff: false }), // 평일
    ];
  });

  test('assignWorkers는 평일 근무자를 올바르게 배정한다.', () => {
    // given
    const schedule = weekSchedule.assignWorkers(days);

    // when...then
    expect(schedule[0].worker).toBe('준팍');
    expect(schedule[1].worker).toBe('도밥');
    expect(schedule[2].worker).toBe('고니');

    expect(schedule[5].worker).toBe('준팍');
    expect(schedule[6].worker).toBe('도밥');
  });

  test('assignWorkers는 휴일 근무자를 올바르게 배정한다.', () => {
    // given
    const schedule = weekSchedule.assignWorkers(days);

    // when...then
    expect(schedule[3].worker).toBe('수아');
    expect(schedule[4].worker).toBe('루루');
  });

  test('assignWorkers는 연속 근무를 방지한다.', () => {
    // given
    const schedule = weekSchedule.assignWorkers(days);

    // when...then
    for (let i = 1; i < schedule.length; i++) {
      expect(schedule[i].worker).not.toBe(schedule[i - 1].worker);
    }
  });
});
