let row1Matches = 1;
let row2Matches = 3;
let row3Matches = 5;
let row4Matches = 7;
let playerTurn = true;
let matchesRemovedThisTurn = 0;
let selectedRow = null;

function renderMatches() {
  let row1 = document.getElementById("row1");
  row1.innerHTML = "";
  for (let i = 0; i < row1Matches; i++) {
    let match = document.createElement("span");
    match.textContent = "|";
    match.classList.add("match");
    if (selectedRow === null || selectedRow === 1) {
      match.onclick = () => removeMatch(1, match);
    }
    row1.appendChild(match);
  }

  let row2 = document.getElementById("row2");
  row2.innerHTML = "";
  for (let i = 0; i < row2Matches; i++) {
    let match = document.createElement("span");
    match.textContent = "|";
    match.classList.add("match");
    if (selectedRow === null || selectedRow === 2) {
      match.onclick = () => removeMatch(2, match);
    }
    row2.appendChild(match);
  }

  let row3 = document.getElementById("row3");
  row3.innerHTML = "";
  for (let i = 0; i < row3Matches; i++) {
    let match = document.createElement("span");
    match.textContent = "|";
    match.classList.add("match");
    if (selectedRow === null || selectedRow === 3) {
      match.onclick = () => removeMatch(3, match);
    }
    row3.appendChild(match);
  }

  let row4 = document.getElementById("row4");
  row4.innerHTML = "";
  for (let i = 0; i < row4Matches; i++) {
    let match = document.createElement("span");
    match.textContent = "|";
    match.classList.add("match");
    if (selectedRow === null || selectedRow === 4) {
      match.onclick = () => removeMatch(4, match);
    }
    row4.appendChild(match);
  }

  updateProbabilityDisplay();
}

function removeMatch(row, matchElement) {
  if (!playerTurn || (selectedRow !== null && selectedRow !== row)) return;

  if (selectedRow === null) {
    selectedRow = row;
  }

  matchElement.textContent = "";
  matchesRemovedThisTurn++;

  if (row === 1) {
    row1Matches--;
  } else if (row === 2) {
    row2Matches--;
  } else if (row === 3) {
    row3Matches--;
  } else if (row === 4) {
    row4Matches--;
  }

  updateProbabilityDisplay();
}

function finishTurn() {
  if (!playerTurn || matchesRemovedThisTurn === 0) return;

  matchesRemovedThisTurn = 0;
  selectedRow = null;

  renderMatches();

  if (checkGameOver()) return;

  playerTurn = false;
  document.getElementById("message").textContent = "Computer's turn...";
  updateProbabilityDisplay();

  setTimeout(computerTurn, 1000);
}

function computerTurn() {
  let totalMatches = row1Matches + row2Matches + row3Matches + row4Matches;
  if (totalMatches <= 0) return;

  let nonEmptyRows = [];
  if (row1Matches > 0) nonEmptyRows.push({ row: 1, matches: row1Matches });
  if (row2Matches > 0) nonEmptyRows.push({ row: 2, matches: row2Matches });
  if (row3Matches > 0) nonEmptyRows.push({ row: 3, matches: row3Matches });
  if (row4Matches > 0) nonEmptyRows.push({ row: 4, matches: row4Matches });

  if (nonEmptyRows.length === 2) {
    let [firstRow, secondRow] = nonEmptyRows;

    if (firstRow.matches === 1 && secondRow.matches > 1) {
      takeMatches(secondRow.row, secondRow.matches); // FROM LARGER ROW
    } else if (secondRow.matches === 1 && firstRow.matches > 1) {
      takeMatches(firstRow.row, firstRow.matches);
    } else if (firstRow.matches === secondRow.matches) {
      takeMatches(firstRow.row, firstRow.matches); //ALL FROM ONE ROW
    } else {
      if (firstRow.matches > secondRow.matches) {
        takeMatches(firstRow.row, firstRow.matches - secondRow.matches); // BALANCE ROW
      } else {
        takeMatches(secondRow.row, secondRow.matches - firstRow.matches);
      }
    }
  } else {
    let matchesToTake = 0;

    if (totalMatches % 3 === 0) {
      if (row1Matches > 0) {
        matchesToTake = 1;
        row1Matches--;
      } else if (row2Matches > 0) {
        matchesToTake = 1;
        row2Matches--;
      } else if (row3Matches > 0) {
        matchesToTake = 1;
        row3Matches--;
      } else if (row4Matches > 0) {
        matchesToTake = 1;
        row4Matches--;
      }
    } else if (totalMatches % 3 === 1) {
      if (row1Matches > 1) {
        matchesToTake = 2;
        row1Matches -= 2;
      } else if (row2Matches > 1) {
        matchesToTake = 2;
        row2Matches -= 2;
      } else if (row3Matches > 1) {
        matchesToTake = 2;
        row3Matches -= 2;
      } else if (row4Matches > 1) {
        matchesToTake = 2;
        row4Matches -= 2;
      } else if (row1Matches === 1) {
        matchesToTake = 1;
        row1Matches--;
      } else if (row2Matches === 1) {
        matchesToTake = 1;
        row2Matches--;
      } else if (row3Matches === 1) {
        matchesToTake = 1;
        row3Matches--;
      } else if (row4Matches === 1) {
        matchesToTake = 1;
        row4Matches--;
      }
    } else {
      if (row1Matches > 0) {
        matchesToTake = 1;
        row1Matches--;
      } else if (row2Matches > 0) {
        matchesToTake = 1;
        row2Matches--;
      } else if (row3Matches > 0) {
        matchesToTake = 1;
        row3Matches--;
      } else if (row4Matches > 0) {
        matchesToTake = 1;
        row4Matches--;
      }
    }
  }

  renderMatches();

  if (checkGameOver()) return;

  playerTurn = true;
  document.getElementById("message").textContent = "Your turn!";
  updateProbabilityDisplay();
}

