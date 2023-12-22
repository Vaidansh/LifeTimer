let isDOBOpen = false;
let dateOfBirth;

const settingCog = document.getElementById("settingsIcon");
const settingContent = document.getElementById("settingContent");

const initialTextEl = document.getElementById("initialText");
const afterDOBBtnTextEl = document.getElementById("afterDOBBtnText");
const dobButtonEl = document.getElementById("dobButton");
const dobInputEl = document.getElementById("dobInput");

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");

const makeTwoDigitNumber = (number) => {
  return number > 9 ? number : `0${number}`;
};

const toggleDateOfBirthSelector = () => {
  if (isDOBOpen) {
    settingContent.classList.add("hide");
  } else {
    settingContent.classList.remove("hide");
  }

  isDOBOpen = !isDOBOpen;
  console.log("Toggle", isDOBOpen);
};

const updateAge = () => {
  const currentDate = new Date();
  console.log("Differencing the date");
  const dateDiff = currentDate - dateOfBirth;
  const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
  const month = Math.floor((dateDiff / (1000 * 60 * 60 * 24 * 365)) % 12);
  const day = Math.floor(dateDiff / (1000 * 60 * 60 * 24)) % 30;
  const hour = Math.floor(dateDiff / (1000 * 60 * 60)) % 24;
  const minute = Math.floor(dateDiff / (1000 * 60)) % 60;
  const second = Math.floor(dateDiff / 1000) % 60;

  yearEl.innerHTML = makeTwoDigitNumber(year);
  monthEl.innerHTML = makeTwoDigitNumber(month);
  dayEl.innerHTML = makeTwoDigitNumber(day);
  hourEl.innerHTML = makeTwoDigitNumber(hour);
  minuteEl.innerHTML = makeTwoDigitNumber(minute);
  secondEl.innerHTML = makeTwoDigitNumber(second);
};

const localStorageGetter = () => {
  console.log("Getting item");
  const year = localStorage.getItem("year");
  const month = localStorage.getItem("month");
  const day = localStorage.getItem("day");

  if (year && month && day) {
    console.log({ year, day, month });
    dateOfBirth = new Date(year, month, day);
  }

  updateAge();
};

const contentToggler = () => {
  if (dateOfBirth) {
    initialTextEl.classList.add("hide");
    afterDOBBtnTextEl.classList.remove("hide");
    setInterval(() => updateAge(), 1000);
  } else {
    afterDOBBtnTextEl.classList.add("hide");
    initialTextEl.classList.remove("hide");
  }
};

const setDOBHandler = () => {
  const dateString = dobInputEl.value;
  dateOfBirth = dateString ? new Date(dateString) : null;
  // console.log(dateOfBirth);

  console.log({ dateOfBirth });

  if (dateOfBirth) {
    console.log("Setting Item");
    localStorage.setItem("year", dateOfBirth.getFullYear());
    localStorage.setItem("month", dateOfBirth.getMonth());
    localStorage.setItem("day", dateOfBirth.getDay());
  }
  setInterval(() => updateAge(), 1000);
  contentToggler();
};
console.log("Local Storge getting called");
localStorageGetter();

settingCog.addEventListener("click", toggleDateOfBirthSelector);
dobButtonEl.addEventListener("click", setDOBHandler);
