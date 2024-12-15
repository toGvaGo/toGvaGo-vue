//最长递增子序列
const getSequence = function (nums) {
  let lengthDP = new Array(nums.length).fill(1);
  let sequenceDP = new Array(nums.length);
  let maxLength = 1;
  let maxIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    sequenceDP[i] = [i];
    for (let j = i; j >= 0; j--) {
      if (nums[i] > nums[j]) {
        if (lengthDP[j] + 1 > lengthDP[i]) {
          lengthDP[i] = lengthDP[j] + 1;
          sequenceDP[i] = [...sequenceDP[j], i];
        }
      }
    }
    if (lengthDP[i] > maxLength) {
      maxLength = lengthDP[i];
      maxIndex = i;
    }
  }
  return sequenceDP[maxIndex];
};

const nums = [4, 2, 3, 1, 5, 0, 8, 10, 4, 11];
// console.log(getSequence(nums));

//有限状态机
function test(string) {
  let i;
  let startIndex;
  let endIndex;
  let result = [];

  function waitForA(char) {
    if (char === 'a') {
      startIndex = i;
      return waitForB;
    }
    return waitForA;
  }
  function waitForB(char) {
    if (char === 'b') {
      return waitForC;
    }
    return waitForB;
  }
  function waitForC(char) {
    if (char === 'c') {
      endIndex = i;
      return end;
    }
    return waitForC;
  }
  function end() {
    return end;
  }

  let currentState = waitForA;

  for (i = 0; i < string.length; i++) {
    let nextState = currentState(string[i]);
    currentState = nextState;

    if (currentState === end) {
      console.log(startIndex, endIndex);
      result.push({ startIndex, endIndex });

      currentState = waitForA;
      // return true;
    }
  }

  // return false;
}

console.log(test('oabcrieuabcore'));
