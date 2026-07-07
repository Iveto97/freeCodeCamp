const textInput = document.getElementById("text-input");
const characterCount = document.getElementById("char-count").querySelector("span");
const remainingCount = document.getElementById("char-remaining").querySelector("span");
const maxLength = 50;

function onTextChange(event) {
    const inputValue = event.target.value;
  if (inputValue.length > maxLength) {
    inputValue = inputValue.slice(0, maxLength);
  }

  const currentLength = inputValue.length;

  characterCount.textContent = currentLength;
  remainingCount.textContent = maxLength - currentLength;

  if (currentLength >= maxLength) {
    characterCount.style.color = "#ff0066";
  } else {
    characterCount.style.color = "#4F46E5";
  }
}

textInput.addEventListener("input", (event) => onTextChange(event));
