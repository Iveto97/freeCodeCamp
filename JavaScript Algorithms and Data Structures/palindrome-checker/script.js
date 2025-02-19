const checkButton = document.getElementById("check-btn");
const resultText = document.getElementById("result");
const inputText = document.getElementById("text-input");

const cleanInputString = (str) => {
  const regex = /[\W_]/g;
  return str.replace(regex, "").toLowerCase();
};

const isPalindrome = (text) => {
  const splitString = text.split("");
  const reverseArr = splitString.reverse();
  const joinArr = reverseArr.join("");
  return joinArr === text ? true : false;
};

const renderResult = (e) => {
e.preventDefault();
  const userInput = inputText.value;
  inputText.value = "";
  if (userInput.length === 0) {
    resultText.innerText = `Please input a value`;
  } else {
    const cleanedText = cleanInputString(userInput);
    resultText.innerText = isPalindrome(cleanedText)
      ? `${userInput} is a palindrome.`
      : `${userInput} is not a palindrome.`;
  }
};

checkButton.addEventListener("click", renderResult);
