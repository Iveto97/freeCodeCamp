const endpoint = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";
const creatureEndpoint =
  "https://rpg-creature-api.freecodecamp.rocks/api/creature";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const specialSkills = document.getElementById("special-skills");
const types = document.getElementById("types");
const description = document.getElementById("description");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const clearFields = () => {
  creatureName.textContent = "";
  creatureId.textContent = "";
  weight.textContent = "";
  height.textContent = "";
  specialSkills.textContent = "";
  description.textContent = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
  types.textContent = "Type: ";
};

const printData = (data) => {
  creatureName.textContent += data.name;
  creatureId.textContent += data.id;
  weight.textContent += data.weight;
  height.textContent += data.height;
  specialSkills.textContent += data.special.name;
  description.textContent += data.special.description;

  for (let index = 0; index < data.stats.length; index++) {
    const element = data.stats[index];

    switch (element.name) {
      case "hp":
        hp.textContent = element.base_stat;
        break;

      case "attack":
        attack.textContent = element.base_stat;
        break;

      case "defense":
        defense.textContent = element.base_stat;
        break;

      case "special-attack":
        specialAttack.textContent = element.base_stat;
        break;

      case "special-defense":
        specialDefense.textContent = element.base_stat;
        break;

      case "speed":
        speed.textContent = element.base_stat;
        break;

      default:
        break;
    }
  }

  data.types.forEach((element) => {
    let span = document.createElement("span");
    span.setAttribute("class", "typeStyle");
    span.textContent = element.name;
    types.appendChild(span);
  });
};

const fetchData = async (link) => {
  try {
    const res = await fetch(link);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const searchCreature = async () => {
  clearFields();

  const searchInputValue = searchInput.value;

  if (searchInputValue === "Red") {
    alert("Creature not found");
    searchInput.value = "";
  } else if (searchInputValue === "") {
    alert("Please, write the name of the creature.");
  }

    const totalData = await fetchData(`${creatureEndpoint}/${searchInputValue}`);
if(totalData){ 
    printData(totalData);
  } else {
    alert("Creature not found");
    searchInput.value = "";
    return;
  }
};

searchButton.addEventListener("click", searchCreature);
