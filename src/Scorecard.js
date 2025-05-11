import { useState } from "react";
import {
  computeRunRate,
  computeRequiredRunRate,
  getEquation,
  getBattersForSelection,
  getBowlersForSelection,
} from "./utils.js";

export default function Scorecard({ teamA, teamB, tossWinTeam, tossOption }) {
  const teamA_name = teamA.name;
  const teamB_name = teamB.name;

  const battingFirst =
    tossOption == "bat" ? tossWinTeam : tossWinTeam == "A" ? "B" : "A";

  const players = new Map();
  players.set("A", new Map());
  players.set("B", new Map());
  for (let i = 0; i < teamA.players.length; i++) {
    players.get("A").set(i, {
      name: teamA.players[i],
      batting: null,
      bowling: null,
    });

    players.get("B").set(i, {
      name: teamB.players[i],
      batting: null,
      bowling: null,
    });
  }

  const [innings, setInnings] = useState("1");
  const [firstInnings, setFirstInnings] = useState({
    score: 0,
    wickets: 0,
    extras: {
      wide: 0,
      noball: 0,
      legbye: 0,
      bye: 0,
    },
    overs: {
      overCompleted: 0,
      ballsBowledInThisOver: 0,
    },
  });
  const [secondInnings, setSecondInnings] = useState({
    score: 0,
    wickets: 0,
    extras: {
      wide: 0,
      noball: 0,
      legbye: 0,
      bye: 0,
    },
    overs: {
      overCompleted: 0,
      ballsBowledInThisOver: 0,
    },
  });

  const [striker, setStriker] = useState(null);
  /*
  const [striker, setStriker] = useState({
    name: null,
    batting: {
      runs: 0,
      balls: 0,
      boundarys: {
        4: 0,
        6: 0,
      },
      ballByBall: [],
    },
  });
  */

  const [nonStriker, setNonStriker] = useState(null);
  /*
  const [nonStriker, setNonStriker] = useState({
    name: null,
    batting: {
      runs: 0,
      balls: 0,
      boundarys: {
        4: 0,
        6: 0,
      },
      ballByBall: [],
    },
  });
  */

  const [bowler, setBowler] = useState(null);
  /*
  const [bowler, setBowler] = useState({
    name: null,
    bowling: {
      runs: 0,
      overs: 0,
      ballsBowled: 0,
      maiden: 0,
      wickets: 0,
      extras: {
        wide: 0,
        noball: 0,
        legbye: 0,
        bye: 0,
      },
      ballByBall: [],
    },
  });
  */

  const prevBowler = useState(null);

  /* Sample ball data
  const a = {
    runs: 0,
    wide: false,
    noball: false,
    bye: false,
    legbye: false,
    wicket: {
      value: false,
      type: "bowled",
    },
  };
  */

  return (
    <>
      <div className="header">
        <div className="title">
          {teamA_name} vs {teamB_name}
        </div>
      </div>

      <div className="section">
        <div className="summary">
          <div className="toss-result">
            {tossWinTeam == "A" ? teamA_name : teamB_name} won the toss and
            chose to {tossOption} first!!
          </div>
          <div className="score">
            <div className="team-a">
              <div className="team-name">{teamA_name}</div>
              {battingFirst == "A" ? (
                <div className="team-score">
                  {firstInnings.score}/{firstInnings.wickets}
                </div>
              ) : innings == 2 ? (
                <div className="team-score">
                  {secondInnings.score}/{secondInnings.wickets}
                </div>
              ) : null}

              {battingFirst == "B" && innings == 2 ? (
                <div className="target">Target: </div>
              ) : null}
            </div>
            <div className="team-b">
              <div className="team-name">{teamB_name}</div>
              {battingFirst == "B" ? (
                <div className="team-score">
                  {firstInnings.score}/{firstInnings.wickets}
                </div>
              ) : innings == 2 ? (
                <div className="team-score">
                  {secondInnings.score}/{secondInnings.wickets}
                </div>
              ) : null}

              {battingFirst == "A" && innings == 2 ? (
                <div className="target">Target: </div>
              ) : null}
            </div>
          </div>
          <div className="additional-details">
            <div className="runrate">
              RR:&nbsp;&nbsp;
              {innings == 1
                ? computeRunRate(firstInnings)
                : computeRunRate(secondInnings)}
            </div>
            {innings == 2 ? (
              <>
                <div className="required-runrate">
                  RRR:&nbsp;&nbsp;
                  {computeRequiredRunRate(firstInnings, secondInnings)}
                </div>
                <div className="required-equation">
                  {getEquation(firstInnings, secondInnings)}
                </div>
              </>
            ) : null}
          </div>
          <div className="current-players">
            <div className="bowling">
              {bowler != null ? (
                <>
                  <div className="name">{bowler.name}</div>
                  <div className="figures">
                    {bowler.bowling.overs}
                    {bowler.bowling.ballsBowled == 0
                      ? ""
                      : "." + bowler.bowling.ballsBowled}
                    -{bowler.bowling.maiden}-{bowler.bowling.runs}-
                    {bowler.bowling.wickets}
                  </div>
                  {bowler.bowling.ballByBall.at(-1) != null ? (
                    <div className="overs-data">
                      {bowler.bowling.ballByBall
                        .at(-1)
                        .map(function (ball, index) {
                          // TODO: Render the ball data here
                        })}
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>
            <div className="batting">
              <div className="strike">
                {striker != null ? (
                  <>
                    <div className="name">{striker.name}*</div>
                    <div className="score">{striker.batting.runs}</div>
                    <div className="balls">({striker.batting.balls})</div>
                  </>
                ) : null}
              </div>
              <div className="non-strike">
                {nonStriker != null ? (
                  <>
                    <div className="name">{nonStriker.name}*</div>
                    <div className="score">{nonStriker.batting.runs}</div>
                    <div className="balls">({nonStriker.batting.balls})</div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="switcher">
          <div className="options">
            <div className="scorer">Scorer</div>
            <div className="scorecard">Scorecard</div>
          </div>
          <div className="tabs">
            <div className="scorer">
              {bowler != null && striker != null && nonStriker != null ? (
                <div className="options">
                  <div className="runs">
                    <div className="label">Runs:</div>
                    <div className="runs-group">
                      <div className="one">1</div>
                      <div className="two">2</div>
                      <div className="three">3</div>
                      <div className="four">4</div>
                      <div className="five">5</div>
                      <div className="six">6</div>
                    </div>
                  </div>
                  <div className="extras">
                    <div className="label">Extras:</div>
                    <div className="extras-group">
                      <div className="wide">Wide</div>
                      <div className="noball">No-ball</div>
                      <div className="bye">Bye</div>
                      <div className="legbye">Leg-bye</div>
                    </div>
                  </div>
                  <div className="wickets">
                    <div className="label">Wickets:</div>
                    <div className="wickets-group">
                      <div className="caught">Caught</div>
                      <div className="bowled">Bowled</div>
                      <div className="runout">Run-out</div>
                      <div className="stump">Stumped</div>
                      <div className="lbw">LBW</div>
                      <div className="hitwicket">Hit Wicket</div>
                      <div className="retired-hurt">Retired Hurt</div>
                      <div className="retired-out">Retired Out</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="player-selection">
                  {striker == null ? (
                    <>
                      <div className="label">Choose striker:</div>
                      <div className="players-list">
                        {battingFirst == "A"
                          ? innings == 1
                            ? getBattersForSelection(players.get("A"))
                            : getBattersForSelection(players.get("B"))
                          : innings == 1
                          ? getBattersForSelection(players.get("B"))
                          : getBattersForSelection(players.get("A"))}
                      </div>
                    </>
                  ) : nonStiker == null ? (
                    <>
                      <div className="label">Choose non-striker:</div>
                      <div className="players-list">
                        {battingFirst == "A"
                          ? innings == 1
                            ? getBattersForSelection(players.get("A"))
                            : getBattersForSelection(players.get("B"))
                          : innings == 1
                          ? getBattersForSelection(players.get("B"))
                          : getBattersForSelection(players.get("A"))}
                      </div>
                    </>
                  ) : bowler == null ? (
                    <>
                      <div className="label">Choose bowler:</div>
                      <div className="players-list">
                        {battingFirst == "A"
                          ? innings == 1
                            ? getBowlersForSelection(
                                players.get("B"),
                                prevBowler
                              )
                            : getBowlersForSelection(
                                players.get("A"),
                                prevBowler
                              )
                          : innings == 1
                          ? getBowlersForSelection(players.get("A"), prevBowler)
                          : getBowlersForSelection(
                              players.get("B"),
                              prevBowler
                            )}
                      </div>
                    </>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
