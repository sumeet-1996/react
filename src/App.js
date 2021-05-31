import React, { Component } from "react";
import Word from "./components/Word";
import Counter from "./components/Counter";
import "./App.css";
import {
  getWords,
  updateWord,
  getWordsForNewGame,
  getListOfWords,
} from "./services/fetchWords";

class App extends Component {
  state = {
    words: [],
    currentTeam: "",
    gameState: "",
    user: "player",
  };

  componentDidMount() {
    getWords(this.state.gameState).then((data) => {
      this.setState({
        words: data.words,
        currentTeam: data.currentTeam,
        gameState: data.gameState,
      });
    });
  }

  shouldComponentUpdate(nextState, nextProps) {
    if (
      nextProps.gameState === "game-started" ||
      this.state.user !== nextProps.user
    )
      return true;
    else if (
      this.state.gameState === "black-word-clicked" ||
      this.state.gameState === "player-win"
    )
      return false;
    else return true;
  }

  render() {
    return (
      <div className="board">
        <Counter
          words={this.state.words}
          currentTeam={this.state.currentTeam}
          gameState={this.state.gameState}
          changeTeam={this.changeCurrentTeam}
        />
        <div className="main-grid">
          {this.state.words.map((word) => (
            <Word
              key={word.title}
              word={word}
              user={this.state.user}
              gameState={this.state.gameState}
              onWordClick={this.handleWordClick}
            />
          ))}
        </div>
        <div className="action-container">
          <button
            className={
              this.state.user === "player" ? "enable-button" : "disbale-button"
            }
            onClick={this.setUserAsPlayer}
          >
            Player
          </button>
          <button
            className={
              this.state.user === "spymaster"
                ? "enable-button"
                : "disbale-button"
            }
            onClick={this.setUserAsSpymaster}
          >
            Spymaster
          </button>
          <button className="start-new-game" onClick={this.startNewGame}>
            Start New Game
          </button>
        </div>
      </div>
    );
  }

  handleWordClick = (word) => {
    if (this.state.user === "spymaster") return;
    const prevGameState = this.state.gameState;
    let gameState = this.state.gameState;
    let currentTeam = this.state.currentTeam;
    const words = [...this.state.words];
    const index = words.indexOf(word);
    words[index] = { ...word };
    words[index].status = "revealed";

    const blueCount = words.filter(
      (word) => word.colour === "blue" && word.status === "hidden-word"
    ).length;
    const redCount = words.filter(
      (word) => word.colour === "red" && word.status === "hidden-word"
    ).length;

    if (word.colour === "black") gameState = "black-word-clicked";
    if (blueCount === 0 || redCount === 0) gameState = "player-win";
    if (word.colour === "red") currentTeam = "red";
    if (word.colour === "blue") currentTeam = "blue";

    this.setState({
      words: words,
      gameState: gameState,
      currentTeam: currentTeam,
    });

    if (prevGameState === "game-started" || word.colour === "black")
      updateWord(index, gameState, currentTeam);
  };

  setUserAsPlayer = () => {
    this.setState({ user: "player" });
  };
  setUserAsSpymaster = (user) => {
    this.setState({ user: "spymaster" });
  };

  changeCurrentTeam = () => {
    let currentTeam = this.state.currentTeam;
    if (currentTeam === "red") {
      currentTeam = "blue";
    } else if (currentTeam === "blue") {
      currentTeam = "red";
    }
    this.setState({ currentTeam });
  };

  startNewGame = () => {
    /*getWordsForNewGame(this.state.gameState).then((data) => {
      this.setState({
        words: data.words,
        currentTeam: data.currentTeam,
        gameState: data.gameState,
      });
    });*/

    const data = getListOfWords();
    console.log(data);
  };
}

export default App;
