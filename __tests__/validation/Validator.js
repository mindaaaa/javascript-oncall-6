import Validator from '../../src/validation/Validator.js';

describe('Validator 클래스 테스트', () => {
  let validator;
  describe('validateMonthAndDay 메서드 테스트', () => {
    test('validateMonthAndDay는 시작 월이 1부터 12 사이가 아니라면 에러를 던진다.', () => {
      // given
      const inputArray = [13, '월'];
      validator = new Validator(inputArray);

      // when...then
      expect(() => {
        validator.validateMonthAndDay();
      }).toThrow('[ERROR]');
    });

    test('validateMonthAndDay는 요일이 월~일이 아니라면 에러를 던진다.', () => {
      // given
      const inputArray = [12, '왈'];
      validator = new Validator(inputArray);

      // when...then
      expect(() => {
        validator.validateMonthAndDay();
      }).toThrow('[ERROR]');
    });
  });

  describe('validateDutyRoster 메서드 테스트', () => {
    test('validateDutyRoster는 닉네임이 5자를 초과하면 에러를 던진다.', () => {
      // given
      const inputArray = ['개미는뚠뚠하고', '민다니는'];
      validator = new Validator(inputArray);

      // when...then
      expect(() => {
        validator.validateDutyRoster();
      }).toThrow('[ERROR]');
    });

    test('validateDutyRoster는 근무 인원이 5명 미만이라면 에러를 던진다.', () => {
      // given
      const inputArray = ['민다'];
      validator = new Validator(inputArray);

      // when...then
      expect(() => {
        validator.validateDutyRoster();
      }).toThrow('[ERROR]');
    });

    test('validateDutyRoster는 근무 인원이 35명을 초과하면 에러를 던진다.', () => {
      // given
      const inputArray = [
        '가',
        '나',
        '다',
        '라',
        '마',
        '바',
        '사',
        '아',
        '자',
        '차',
        '카',
        '타',
        '파',
        '하',
        '거',
        '너',
        '더',
        '러',
        '머',
        '버',
        '서',
        '어',
        '저',
        '처',
        '커',
        '터',
        '퍼',
        '허',
        '고',
        '노',
        '도',
        '로',
        '모',
        '보',
        '수',
        '우',
        '누',
        '구',
      ];
      validator = new Validator(inputArray);

      // when...then
      expect(() => {
        validator.validateDutyRoster();
      }).toThrow('[ERROR]');
    });
  });
});
