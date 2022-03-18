import {
  cellSize,
  bulletSize,
  map,
  mapLegend,
  gameTimerInterval,
} from "./map.js";
// import { gameTimerInterval } from "./main.js";

export default class Bullet {
  constructor(x, y, direction, tank) {
    this.el = document.createElement("div");
    this.x = x;
    this.y = y;
    this.tank = tank;
    this.direction = direction;
    this.timerId = null;
    this.draw();
    this.style();
    this.update();
    this.addBulletToMap();
    this.move();
  }

  draw() {
    let dif = cellSize - bulletSize;
    switch (this.direction) {
      case "up":
        this.y -= bulletSize + 1;
        this.x += dif / 2;
        break;
      case "down":
        this.x += dif / 2;
        this.y += cellSize + 1;
        break;
      case "left":
        this.x -= bulletSize + 1;
        this.y += dif / 2;
        break;
      case "right":
        this.x += cellSize + 1;
        this.y += dif / 2;
        break;
    }
  }

  validate() {
    let result = { res: true, type: undefined };
    if (
      this.x <= 0 ||
      this.x + bulletSize >= map[0].length * cellSize ||
      this.y <= 0 ||
      this.y + bulletSize >= map.length * cellSize
    ) {
      result.res = false;
      result.type = "border";
    } else if (
      map[Math.floor(this.y / cellSize)][Math.floor(this.x / cellSize)] ===
        mapLegend.wall ||
      map[Math.floor((this.y + bulletSize) / cellSize)][
        Math.floor((this.x + bulletSize) / cellSize)
      ] === mapLegend.wall
    ) {
      result.res = false;
      result.type = "wall";
    } else if (
      map[Math.floor(this.y / cellSize)][Math.floor(this.x / cellSize)] ===
        mapLegend.enemyBase ||
      map[Math.floor((this.y + bulletSize) / cellSize)][
        Math.floor((this.x + bulletSize) / cellSize)
      ] === mapLegend.enemyBase
    ) {
      result.res = false;
      result.type = "enemy";
    } else if (
      map[Math.floor(this.y / cellSize)][Math.floor(this.x / cellSize)] ===
        mapLegend.playerBase ||
      map[Math.floor((this.y + bulletSize) / cellSize)][
        Math.floor((this.x + bulletSize) / cellSize)
      ] === mapLegend.playerBase
    ) {
      result.res = false;
      result.type = "enemy";
    }
    return result;
  }

  style() {
    this.el.classList.add("bullet");
  }

  addBulletToMap() {
    let gameMap = document.querySelector("#game-map");
    gameMap.appendChild(this.el);
  }

  update() {
    this.el.style["top"] = `${this.y}px`;
    this.el.style["left"] = `${this.x}px`;
  }
  move() {
    switch (this.direction) {
      case "up":
        this.timerId = setInterval(() => {
          if (!this.validate().res) {
          } else {
            this.up();
          }
        }, gameTimerInterval / cellSize / 2); // bulletSize();
        // setTimeout(() => {
        //   clearInterval(timerId);
        // }, gameTimerInterval);
        break;
      case "down":
        this.timerId = setInterval(() => {
          if (!this.validate().res) {
          } else {
            this.down();
          }
        }, gameTimerInterval / cellSize / 2);
        // setTimeout(() => {
        //   clearInterval(timerId);
        // }, gameTimerInterval);
        break;
      case "left":
        this.timerId = setInterval(() => {
          if (!this.validate().res) {
          } else {
            this.left();
          }
        }, gameTimerInterval / cellSize / 2);
        // setTimeout(() => {
        //   clearInterval(timerId);
        // }, gameTimerInterval);
        break;
      case "right":
        this.timerId = setInterval(() => {
          if (!this.validate().res) {
          } else {
            this.right();
          }
        }, gameTimerInterval / cellSize / 2);
        // setTimeout(() => {
        //   clearInterval(timerId);
        // }, gameTimerInterval);
        break;
    }
  }

  up() {
    this.y = this.y - 1; // bulletSize;
    this.update();
    // playerTank.validateBorder();
  }
  down() {
    this.y = this.y + 1;
    this.update();
    // playerTank.validateBorder();
  }
  left() {
    this.x = this.x - 1;
    this.update();
    // playerTank.validateBorder();
  }
  right() {
    this.x = this.x + 1;
    this.update();
    // playerTank.validateBorder();
  }
}
