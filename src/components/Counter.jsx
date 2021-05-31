import React, { Component } from "react";
import "./Counter.css";
import "bootstrap/dist/css/bootstrap.css";

class Counter extends Component {
  render() {
    const blueCount = this.props.words.filter(
      (word) => word.colour === "blue" && word.status === "hidden-word"
    ).length;
    const redCount = this.props.words.filter(
      (word) => word.colour === "red" && word.status === "hidden-word"
    ).length;
    return (
      <div className="counter-container">
        <div className="counter">
          <div className="scores">
            <span className="redText">{redCount}</span>-
            <span className="blueText">{blueCount}</span>
          </div>
          <button
            className="counter-reset-button"
            onClick={this.props.changeTeam}
          >
            {"End " + this.props.currentTeam.toUpperCase() + "'s Turn"}
          </button>
        </div>
        <div className="display-winner">
          <div className="counter-teamName">
            {this.props.currentTeam.toUpperCase() + "'s Turn"}
          </div>
          {this.showWinner(
            blueCount,
            redCount,
            this.props.currentTeam,
            this.props.gameState
          )}
        </div>
      </div>
    );
  }

  showWinner = (blueCount, redCount, currentTeam, gameState) => {
    if (gameState === "black-word-clicked") {
      if (currentTeam === "blue") {
        return (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            Red Wins!
          </div>
        );
      }
      if (currentTeam === "red") {
        return (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            Blue Wins!
          </div>
        );
      }
    }
    if (blueCount === 0)
      return (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          Blue Wins!
        </div>
      );
    if (redCount === 0)
      return (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          Red Wins!
        </div>
      );
  };
}

export default Counter;