function takeMatches(row, number) {
  switch (row) {
    case 1:
      row1Matches -= number;
      break;
    case 2:
      row2Matches -= number;
      break;
    case 3:
      row3Matches -= number;
      break;
    case 4:
      row4Matches -= number;
      break;
  }
}

function checkGameOver() {
  if (row1Matches + row2Matches + row3Matches + row4Matches === 0) {
    document.getElementById("message").textContent = playerTurn
      ? "Computer wins!"
      : "You win!";

    document.querySelector("button").style.display = "none";

    let playAgainBtn = document.createElement("button");
    playAgainBtn.textContent = "Play Again";
    playAgainBtn.onclick = resetGame;
    playAgainBtn.style.marginTop = "10px";
    document
      .getElementById("message")
      .appendChild(document.createElement("br"));
    document.getElementById("message").appendChild(playAgainBtn);
    return true;
  }
  return false;
}

function resetGame() {
  row1Matches = 1;
  row2Matches = 3;
  row3Matches = 5;
  row4Matches = 7;
  playerTurn = true;
  matchesRemovedThisTurn = 0;
  selectedRow = null;
  document.querySelector("button").style.display = "inline-block";
  renderMatches();
  document.getElementById("message").textContent = "Your turn!";
  updateProbabilityDisplay();
}

function calculateBestMove() {
  let xorSum = row1Matches ^ row2Matches ^ row3Matches ^ row4Matches;
  if (xorSum === 0) {
    if (row1Matches > 0) return 1;
    if (row2Matches > 0) return 1;
    if (row3Matches > 0) return 1;
    if (row4Matches > 0) return 1;
  }

  if ((row1Matches ^ xorSum) < row1Matches)
    return row1Matches - (row1Matches ^ xorSum);
  if ((row2Matches ^ xorSum) < row2Matches)
    return row2Matches - (row2Matches ^ xorSum);
  if ((row3Matches ^ xorSum) < row3Matches)
    return row3Matches - (row3Matches ^ xorSum);
  if ((row4Matches ^ xorSum) < row4Matches)
    return row4Matches - (row4Matches ^ xorSum);

  return 1;
}

function updateProbabilityDisplay() {
  let probabilityElement = document.getElementById("probability");
  if (!probabilityElement) {
    probabilityElement = document.createElement("div");
    probabilityElement.id = "probability";
    document
      .querySelector(".container")
      .insertBefore(probabilityElement, document.getElementById("message"));
  }

  let probability = calculateWinProbability();
  let currentPlayer = playerTurn ? "Player" : "Computer";
  probabilityElement.textContent = `${currentPlayer}'s win probability: ${probability}%`;
}

function calculateWinProbability() {
  let totalMatches = row1Matches + row2Matches + row3Matches + row4Matches;

  if (totalMatches === 0) {
    return playerTurn ? 0 : 100;
  }

  let winningPositions = 0;
  let losingPositions = 0;

  for (let i = 1; i <= totalMatches; i++) {
    for (let row = 1; row <= 4; row++) {
      let matchesToTake = 0;
      if (row === 1 && row1Matches >= i) matchesToTake = i;
      if (row === 2 && row2Matches >= i) matchesToTake = i;
      if (row === 3 && row3Matches >= i) matchesToTake = i;
      if (row === 4 && row4Matches >= i) matchesToTake = i;

      if (matchesToTake > 0) {
        let originalRow1Matches = row1Matches;
        let originalRow2Matches = row2Matches;
        let originalRow3Matches = row3Matches;
        let originalRow4Matches = row4Matches;

        if (row === 1) row1Matches -= matchesToTake;
        else if (row === 2) row2Matches -= matchesToTake;
        else if (row === 3) row3Matches -= matchesToTake;
        else if (row === 4) row4Matches -= matchesToTake;

        let newTotal = row1Matches + row2Matches + row3Matches + row4Matches;

        if (newTotal === 0) {
          losingPositions++;
        } else {
          let nextTotal = newTotal % 3 === 1 ? 100 : 0;
          if (nextTotal === 100) winningPositions++;
          else losingPositions++;
        }

        row1Matches = originalRow1Matches;
        row2Matches = originalRow2Matches;
        row3Matches = originalRow3Matches;
        row4Matches = originalRow4Matches;
      }
    }
  }

  let totalPositions = winningPositions + losingPositions;
  if (totalPositions === 0) return 0;

  return (winningPositions / totalPositions) * 100;
}

renderMatches();
document.getElementById("message").textContent = "Your turn!";
updateProbabilityDisplay();
