/**
 * await sleep(100) will await for 100ms before proceed to next function
 * @param  {number} ms
 * @returns Promise
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default sleep;
