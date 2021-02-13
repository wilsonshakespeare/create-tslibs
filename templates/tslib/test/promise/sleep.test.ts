import utilzed from '../../src';

const { sleep } = utilzed;

describe('sleep functionality', () => {
  it('should able to proceed after sleep time', async () => {
    // expect to proceed on timeout
    const prev = new Date().getTime();
    await sleep(300);
    const now = new Date().getTime();
    const moreThan300 = now - prev >= 300;

    expect(moreThan300).toEqual(true);
  });
});
