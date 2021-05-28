import React, { Component } from "react";
import "./Word.css";

class Word extends Component {
  state = {};
  render() {
    return (
      <div
        className={this.formatClass()}
        onClick={() => {
          this.props.onWordClick(this.props.word);
        }}
      >
        {this.props.word.title.toUpperCase()}
      </div>
    );
  }
  formatClass() {
    let classes = "word ";
    const { colour, status } = this.props.word;
    const user = this.props.user;
    const gameState = this.props.gameState;
    classes += colour + " ";
    classes += user + " ";
    classes += status + " ";
    if (
      gameState === "game-started" && status === "hidden-word"
        ? (classes += "")
        : (classes += " game-over")
    )
      return classes;
  }
}

export default Word;
