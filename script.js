const coins = document.querySelectorAll(".coin");
const coin = (a) => document.getElementById(a);
let PLAYING = "player1";
const switch_player = () => {
  PLAYING = PLAYING === "player1" ? "player2" : "player1";
};
const count = (player) => {
  const player_coins = document.querySelectorAll("." + player);
  let coins = [];
  player_coins.forEach((box) => {
    coins.push(box.getAttribute("id"));
  });
  return coins;
};
let MOVES = 0;
let GAME_LOG = {};
// const boxes = document.querySelectorAll(".box");
// boxes.forEach((box) => {
//   let id = box.getAttribute("id");
//   box.innerHTML = '<div class="coin"></div><p class="pos">' + id + "</p>";
// });

const availableMoves = (player) => {
  const players_coins = document.querySelectorAll("." + player);
  let opp_coin = player === "player1" ? "player2" : "player1";
  let available_moves = [];

  players_coins.forEach((player_coin) => {
    let pos = player_coin.getAttribute("id");

    // Here We Are using a loop to check available position for a coin in all Eight directions

    // Down
    let flag = 0;
    for (let i = parseInt(pos[0]) + 1; i < 9; i++) {
      let temp_pos = i + pos[1];
      if (document.getElementById(temp_pos).classList.contains(opp_coin)) {
        flag = 1;
        continue;
      } else {
        if (
          flag === 1 &&
          !available_moves.includes(temp_pos) &&
          !document.getElementById(temp_pos).classList.contains(player)
        ) {
          available_moves.push(temp_pos);
        }
        break;
      }
    }

    // Up
    flag = 0;
    for (let i = parseInt(pos[0]) - 1; i > 0; i--) {
      let temp_pos = i + pos[1];
      if (document.getElementById(temp_pos).classList.contains(opp_coin)) {
        flag = 1;
        continue;
      } else {
        if (
          flag === 1 &&
          !available_moves.includes(temp_pos) &&
          !document.getElementById(temp_pos).classList.contains(player)
        ) {
          available_moves.push(temp_pos);
        }
        break;
      }
    }

    // Right
    flag = 0;
    for (let i = parseInt(pos[1]) + 1; i < 9; i++) {
      let temp_pos = pos[0] + i;
      if (document.getElementById(temp_pos).classList.contains(opp_coin)) {
        flag = 1;
        continue;
      } else {
        if (
          flag === 1 &&
          !available_moves.includes(temp_pos) &&
          !document.getElementById(temp_pos).classList.contains(player)
        ) {
          available_moves.push(temp_pos);
        }
        break;
      }
    }

    // Left
    flag = 0;
    for (let i = parseInt(pos[1]) - 1; i > 0; i--) {
      let temp_pos = pos[0] + i;
      if (document.getElementById(temp_pos).classList.contains(opp_coin)) {
        flag = 1;
      } else {
        if (
          flag === 1 &&
          !available_moves.includes(temp_pos) &&
          !document.getElementById(temp_pos).classList.contains(player)
        ) {
          available_moves.push(temp_pos);
        }
        break;
      }
    }

    // Lower-Right
    flag = 0;
    let i = parseInt(pos[0]) + 1;
    let j = parseInt(pos[1]) + 1;
    while (i < 9 && j < 9) {
      let temp_pos = String(i) + String(j);
      if (document.getElementById(temp_pos).classList.contains(opp_coin)) {
        flag = 1;
      } else {
        if (
          flag === 1 &&
          !available_moves.includes(temp_pos) &&
          !document.getElementById(temp_pos).classList.contains(player)
        ) {
          available_moves.push(temp_pos);
        }
        break;
      }
      i++;
      j++;
    }

    // Upper-Right
    flag = 0;
    i = parseInt(pos[0]) - 1;
    j = parseInt(pos[1]) + 1;
    while (i > 0 && j < 9) {
      let temp_pos = String(i) + String(j);
      if (document.getElementById(temp_pos).classList.contains(opp_coin)) {
        flag = 1;
      } else {
        if (
          flag === 1 &&
          !available_moves.includes(temp_pos) &&
          !document.getElementById(temp_pos).classList.contains(player)
        ) {
          available_moves.push(temp_pos);
        }
        break;
      }
      i--;
      j++;
    }

    // Lower-Left
    flag = 0;
    i = parseInt(pos[0]) + 1;
    j = parseInt(pos[1]) - 1;
    while (i < 9 && j > 0) {
      let temp_pos = String(i) + String(j);
      if (document.getElementById(temp_pos).classList.contains(opp_coin)) {
        flag = 1;
      } else {
        if (
          flag === 1 &&
          !available_moves.includes(temp_pos) &&
          !document.getElementById(temp_pos).classList.contains(player)
        ) {
          available_moves.push(temp_pos);
        }
        break;
      }
      i++;
      j--;
    }

    // Upper-Left
    flag = 0;
    i = parseInt(pos[0]) - 1;
    j = parseInt(pos[1]) - 1;
    while (i > 0 && j > 0) {
      let temp_pos = String(i) + String(j);
      if (document.getElementById(temp_pos).classList.contains(opp_coin)) {
        flag = 1;
      } else {
        if (
          flag === 1 &&
          !available_moves.includes(temp_pos) &&
          !document.getElementById(temp_pos).classList.contains(player)
        ) {
          available_moves.push(temp_pos);
        }
        break;
      }
      i--;
      j--;
    }
  });

  return available_moves;
};

