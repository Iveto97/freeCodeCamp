const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("output");
 
const romanNum = {
  "M": 1000,
  "CM": 900,
  "D": 500,
  "CD": 400,
   "C": 100,
  "XC": 90,
  "L": 50,
  "XL": 40,
  "X": 10,
  "IX": 9,
  "V": 5,
  "IV": 4,
  "I": 1
}

const decimalToRoman = (input) => {
  let result = "";
  for(const num in romanNum) {
      while(romanNum[num] <= input) {
        result += num;
        input -= romanNum[num];
      }
  }
  return result;
};

const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

  if(inputInt <= 0) {
    result.textContent = "Please enter a number greater than or equal to 1";
    return;
  } else if (!numberInput.value) {
     result.textContent = "Please enter a valid number";
    return;
  } else if (inputInt >= 4000) {
    result.textContent = "Please enter a number less than or equal to 3999";
    return;
  } else if (isNaN(inputInt)) {
    result.textContent = "Please provide a decimal number";
    return;
  }

 result.textContent = decimalToRoman(inputInt);
 numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);
