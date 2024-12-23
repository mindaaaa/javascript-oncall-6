class Validator {
  #inputArray;

  constructor(inputArray) {
    this.#inputArray = inputArray;
  }

  // [5, '월']
  validateMonthAndDay() {
    if (!this.#isValidateMonthRange()) {
      throw new Error('[ERROR] 월은 1에서 12 사이의 값을 입력해야 합니다.');
    }

    if (!this.#isValidateWeekdayInput()) {
      throw new Error('[ERROR] 요일은 월~일 중 하나여야 합니다.');
    }
  }

  // ['구구','루리','민다']
  validateDutyRoster() {
    if (!this.#isValidateNicknameLength()) {
      throw new Error('[ERROR] 닉네임은 최대 5자입니다.');
    }

    if (!this.#isValidateMinimumWorkers()) {
      throw new Error(
        '[ERROR] 원활한 근무 제도를 위해 최소 5명 이상 근무자를 유지해주세요.'
      );
    }

    if (!this.#isValidateMaximumWorkers()) {
      throw new Error(
        '[ERROR] 비효율적인 운영을 막기 위해 최대 35명이 넘지 않도록 해주세요.'
      );
    }

    if (!this.#isValidateUniqueValues()) {
      throw new Error(
        '[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.'
      );
    }
  }

  #isValidateMonthRange() {
    return this.#inputArray[0] >= 1 && this.#inputArray[0] <= 12;
  }

  #isValidateWeekdayInput() {
    const weekDays = ['월', '화', '수', '목', '금', '토', '일'];
    return weekDays.includes(this.#inputArray[1]);
  }

  #isValidateNicknameLength() {
    return this.#inputArray.every((nickName) => nickName.length <= 5);
  }

  #isValidateMinimumWorkers() {
    return this.#inputArray.length >= 5;
  }

  #isValidateMaximumWorkers() {
    return this.#inputArray.length <= 35;
  }

  // note: Set은 size를 가진다.
  #isValidateUniqueValues() {
    const uniqueValues = new Set(this.#inputArray);
    return uniqueValues.size === this.#inputArray.length;
  }
}

export default Validator;
