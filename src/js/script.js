"use strict";

//Input elements
let inputContainer = document.getElementById("main__div--inputContainer");
let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let userEmail = document.getElementById("user-email");
let userTwitter = document.getElementById("user-twitter");
let userGitHub = document.getElementById("user-github");
let app = document.querySelector(".app");

//Error required elements
let errorFirstName = document.querySelector(".error-first--name");
let errorLastName = document.querySelector(".error-last--name");
let errorEmail = document.querySelector(".error-email");
let errorTwitter = document.querySelector(".error-twitter");

//card elements
let cardPanel = document.querySelector(".card-panel");

//QR Code elements
let qrcodeImg = document.querySelector(".qr-code");
let qrcoddeMsg = document.querySelector(".qr-code-msg");

//Buttons
const btnCreate = document.getElementById("btn-create");
const btnCancel = document.getElementById("btn-cancel");

//Store the user input data
let userData = {};
const fetchData = fetch("http://localhost:3000/posts");
fetchData.then((response) => response.json()).then((data) => console.log(data));

//Global variable
let firstNameRequiredError = false;
let lastNameRequiredError = false;
let emailRequiredError = false;
let twitterError = false;
let qrcodeDisplay = false;

//***************************/
//**    DATA VALIDATION   **//
//***************************/
/* First name required*/
firstName.addEventListener("blur", function () {
  if (firstName.value.trim() === "" || firstName.value === null) {
    firstName.style.border = "1px solid red";
    errorFirstName.style.display = "flex";
    errorFirstName.textContent = "*First name is required";
    firstNameRequiredError = true;
  } else {
    errorFirstName.style.display = "none";
    firstName.style.border = "";
    userData.firstName = firstName.value;
    firstNameRequiredError = false;
  }
});

/* Last name required*/
lastName.addEventListener("blur", function () {
  if (lastName.value.trim() === "" || lastName.value === null) {
    lastName.style.border = "1px solid red";
    errorLastName.style.display = "flex";
    errorLastName.textContent = "*Last name is required";
    lastNameRequiredError = true;
  } else {
    errorLastName.style.display = "none";
    lastName.style.border = "";
    userData.lastName = lastName.value;
    lastNameRequiredError = false;
  }
});

/* Email required*/
userEmail.addEventListener("blur", function () {
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (userEmail.value.trim() === "" || userEmail.value === null) {
    userEmail.style.border = "1px solid red";
    errorEmail.style.display = "flex";
    errorEmail.textContent = "*Email is required";
    emailRequiredError = true;
  } else if (
    !userEmail.value.match(validRegex) ||
    userEmail.value.length > 50
  ) {
    userEmail.style.border = "1px solid red";
    errorEmail.style.display = "flex";
    errorEmail.textContent = "*Invalid email";
    emailRequiredError = true;
  } else {
    errorEmail.style.display = "none";
    userEmail.style.border = "";
    userData.userEmail = userEmail.value;
    emailRequiredError = false;
  }
});

/* Twitter Optional */
userTwitter.addEventListener("blur", function () {
  let twitterFirstChart = userTwitter.value.charAt(0);
  let checkLetterNumber = /^[a-zA-Z0-9_]*$/;

  if (!twitterFirstChart.match("@")) {
    errorTwitter.style.display = "flex";
    userTwitter.style.border = "1px red solid";
    errorTwitter.textContent = "Twitter account name doesn't start with '@'";
    twitterError = true;
  } else {
    userTwitter.style.border = "";
    errorTwitter.style.display = "none";
    twitterError = false;
    userData.userTwitter = userTwitter.value;
  }
});

/* GitHub Optional*/
userGitHub.addEventListener("blur", function () {
  userData.userGitHub = userGitHub.value;
});

//***************************/
//**  FUNCTIONS SECTIONS  **//
//***************************/

/* Create QRcode */
function makeCode() {
  let qrcode = new QRCode(document.getElementById("qrcode"), {
    text: `https://github.com/${userGitHub.value}`,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
  qrcodeDisplay = true;
}

/* Remove QRCode */
function removeCode() {
  document.getElementById("qrcode").textContent = "";
}

/* Create display card */
function makeCard() {
  let cardNameEl = document.createElement("p");
  let cardEmailEl = document.createElement("p");
  let cardTwitterEl = document.createElement("p");
  let cardGitHubEl = document.createElement("p");

  let fullName = userData.firstName + " " + userData.lastName;
  let fullEmail = userData.userEmail;
  let fullTwitter = userData.userTwitter;
  let fullGitHub = userData.userGitHub;

  cardNameEl.textContent = `👤 ${fullName}`;
  cardEmailEl.textContent = `📧 ${fullEmail}`;
  cardTwitterEl.innerHTML = `<ion-icon name="logo-twitter"></ion-icon> ${fullTwitter}`;
  cardGitHubEl.innerHTML = `<ion-icon name="logo-github"></ion-icon> ${fullGitHub}`;

  cardPanel.appendChild(cardNameEl);
  cardPanel.appendChild(cardEmailEl);
  cardPanel.appendChild(cardTwitterEl);
  cardPanel.appendChild(cardGitHubEl);
  console.log(userData);
}

/* Remove display card */
function removeProfile() {
  let profileNode = document.querySelectorAll(".card-panel > p");
  profileNode.forEach((profile) => profile.remove());
}

//***************************/
//**    BUTTONS SECTION   **//
//***************************/
btnCreate.addEventListener("click", function () {
  if (
    firstNameRequiredError === true ||
    lastNameRequiredError === true ||
    emailRequiredError === true ||
    firstName.value === "" ||
    userEmail === ""
  ) {
    alert("Required fields are empty");
  } else if (qrcodeDisplay === true) {
    return;
  } else {
    qrcoddeMsg.style.display = "none";
    inputContainer.classList.add("hidden");
    cardPanel.classList.remove("hidden");
    app.style.transform = "translate(-50%, 4%)";
    makeCode();
    makeCard();
  }
});

// CLEAR BUTTON //
btnCancel.addEventListener("click", function () {
  inputContainer.classList.remove("hidden");
  cardPanel.classList.add("hidden");

  firstName.value = "";
  lastName.value = "";
  userEmail.value = "";
  userTwitter.value = "";
  userGitHub.value = "";
  userData = {};

  qrcodeDisplay = false;
  qrcoddeMsg.style.display = "flex";
  removeCode();
  removeProfile();
});

//export { userData };
