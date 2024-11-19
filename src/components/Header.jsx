import React from "react";
import "./css/header.css";

export default function Header() {
  return (
    <header>
      <p style={{ fontSize: "23px", letterSpacing: "2px" }}>
        Teric's Invoice Generator
      </p>
      <button>Github</button>
    </header>
  );
}
