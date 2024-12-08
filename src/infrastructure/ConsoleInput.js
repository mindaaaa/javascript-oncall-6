import { Console } from '@woowacourse/mission-utils';

class ConsoleInput {
  async read(consoleMessage) {
    return await Console.readLineAsync(consoleMessage);
  }
}

export default new ConsoleInput();
