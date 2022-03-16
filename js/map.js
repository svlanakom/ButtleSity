const map = [
  [2, 0, 0, 3, 0, 0, 2, 0, 0, 3, 0, 0, 2],
  [0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0, 3, 3, 3, 0, 0],
  [0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 3, 3, 3, 0, 3, 3, 3, 3, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 3, 0, 3, 0, 0, 0, 0, 0],
];

const mapLegend = {
  playerBase: 1,
  enemyBase: 2,
  wall: 3,
};

const cellSize = 64;
const bulletSize = 8;

const gameTimerInterval = 1000;

const directionSet = ["right", "left", "up", "down"];

export {
  map,
  mapLegend,
  cellSize,
  bulletSize,
  gameTimerInterval,
  directionSet,
};
