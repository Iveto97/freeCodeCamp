const openBtn = document.getElementById("open-cash-re-btn");
const header = document.getElementById("project-header");
const screenContainer = document.getElementById("app-container");
const cashInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const keyboardBtns = document.querySelectorAll("#keyboard-btn");
const deleteBtn = document.getElementById("delete-btn");
const closeBtn = document.getElementById("close-btn");

let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

let btnValue = "";

const cashDue = (customerDue, cashDrawer) => {
  let due = {};

  const denominations = [
    ["ONE HUNDRED", 100],
    ["TWENTY", 20],
    ["TEN", 10],
    ["FIVE", 5],
    ["ONE", 1],
    ["QUARTER", 0.25],
    ["DIME", 0.1],
    ["NICKEL", 0.05],
    ["PENNY", 0.01],
  ];

  for (const element of denominations) {
    let enoughMoney = 0;

    while (customerDue >= element[1] && cashDrawer[element[0]] > 0) {
      cashDrawer[element[0]] = Number(
        (cashDrawer[element[0]] - element[1]).toFixed(2)
      );
      customerDue = Number(customerDue - element[1]).toFixed(2);

      enoughMoney += element[1];
    }
    if (enoughMoney > 0) {
      due[element[0]] = enoughMoney;
    }
  }

  if (customerDue > 0) {
    return ["INSUFFICIENT_FUNDS", []];
  }
  console.log(Object.entries(cashDrawer));

  let remainingCid = Number(
    Object.entries(cashDrawer)
      .reduce((acc, curr) => acc + curr[1], 0)
      .toFixed(2)
  );
  console.log(remainingCid);

  if (remainingCid === 0) {
    return ["CLOSED", Object.entries(due)];
  } else {
    return ["OPEN", Object.entries(due)];
  }
};

const printStatusAndDue = ([status, change]) => {
  let changeMessage = "";
  if (change?.length > 0) {
    changeMessage += `<h3 class="due-header">Status: ${status} </h3>`;

    for (const element of change) {
      changeMessage += `<p class="due-para">${
        element[0]
      }: $${element[1].toFixed(2)}</p>`;
    }
  } else if (status === "OPEN" || status === "INSUFFICIENT_FUNDS") {
    changeMessage += `<h3 class="due-header">Status: ${status} </h3>`;
  } else {
    changeMessage += `<h3 class="due-header">${status} </h3>`;
  }

  changeDue.innerHTML = changeMessage;
};

const purchase = () => {
  let cash = parseFloat(cashInput.value);
  let customerDue = Number((cash - price).toFixed(2));
  let totalCash = Number(
    cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2)
  );

  let cashDrawer = {};

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (cash === price) {
    printStatusAndDue(["No change due - customer paid with exact cash", []]);
    return;
  }

  if (customerDue > totalCash) {
    printStatusAndDue(["INSUFFICIENT_FUNDS", []]);
    return;
  }

  for (let index = cid.length - 1; index >= 0; index--) {
    const element = cid[index];

    if (!cashDrawer[element[0]]) {
      cashDrawer[element[0]] = element[1];
    }
  }

  printStatusAndDue(cashDue(customerDue, cashDrawer));
};

openBtn.addEventListener("click", () => {
  header.style.display = "none";
  screenContainer.style.display = "block";
});

keyboardBtns.forEach((keyboardBtn) => {
  keyboardBtn.addEventListener("click", () => {
    btnValue += keyboardBtn.textContent;
    cashInput.value = btnValue;
  });
});

deleteBtn.addEventListener("click", () => {
  console.log(typeof btnValue);
  btnValue = btnValue.slice(0, btnValue.length - 1);
  cashInput.value = btnValue;
});

purchaseBtn.addEventListener("click", purchase);

closeBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to close the Cash Register program?")) {
    header.style.display = "block";
    screenContainer.style.display = "none";
  } else {
    return;
  }
});
