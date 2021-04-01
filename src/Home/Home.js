import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/game">Game</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <Link to="/playground">Playground</Link>
        </li>

      </ul>
    </div>
  );
}
