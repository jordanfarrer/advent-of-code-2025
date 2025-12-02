import { readFile } from "./utils";

interface Range {
  start: number;
  end: number;
}

const getRangesFromInput = async () => {
  const rawInput = await readFile("./src/data/day-02.txt");
  const entries = rawInput.split(",");
  const ranges = entries.map(parseRanges);

  return ranges;
};

function parseRanges(entry: string): Range {
  const [start, end] = entry.split("-");
  return {
    start: parseInt(start),
    end: parseInt(end),
  };
}

function getInvalidIds(range: Range): number[] {
  const invalidIds: number[] = [];
  for (let i = range.start; i <= range.end; i++) {
    if (i.toString().length % 2 !== 0) {
      continue;
    }
    const firstHalf = i.toString().slice(0, i.toString().length / 2);
    const secondHalf = i.toString().slice(i.toString().length / 2);
    if (firstHalf === secondHalf) {
      invalidIds.push(i);
    }
  }

  return invalidIds;
}

interface SplitResult {
  patternLength: number;
  items: string[];
}

function splitNumberIntoSets(number: number): SplitResult[] {
  const result: SplitResult[] = [];
  const numberLength = number.toString().length;

  for (
    let patternLength = numberLength - 1;
    patternLength >= 0;
    patternLength--
  ) {
    if (numberLength % patternLength !== 0) {
      continue;
    }
    const items: string[] = [];
    for (let i = 0; i < numberLength; i += patternLength) {
      items.push(number.toString().slice(i, i + patternLength));
    }
    result.push({ patternLength, items });
  }
  return result;
}

function getInvalidIds2(range: Range): number[] {
  const invalidIds: number[] = [];
  for (let i = range.start; i <= range.end; i++) {
    const splits = splitNumberIntoSets(i);
    for (const split of splits) {
      if (split.items.every((item) => item === split.items[0])) {
        invalidIds.push(i);
        break;
      }
    }
  }
  return invalidIds;
}

export const part1 = async () => {
  const ranges = await getRangesFromInput();
  const invalidIds = ranges.flatMap(getInvalidIds);
  console.log(invalidIds);
  const sum = invalidIds.reduce((acc, curr) => acc + curr, 0);
  console.log(`Sum: ${sum}`);
};

export const part2 = async () => {
  const ranges = await getRangesFromInput();
  const invalidIds = ranges.flatMap(getInvalidIds2);
  console.log(invalidIds);
  const sum = invalidIds.reduce((acc, curr) => acc + curr, 0);
  console.log(`Sum: ${sum}`);
};
