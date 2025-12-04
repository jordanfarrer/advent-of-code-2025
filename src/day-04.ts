import { readFile } from "./utils";

interface Cell {
  x: number;
  y: number;
  isPaper: boolean;
}

interface Coordinate {
  x: number;
  y: number;
}

const getCells = async (): Promise<Cell[]> => {
  const rawInput = await readFile("./src/data/day-04.txt");
  const rows = rawInput.split("\n");
  return rows.flatMap((row, rowIndex) =>
    row.split("").map((value, columnIndex) => ({
      x: columnIndex,
      y: rowIndex,
      isPaper: value === "@",
    }))
  );
};

const getAdjacentCells = (cells: Cell[], x: number, y: number): Cell[] => {
  const adjacentCells: Cell[] = [];

  const topLeft = cells.find((cell) => cell.x === x - 1 && cell.y === y - 1);
  if (topLeft) {
    adjacentCells.push(topLeft);
  }

  const top = cells.find((cell) => cell.x === x && cell.y === y - 1);
  if (top) {
    adjacentCells.push(top);
  }

  const topRight = cells.find((cell) => cell.x === x + 1 && cell.y === y - 1);
  if (topRight) {
    adjacentCells.push(topRight);
  }

  const right = cells.find((cell) => cell.x === x + 1 && cell.y === y);
  if (right) {
    adjacentCells.push(right);
  }

  const bottomRight = cells.find(
    (cell) => cell.x === x + 1 && cell.y === y + 1
  );
  if (bottomRight) {
    adjacentCells.push(bottomRight);
  }

  const bottom = cells.find((cell) => cell.x === x && cell.y === y + 1);
  if (bottom) {
    adjacentCells.push(bottom);
  }

  const bottomLeft = cells.find((cell) => cell.x === x - 1 && cell.y === y + 1);
  if (bottomLeft) {
    adjacentCells.push(bottomLeft);
  }

  const left = cells.find((cell) => cell.x === x - 1 && cell.y === y);
  if (left) {
    adjacentCells.push(left);
  }

  return adjacentCells;
};

const getAccessibleCells = (cells: Cell[]): Cell[] => {
  return cells.filter(
    (cell) =>
      cell.isPaper &&
      getAdjacentCells(cells, cell.x, cell.y).filter(
        (adjacentCell) => adjacentCell.isPaper
      ).length < 4
  );
};

export const part1 = async () => {
  const cells = await getCells();
  const accessibleCells = getAccessibleCells(cells);
  console.log(accessibleCells.length);
};

export const part2 = async () => {
  const cells = await getCells();
  const cellsWithPaper = cells.filter((cell) => cell.isPaper);
  let accessibleCells = getAccessibleCells(cells);
  while (accessibleCells.length > 0) {
    accessibleCells.forEach((cell) => {
      const cellToRemoveIndex = cells.indexOf(cell);
      if (cellToRemoveIndex > 0) {
        cells[cellToRemoveIndex].isPaper = false;
      }
    });
    accessibleCells = getAccessibleCells(cells);
  }

  const cellsWithPaperAfter = cells.filter((cell) => cell.isPaper);

  const cellsRemoved = cellsWithPaper.length - cellsWithPaperAfter.length;

  console.log(`Total: Removed ${cellsRemoved} cells`);
};
