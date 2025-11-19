// Initialize
import { BaseConverter } from "@sihuaguofen/base-converter";

const baseConverter = new BaseConverter();

// Variables
const inputBase = document.getElementById("inputBase");
const outputBase = document.getElementById("outputBase");

let regExInput = /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?$/;

const numberInput = document.getElementById("numberInput");
const numberOutput = document.getElementById("numberOutput");

let output = "";

const copyBtn = document.getElementById("copyBtn");
const copyMessage = document.getElementById("copyMessage");

// Events
inputBase.addEventListener("change", function (e) {
  if (e.target.value == 2) {
    numberInput.value = "";
    numberOutput.value = "";
    regExInput = /[01]/;
  }
  if (e.target.value == 8) {
    numberInput.value = "";
    numberOutput.value = "";
    regExInput = /[0-7]/;
  }
  if (e.target.value == 10) {
    numberInput.value = "";
    numberOutput.value = "";
    regExInput = /[0-9]/;
  }
  if (e.target.value == 16) {
    numberInput.value = "";
    numberOutput.value = "";
    regExInput = /[0-9A-Fa-f]/;
  }
});

outputBase.addEventListener("change", function () {
  if (numberInput.value !== "") {
    numberOutput.value = calcOutput();
  } else {
    numberOutput.value = "";
  }
});

numberInput.addEventListener("beforeinput", function (e) {
  const valid = regExInput.test(e.data);
  if (e.inputType != "deleteContentBackward" && !valid) {
    e.preventDefault();
  }
});

numberInput.addEventListener("keyup", function () {
  if (numberInput.value !== "") {
    numberOutput.value = calcOutput();
  } else {
    numberOutput.value = "";
  }
});

document.addEventListener("click", function () {
  console.log({
    numberInput: numberInput.value,
    numberOutput: numberOutput.value,
    inputBase: inputBase.value,
    outputBase: outputBase.value,
    output,
  });
});

copyBtn.addEventListener("click", function () {
  navigator.clipboard.writeText(numberOutput.value);

  copyMessage.textContent = "Copied!";

  setTimeout(() => {
    copyMessage.textContent = "Copy";
  }, 1000);
});

// Functions
function calcOutput() {
  output = baseConverter.convert(numberInput.value.toUpperCase(), {
    fromBase: Number(inputBase.value),
    toBase: Number(outputBase.value),
  });
  return output;
}