const move = (player) => {
  if (availableMoves(player).length !== 0) {
    const moves = availableMoves(player);

    const turn = (current_move) => {
      let opp_coin = player === "player1" ? "player2" : "player1";
      let turning_coins = [];
      // down
      let flag = 0;
      let temp_moves = [];
      for (let i = parseInt(current_move[0]) + 1; i < 9; i++) {
        const pos = i + current_move[1];
        if (document.getElementById(pos).classList.contains(opp_coin)) {
          temp_moves.push(pos);
          flag = 1;
          continue;
        } else {
          if (
            document.getElementById(pos).classList.contains(player) &&
            flag === 1
          ) {
            turning_coins = turning_coins.concat(temp_moves);
          }
          break;
        }
      }

      // up
      flag = 0;
      temp_moves = [];
      for (let i = parseInt(current_move[0]) - 1; i > 0; i--) {
        const pos = i + current_move[1];
        if (document.getElementById(pos).classList.contains(opp_coin)) {
          temp_moves.push(pos);
          flag = 1;
        } else {
          if (
            document.getElementById(pos).classList.contains(player) &&
            flag === 1
          ) {
            turning_coins = turning_coins.concat(temp_moves);
          }
          break;
        }
      }

      // right
      flag = 0;
      temp_moves = [];
      for (let i = parseInt(current_move[1]) + 1; i < 9; i++) {
        const pos = current_move[0] + i;
        if (document.getElementById(pos).classList.contains(opp_coin)) {
          temp_moves.push(pos);
          flag = 1;
        } else {
          if (
            document.getElementById(pos).classList.contains(player) &&
            flag === 1
          ) {
            turning_coins = turning_coins.concat(temp_moves);
          }
          break;
        }
      }

      // left
      flag = 0;
      temp_moves = [];
      for (let i = parseInt(current_move[1]) - 1; i > 0; i--) {
        const pos = current_move[0] + i;
        if (document.getElementById(pos).classList.contains(opp_coin)) {
          temp_moves.push(pos);
          flag = 1;
        } else {
          if (
            document.getElementById(pos).classList.contains(player) &&
            flag === 1
          ) {
            turning_coins = turning_coins.concat(temp_moves);
          }
          break;
        }
      }

      // Lower-Right
      flag = 0;
      temp_moves = [];
      let i = parseInt(current_move[0]) + 1;
      let j = parseInt(current_move[1]) + 1;
      while (i < 9 && j < 9) {
        let pos = String(i) + String(j);
        if (document.getElementById(pos).classList.contains(opp_coin)) {
          temp_moves.push(pos);
          flag = 1;
        } else {
          if (
            document.getElementById(pos).classList.contains(player) &&
            flag === 1
          ) {
            turning_coins = turning_coins.concat(temp_moves);
          }
          break;
        }
        i++;
        j++;
      }

      // Upper-Right
      flag = 0;
      temp_moves = [];
      i = parseInt(current_move[0]) - 1;
      j = parseInt(current_move[1]) + 1;
      while (i > 0 && j < 9) {
        let pos = String(i) + String(j);
        if (document.getElementById(pos).classList.contains(opp_coin)) {
          temp_moves.push(pos);
          flag = 1;
        } else {
          if (
            document.getElementById(pos).classList.contains(player) &&
            flag === 1
          ) {
            turning_coins = turning_coins.concat(temp_moves);
          }
          break;
        }
        i--;
        j++;
      }

      // Lower-Left
      flag = 0;
      temp_moves = [];
      i = parseInt(current_move[0]) + 1;
      j = parseInt(current_move[1]) - 1;
      while (i < 9 && j > 0) {
        let pos = String(i) + String(j);
        if (document.getElementById(pos).classList.contains(opp_coin)) {
          temp_moves.push(pos);
          flag = 1;
        } else {
          if (
            document.getElementById(pos).classList.contains(player) &&
            flag === 1
          ) {
            turning_coins = turning_coins.concat(temp_moves);
          }
          break;
        }
        i++;
        j--;
      }

      // Upper-Left
      flag = 0;
      temp_moves = [];
      i = parseInt(current_move[0]) - 1;
      j = parseInt(current_move[1]) - 1;
      while (i > 0 && j > 0) {
        let pos = String(i) + String(j);
        if (document.getElementById(pos).classList.contains(opp_coin)) {
          temp_moves.push(pos);
          flag = 1;
        } else {
          if (
            document.getElementById(pos).classList.contains(player) &&
            flag === 1
          ) {
            turning_coins = turning_coins.concat(temp_moves);
          }
          break;
        }
        i--;
        j--;
      }

      turning_coins.forEach((cord) => {
        let box = document.getElementById(cord);
        box.classList.toggle(player);
        box.classList.toggle(opp_coin);
      });
    };
    const put = (e) => {
      e.srcElement.classList.add(player);
      e.srcElement.classList.remove("available");
      moves.forEach((cord) => {
        let box = document.getElementById(cord);
        box.removeEventListener("click", put);
        box.classList.remove("available");
      });
      turn(e.srcElement.getAttribute("id"));
      MOVES++;
      GAME_LOG[MOVES] = {
        player: player,
        player1: count("player1"),
        player2: count("player2"),
      };
      switch_player();
      move(PLAYING);
    };
    moves.forEach((cord) => {
      let box = document.getElementById(cord);
      box.classList.add("available");
      box.addEventListener("click", put);
    });
  }
};

const start = () => {
  coin("44").classList.add("player2");
  coin("45").classList.add("player1");
  coin("54").classList.add("player1");
  coin("55").classList.add("player2");
  move(PLAYING);
};

start();
