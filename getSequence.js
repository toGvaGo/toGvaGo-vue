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
console.log(getSequence(nums));
