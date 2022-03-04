import createBot from '../src/index';
import fs from 'fs';
// @ts-ignore
import key from './robot-key';

const bot = createBot(key);

describe('test upload media', function () {
  afterEach(
    () =>
      new Promise((resolve) => {
        setTimeout(resolve, 1000);
      })
  );

  test('text file', function () {
    expect(bot.upload(`${__dirname}/abc.txt`)).resolves.toHaveProperty('media_id');
  });

  test('image buffer', function () {
    const buffer = fs.readFileSync(`${__dirname}/star.png`);
    expect(
      bot.upload(buffer, {
        filename: 'star.png',
      })
    ).resolves.toHaveProperty('media_id');
  });

  test('opened stream', function () {
    expect(bot.upload(fs.createReadStream(`${__dirname}/abc.txt`))).resolves.toHaveProperty('media_id');
  });

  test('file not exists', function () {
    expect(bot.upload('someFileNotExists.svg')).rejects.toThrow('not found');
  });
});
