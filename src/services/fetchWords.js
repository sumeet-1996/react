export async function getWords() {
  const response = await fetch("/DemoMVC/board");
  return await response.json();
}

export async function getWordsForNewGame() {
  const response = await fetch("/DemoMVC/newGame");
  return await response.json();
}

export async function updateWord(index, gameState, currentTeam) {
  await fetch("/DemoMVC/words/" + gameState + "/" + currentTeam + "/" + index);
}