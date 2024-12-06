import Calendar from '../../src/domain/Calendar';

describe('Calendar 클래스', () => {
  test('generateMonthDays는 5월이며 월요일 시작이다.', () => {
    // given
    const calendar = new Calendar([5, '월']);

    // when
    const days = calendar.generateMonthDays();

    // then
    expect(days).toHaveLength(31);
    expect(days[0].weekday).toBe('월');
    expect(days[days.length - 1].date.getDate()).toBe(31);
  });

  test('generateMonthDays는 2월이며 수요일 시작이다.', () => {
    // given
    const calendar = new Calendar([2, '수']);

    // when
    const days = calendar.generateMonthDays();

    // then
    expect(days).toHaveLength(28);
    expect(days[0].weekday).toBe('수');
    expect(days[days.length - 1].date.getDate()).toBe(28);
  });
});
