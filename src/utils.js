export function computeRunRate(inningsData) {
  const ballsBowled =
    inningsData.overs.overCompleted * 6 +
    inningsData.overs.ballsBowledInThisOver;
  if (ballsBowled == 0) {
    return "-.--";
  }

  if (inningsData.score == 0) {
    return "0.00";
  }

  return (inningsData.score * 6) / ballsBowled;
}

function getRunsAndBallsRemaining(firstInningsData, secondInningsData) {
  const runsToHit = firstInningsData.score + 1 - secondInningsData.score;
  const ballsRemaining =
    firstInningsData.overs.overCompleted * 6 +
    firstInningsData.overs.ballsBowledInThisOver -
    (secondInningsData.overs.overCompleted * 6 +
      secondInningsData.overs.ballsBowledInThisOver);
  return {
    runs: runsToHit,
    balls: ballsRemaining,
  };
}

export function computeRequiredRunRate(firstInningsData, secondInningsData) {
  const equationData = getRunsAndBallsRemaining(
    firstInningsData,
    secondInningsData
  );
  return (parseInt(equationData.runs) * 6) / parseInt(equationData.balls);
}

export function getEquation(firstInningsData, secondInningsData) {
  const equationData = getRunsAndBallsRemaining(
    firstInningsData,
    secondInningsData
  );
  return `Need ${equationData.runs} run${
    equationData.runs <= 1 ? "" : "s"
  } in ${equationData.balls} ball${equationData.balls <= 1 ? "" : "s"}`;
}

export function getBattersForSelection(players) {
  const playersList = [];
  players.forEach(function (player, index) {
    if (player.batting == null) {
      playersList.push(<div class="player">{player.name}</div>);
    }
  });
  return playersList;
}

export function getBowlersForSelection(players, prevBowler) {
  const playersList = [];
  players.forEach(function (player, index) {
    if (player != prevBowler) {
      playersList.push(<div class="player">{player.name}</div>);
    }
  });
  return playersList;
}
