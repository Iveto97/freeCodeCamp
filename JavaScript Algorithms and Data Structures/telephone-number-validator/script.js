const input = document.getElementById("user-input");
const result = document.getElementById("results-div");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

const validatePhone = (data) => {
  const telRegEx =
    /^(1\s?)?([\d]{3}|\(\d{3}\))[-\s]?([\d]{3})[-\s]?([\d]{4})$/gm;
  const result = telRegEx.test(data);
  updateUI(printResult(result, data));
};

const printResult = (result, number) =>
  result ? `Valid US number: ${number}` : `Invalid US number: ${number}`;

const updateUI = (data) => {
  result.textContent = data;
  input.value = "";
};

const clearUserData = () => {
  result.textContent = "";
  input.value = "";
  return;
};

checkBtn.addEventListener("click", () => {
  if (input.value === "") {
    alert("Please provide a phone number");
    clearUserData();
    return;
  }

  validatePhone(input.value);
});

clearBtn.addEventListener("click", () => {
  clearUserData();
  return;
});
