import { Console } from '@woowacourse/mission-utils';

class ConsoleOutput {
  write(message) {
    Console.print(message);
  }

  writeError(error) {
    Console.print(`${error}`);
  }
}

export default new ConsoleOutput();
