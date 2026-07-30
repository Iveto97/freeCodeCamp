const footballTeam = {
  team: "Real Madrid",
  year: 1902,
  headCoach: "Jose Mourinho",
  players: [
    {
      name: "Thibaut Courtois",
      position: "goalkeeper",
      number: 1,
      isCaptain: false,
    },
    {
      name: "Éder Militão",
      position: "defender",
      number: 3,
      isCaptain: false,
    },
    {
      name: "Jude Bellingham",
      position: "midfielder",
      number: 5,
      isCaptain: false,
    },
    {
      name: "Eduardo Camavinga",
      position: "midfielder",
      number: 6,
      isCaptain: false,
    },
    {
      name: "Vinícius Júnior",
      position: "forward",
      number: 7,
      isCaptain: false,
    },
    {
      name: "Federico Valverde",
      position: "midfielder",
      number: 8,
      isCaptain: true,
    },
    {
      name: "Kylian Mbappé",
      position: "forward",
      number: 10,
      isCaptain: false,
    },
    {
      name: "Rodrygo",
      position: "forward",
      number: 11,
      isCaptain: false,
    },
    {
      name: "Trent Alexander-Arnold",
      position: "defender",
      number: 12,
      isCaptain: false,
    },
    {
      name: "Andriy Lunin",
      position: "goalkeeper",
      number: 13,
      isCaptain: false,
    },
    {
      name: "Aurélien Tchouaméni",
      position: "midfielder",
      number: 14,
      isCaptain: false,
    },
    {
      name: "Arda Güler",
      position: "midfielder",
      number: 15,
      isCaptain: false,
    },
    {
      name: "Gonzalo García",
      position: "forward",
      number: 16,
      isCaptain: false,
    },
    {
      name: "Raúl Asencio",
      position: "defender",
      number: 17,
      isCaptain: false,
    },
    {
      name: "Álvaro Carreras",
      position: "defender",
      number: 18,
      isCaptain: false,
    },
    {
      name: "Brahim Díaz",
      position: "forward",
      number: 21,
      isCaptain: false,
    },
    {
      name: "Antonio Rüdiger",
      position: "defender",
      number: 22,
      isCaptain: false,
    },
    {
      name: "Ferland Mendy",
      position: "defender",
      number: 23,
      isCaptain: false,
    },
    {
      name: "Dean Huijsen",
      position: "defender",
      number: 24,
      isCaptain: false,
    },
    {
      name: "Franco Mastantuono",
      position: "forward",
      number: 30,
      isCaptain: false,
    },
  ],
};

const teamName = document.getElementById("team");
const year = document.getElementById("year");
const headCoach = document.getElementById("head-coach");
const playerCard = document.getElementById("player-cards");
const selectPlayerPosition = document.getElementById("players");

function playerCardCreator(playerData) {

  return `
    <div class="player-card">
      <img src="./Real Madrid.png" alt="Real Madrid" class="team-logo">
      <h2>${playerData.isCaptain ? "(Captain)" : ""} ${playerData.name}</h2>
      <p>Position: ${playerData.position}</p>
      <p>Number: ${playerData.number}</p>
    </div>
  `;
}

function renderTeamInfo() {
  teamName.textContent = footballTeam.team;
  year.textContent = footballTeam.year;
  headCoach.textContent = footballTeam.headCoach;
}

function renderPlayerCards(playersData) {
  const playerCardsHTML = playersData
    .map((player) => playerCardCreator(player))
    .join("");
  playerCard.innerHTML = playerCardsHTML;
}

function filterPlayersByPosition(position) {
  const data = footballTeam.players;
  const filteredPlayers =
    position === "all"
      ? data
      : data.filter((player) => player.position === position);
  renderPlayerCards(filteredPlayers);
  console.log(filteredPlayers);
}

document.addEventListener("DOMContentLoaded", () => {
  renderTeamInfo();
  renderPlayerCards(footballTeam.players);
});

selectPlayerPosition.addEventListener("change", (event) =>
  filterPlayersByPosition(event.target.value),
);
