import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";
import Scorecard from "./Scorecard";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Scorecard
      teamA={{ name: "Team A", players: ["A-1", "A-2", "A-3", "A-4", "A-5"] }}
      teamB={{ name: "Team B", players: ["B-1", "B-2", "B-3", "B-4", "B-5"] }}
      tossWinTeam={"A"}
      tossOption={"bat"}
    />
  </StrictMode>
);
