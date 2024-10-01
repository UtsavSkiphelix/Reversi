const coins = document.querySelectorAll(".coin");
const coin = (a) => document.getElementById(a);
let PLAYING = "black";
const switch_player = () => {
  PLAYING = PLAYING === "black" ? "white" : "black";
};
const count = (player) => {
  const player_coins = document.querySelectorAll("." + player);
  let coins = [];
  player_coins.forEach((box) => {
    coins.push(box.getAttribute("id"));
  });
  return coins;
};
let GAME_LOG = {
  MOVES: 0,
  0: {
    next_turn: "black",
    black: ["44", "55"],
    white: ["45", "54"],
  },
};
let MOVED = 0;
if (localStorage.GAME_LOG) {
  GAME_LOG = JSON.parse(localStorage.getItem("GAME_LOG"));
} else {
  localStorage.setItem("GAME_LOG", JSON.stringify(GAME_LOG));
}
// const boxes = document.querySelectorAll(".box");
// boxes.forEach((box) => {
//   let id = box.getAttribute("id");
//   box.innerHTML = '<div class="coin"></div><p class="pos">' + id + "</p>";
// });

const availableMoves = (player) => {
  const players_coins = document.querySelectorAll("." + player);
  let opp_coin = player === "black" ? "white" : "black";
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
      let opp_coin = player === "black" ? "white" : "black";
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
        if (box.classList.contains("turning_" + opp_coin)) {
          box.classList.remove("turning_" + opp_coin);
        }
        box.classList.add("turning_" + player);
      });
    };
    const put = (e) => {
      placed_coin = e.srcElement;
      placed_coin.classList.add(player);
      placed_coin.classList.remove("available");
      moves.forEach((cord) => {
        let box = document.getElementById(cord);
        box.removeEventListener("click", put);
        box.classList.remove("available");
      });
      turn(e.srcElement.getAttribute("id"));
      MOVED++;
      switch_player();
      GAME_LOG[MOVED] = {
        next_turn: PLAYING,
        coin_position: placed_coin.getAttribute("id"),
        black: count("black"),
        white: count("white"),
      };
      GAME_LOG["MOVES"] = MOVED;
      localStorage.GAME_LOG = JSON.stringify(GAME_LOG);
      move(PLAYING);
    };
    moves.forEach((cord) => {
      let box = document.getElementById(cord);
      box.classList.add("available");
      box.addEventListener("click", put);
    });
  } else {
    switch_player();
    if (availableMoves(PLAYING).length !== 0) {
      move(PLAYING);
    } else {
      let winner =
        GAME_LOG[GAME_LOG["MOVES"]]["black"].length >=
        GAME_LOG[GAME_LOG["MOVES"]]["white"].length
          ? "black"
          : "white";
      console.log(winner);
    }
  }
};

const load_game = (game_log, MOVE) => {
  let game_position = game_log[MOVE];
  game_log["MOVES"] = MOVE;
  localStorage.GAME_LOG = JSON.stringify(game_log);
  PLAYING = game_position["next_turn"];
  document.querySelectorAll(".black").forEach((coin) => {
    coin.classList.remove("black");
  });
  document.querySelectorAll(".white").forEach((coin) => {
    coin.classList.remove("white");
  });
  document.querySelectorAll(".turning_black").forEach((coin) => {
    coin.classList.remove("turning_black");
  });
  document.querySelectorAll(".turning_white").forEach((coin) => {
    coin.classList.remove("turning_white");
  });
  document.querySelectorAll(".available").forEach((coin) => {
    coin.classList.remove("available");
  });

  const black_coins = game_position["black"];
  const white_coins = game_position["white"];
  black_coins.forEach((cord) => {
    document.getElementById(cord).classList.add("black");
  });
  white_coins.forEach((cord) => {
    document.getElementById(cord).classList.add("white");
  });
  move(PLAYING);
};

const undo = (moves) => {
  if (moves > 0) {
    delete GAME_LOG[moves];
    MOVED = moves - 1;
    load_game(GAME_LOG, MOVED);
  }
};

const start = () => {
  load_game(GAME_LOG, GAME_LOG["MOVES"]);
};

const restart = () => {
  localStorage.GAME_LOG = JSON.stringify({
    MOVES: 0,
    0: {
      next_turn: "black",
      black: ["44", "55"],
      white: ["45", "54"],
    },
  });
  GAME_LOG = JSON.parse(localStorage.GAME_LOG);
  load_game(GAME_LOG, GAME_LOG["MOVES"]);
};

const copy_game = () => {
  alert(localStorage.GAME_LOG);
};
start();
