import * as Day1 from "./day-01";
import * as Day2 from "./day-02";

async function main() {
  // Day 1
  // await Day1.part1();
  // await Day1.part2();

  // Day 2
  await Day2.part1();
  await Day2.part2();
}

try {
  main();
} catch (e) {
  console.error(e);
}
