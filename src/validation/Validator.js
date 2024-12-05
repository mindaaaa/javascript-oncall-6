class Validator {
  #inputArray;

  constructor(inputArray) {
    this.#inputArray = inputArray;
  }

  // 시작 요일만
  // 시작 월만
  validateDutyRoster() {
    if (!this.#isValidateNicknameLength) {
      throw new Error('[ERROR] 닉네임은 최대 5자입니다.');
    }

    if (!this.#isValidateMinimumWorkers) {
      throw new Error(
        '[ERROR] 원활한 근무 제도를 위해 최소 5명 이상 근무자를 유지해주세요.'
      );
    }

    if (!this.#isValidateMaximumWorkers) {
      throw new Error(
        '[ERROR] 비효율적인 운영을 막기 위해 최대 35명이 넘지 않도록 해주세요.'
      );
    }
  }

  // parse는 App.js에서 한다.
  // 문자열 배열 형식으로 들어온다.
  // 닉네임 5자
  #isValidateNicknameLength() {
    return this.#inputArray.every((nickName) => nickName.length <= 5);
  }

  // 최소 5명의 근무자
  #isValidateMinimumWorkers() {
    return this.#inputArray.length >= 5;
  }

  // 최대 35명이 넘지않도록

  #isValidateMaximumWorkers() {
    return this.#inputArray.length <= 35;
  }

  // 연속 입력하지 않도록
}
