import { readFile } from "./utils";

type BatteryBank = number[];

const getBatteryBanks = async (): Promise<BatteryBank[]> => {
  const rawInput = await readFile("./src/data/day-03.txt");
  const lines = rawInput.split("\n");
  return lines.map((line) =>
    line.split("").map((battery) => parseInt(battery))
  );
};

const getMaxJoltageForBank = (bank: BatteryBank): number => {
  let max = 0;
  for (let left = 0; left < bank.length - 1; left++) {
    for (let right = left + 1; right < bank.length; right++) {
      const current = bank[left] * 10 + bank[right];
      if (current > max) {
        max = current;
      }
    }
  }

  return max;
};

const getMaxJoltageForBank2 = (
  bank: BatteryBank,
  batteryLimit: number
): bigint => {
  let left = 0;
  const indexes: number[] = [];
  while (indexes.length < batteryLimit) {
    const remainingNeeded = batteryLimit - indexes.length;
    const rightLimit = bank.length - remainingNeeded + 1;
    if (bank.slice(left, rightLimit).length === 0) {
      throw new Error("Invalid index");
    }
    const largestNumberInSelection = Math.max(...bank.slice(left, rightLimit));
    const indexOfLargestNumberInSelection = bank.indexOf(
      largestNumberInSelection,
      left
    );
    if (indexOfLargestNumberInSelection > bank.length - 1) {
      throw new Error("Invalid index");
    }
    indexes.push(indexOfLargestNumberInSelection);
    left = indexOfLargestNumberInSelection + 1;
  }
  return BigInt(indexes.reduce((acc, curr) => `${acc}${bank[curr]}`, ""));
};

export const part1 = async () => {
  const batteryBanks = await getBatteryBanks();
  const maxJoltages = batteryBanks.map(getMaxJoltageForBank);
  console.log(maxJoltages);
  const sum = maxJoltages.reduce((acc, curr) => acc + curr, 0);
  console.log(`Sum: ${sum}`);
};

export const part2 = async () => {
  const batteryBanks = await getBatteryBanks();
  const maxJoltages = batteryBanks.map((bank) =>
    getMaxJoltageForBank2(bank, 12)
  );
  console.log(maxJoltages);
  const sum = maxJoltages.reduce((acc, curr) => acc + BigInt(curr), BigInt(0));
  console.log(`Sum: ${sum}`);
};
