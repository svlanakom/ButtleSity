import {
  map,
  mapLegend,
  cellSize,
  gameTimerInterval,
  bulletSize,
} from "./map.js";
import PlayerTank from "./PlayerTank.js";
import EnemyTank from "./EnemyTank.js";

export default class Game {
  constructor(gameMap) {
    this.gameMap = gameMap;
    this.playerTank;
    this.enemyTanks = [];
    this.isGameOver = false;
    this.isPlayerTankMove = false;
    this.playerLifeCount = 3;
    this.enemyTanksCount = 21;
    this.enemyTanksBases = [];
    this.playerTankBase = null;

    this.gameInitialization();
  }

  start() {
    setTimeout(() => {
      this.gameLoop();
    }, gameTimerInterval);
  }

  gameInitialization() {
    // let gameMap = document.querySelector("#game-map");
    // this.enemyTanks.splice(0, this.enemyTanks.length);

    let baseId = 0;

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === mapLegend.wall) {
          this.gameMap.innerHTML += `<div class="game-object game-object__wall wall${i}${j}"
                        style='position: absolute; top: ${
                          i * cellSize
                        }px; left: ${j * cellSize}px;'></div>`;
        } else if (map[i][j] === mapLegend.playerBase) {
          this.playerTank = new PlayerTank(j * cellSize, i * cellSize);
          this.playerTankBase = [j, i];
        } else if (map[i][j] === mapLegend.enemyBase) {
          this.enemyTanks.push(
            new EnemyTank(j * cellSize, i * cellSize, baseId)
          );
          this.enemyTanksBases.push([j, i]);
          baseId++;
        }
      }
    }
    this.gameMap.appendChild(this.playerTank.elem);
    this.playerTank.update();
    this.enemyTanks.forEach((tank) => {
      this.gameMap.appendChild(tank.elem);
    });
    this.enemyTanks.forEach((tank) => {
      tank.update();
    });

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === " ") {
          if (this.playerTank.isFiring === false && !this.playerTank.bullet) {
            this.playerTank.fire();
          }
        } else {
          this.playerTank.changeDirection(event);
          this.isPlayerTankMove = true;
        }
      },
      false
    );
  }

  validateBulets(tank) {
    for (let index = 0; index < tank.bullets.length; ) {
      if (!tank.bullets[index].validate().res) {
        if (tank.bullets[index].validate().type === "wall") {
          let [x, y] = [tank.bullets[index].x, tank.bullets[index].y];
          let wall = this.gameMap.getElementsByClassName(
            `wall${Math.floor(y / cellSize)}${Math.floor(x / cellSize)}`
          );
          if (wall.length === 0) {
            [x, y] = [
              tank.bullets[index].x + bulletSize,
              tank.bullets[index].y + bulletSize,
            ];
            wall = this.gameMap.getElementsByClassName(
              `wall${Math.floor(y / cellSize)}${Math.floor(x / cellSize)}`
            );
          }
          wall[0].remove();
          map[Math.floor(y / cellSize)][Math.floor(x / cellSize)] = 0;
        } else if (tank.bullets[index].validate().type === "enemy") {
          let [x1, y1] = [
            Math.floor(tank.bullets[index].x / cellSize),
            Math.floor(tank.bullets[index].y / cellSize),
          ];
          let [x2, y2] = [
            Math.floor((tank.bullets[index].x + bulletSize) / cellSize),
            Math.floor((tank.bullets[index].y + bulletSize) / cellSize),
          ];
          console.log("enemy collide");
          for (let i = 0; i < this.enemyTanks.length; ) {
            if (
              (this.enemyTanks[i].mapRow === x1 &&
                this.enemyTanks[i].mapColumn === y1) ||
              (this.enemyTanks[i].mapRow === x2 &&
                this.enemyTanks[i].mapColumn === y2)
            ) {
              console.log(this.enemyTanks[i]);
              let enemy = new EnemyTank(
                this.enemyTanksBases[this.enemyTanks[i].enemyBaseId][0] *
                  cellSize,
                this.enemyTanksBases[this.enemyTanks[i].enemyBaseId][1] *
                  cellSize,
                this.enemyTanks[i].enemyBaseId
              );
              this.enemyTanks.push(enemy);
              this.gameMap.appendChild(enemy.elem);
              map[this.enemyTanks[i].mapColumn][this.enemyTanks[i].mapRow] = 0;
              this.enemyTanks[i].elem.remove();
              this.enemyTanks[i] = null;
              this.enemyTanks.splice(i, 1);
            } else {
              i++;
            }
          }
        }
        clearInterval(tank.bullets[index].timerId);
        tank.bullets[index].el.remove();
        tank.bullets[index] = null;
        tank.bullets.splice(index, 1);
      } else {
        index++;
      }
    }
  }

  gameStep() {
    if (this.isPlayerTankMove) {
      this.playerTank.move();
      this.isPlayerTankMove = false;
    }
    if (this.playerTank.bullets) {
      this.validateBulets(this.playerTank);
      // for (let index = 0; index < this.playerTank.bullets.length;) {
      //     if (!this.playerTank.bullets[index].validate().res) {
      //         if (this.playerTank.bullets[index].validate().type === "wall") {
      //             let [x, y] = [this.playerTank.bullets[index].x, this.playerTank.bullets[index].y];
      //             let wall = this.gameMap.getElementsByClassName(`wall${Math.floor(y / cellSize)}${Math.floor(x / cellSize)}`);
      //             if (wall.length === 0) {
      //                 [x, y] = [this.playerTank.bullets[index].x + bulletSize, this.playerTank.bullets[index].y + bulletSize]
      //                 wall = this.gameMap.getElementsByClassName(`wall${Math.floor(y / cellSize)}${Math.floor(x / cellSize)}`);
      //             }
      //             wall[0].remove();
      //             map[Math.floor(y / cellSize)][Math.floor(x / cellSize)] = 0;
      //         }
      //         clearInterval(this.playerTank.bullets[index].timerId);
      //         this.playerTank.bullets[index].el.remove();
      //         this.playerTank.bullets[index] = null;
      //         this.playerTank.bullets.splice(index, 1);
      //     } else {
      //         // this.playerTank.bullets[index].move();
      //         index++;
      //     }
      // }
    }
    this.enemyTanks.forEach((tank) => {
      tank.move();
      // if (Math.random() < 0.1) {
      //     tank.fire();
      // }
    });
    this.enemyTanks.forEach((tank) => {
      // tank.move();
      // if (Math.random() < 0.1) {
      //     tank.fire();
      // }
      if (tank.bullets) {
        this.validateBulets(tank);
        // for (let index = 0; index < tank.bullets.length;) {
        //     if (!tank.bullets[index].validate().res) {
        //         if (tank.bullets[index].validate().type === "wall") {
        //             let [x, y] = [tank.bullets[index].x, tank.bullets[index].y];
        //             let wall = this.gameMap.getElementsByClassName(`wall${Math.floor(y / cellSize)}${Math.floor(x / cellSize)}`);
        //             if (wall.length === 0) {
        //                 [x, y] = [tank.bullets[index].x + bulletSize, tank.bullets[index].y + bulletSize]
        //                 wall = this.gameMap.getElementsByClassName(`wall${Math.floor(y / cellSize)}${Math.floor(x / cellSize)}`);
        //             }
        //             wall[0].remove();
        //             map[Math.floor(y / cellSize)][Math.floor(x / cellSize)] = 0;
        //         }
        //         clearInterval(tank.bullets[index].timerId);
        //         tank.bullets[index].el.remove();
        //         tank.bullets[index] = null;
        //         tank.bullets.splice(index, 1);
        //     } else {
        //         // tank.bullets[index].move();
        //         index++;
        //     }
        // }
      }
    });

    // playerTank.move();
    /**
     * это то самое место, где стоит делать основные шаги игрового цикла
     * например, как нам кажется, можно было бы сделать следующее
     * 1. передвинуть пули
     * 2. рассчитать, где танки окажутся после этого шага
     * 3. проверить столкновения (пуль с танками, пуль со стенами, танков со стенами и танков с танками)
     * 4. убрать с поля мертвые танки и разрушенные стены
     * 5. проверить, не закончились ли жизни у игрока или не закончиличь ли танки противника
     * 6. создать новые танки на базах в случае, если кого-то убили на этом шаге
     */
  }

  gameLoop() {
    if (this.isGameOver !== true) {
      this.gameStep();

      setTimeout(() => {
        this.gameLoop();
      }, gameTimerInterval);
    }
  }
}
