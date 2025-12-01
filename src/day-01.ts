import { readFile } from "./utils";

interface Command {
  direction: "L" | "R";
  distance: number;
}

function parseCommand(command: string): Command {
  // Example command: L68
  const direction = command[0] as "L" | "R";
  const distance = parseInt(command.slice(1));
  return { direction, distance };
}

interface NextPositionResult {
  position: number;
  zeroCount: number;
}

function getNextPosition(
  currentPosition: number,
  command: Command
): NextPositionResult {
  const { direction, distance } = command;
  let tempPosition = currentPosition;
  let zeroCount = 0;
  for (let i = 0; i < distance; i++) {
    if (direction === "L") {
      tempPosition--;
    } else {
      tempPosition++;
    }
    if (tempPosition < 0) {
      tempPosition = tempPosition + 100;
    } else if (tempPosition >= 100) {
      tempPosition = 0;
    }
    if (tempPosition === 0) {
      zeroCount++;
    }
  }

  return { position: tempPosition, zeroCount };
}

const getCommandsFromInput = async () => {
  const rawInput = await readFile("./src/data/day-01.txt");
  const lines = rawInput.split("\n");
  const commands = lines.map(parseCommand);

  return commands;
};

export const part1 = async () => {
  console.log("Day 1 - Part 1");
  const commands = await getCommandsFromInput();
  let currentPosition = 50;
  let zeroCount = 0;
  for (const command of commands) {
    currentPosition = getNextPosition(currentPosition, command).position;
    if (currentPosition === 0) {
      zeroCount++;
    }
  }
  console.log({ finalPosition: currentPosition, zeroCount });
};

export const part2 = async () => {
  console.log("Day 1 - Part 2");
  const commands = await getCommandsFromInput();
  let currentPosition = 50;
  let zeroCount = 0;
  for (const command of commands) {
    const prevPosition = currentPosition;
    const result = getNextPosition(currentPosition, command);
    currentPosition = result.position;
    zeroCount += result.zeroCount;
  }
  console.log({ finalPosition: currentPosition, zeroCount });
};
