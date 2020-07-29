let flagDecode = 0;
const decodeButtonHandler = document.getElementById("decodeOption");
const encodeButtonHandler = document.getElementById("encodeOption");
const leftTextHandler = document.getElementById("plainText");
const rightTextHandler = document.getElementById("encodedText");
const shiftNumberHandler = document.getElementById("shiftValue");
const minusRectangleHandler = document.getElementById("clickableSpanMinus");
const plusRectangleHandler = document.getElementById("clickableSpanPlus");
//if decode option is choosen
decodeButtonHandler.addEventListener("click", () => {
  flagDecode = 1;
  decodeButtonHandler.classList.add("highlight");
  encodeButtonHandler.classList.remove("highlight");
  leftTextHandler.value = rightTextHandler.value;
  decode();
});
//if encode option is choosen
encodeButtonHandler.addEventListener("click", () => {
  flagDecode = 0;
  decodeButtonHandler.classList.remove("highlight");
  encodeButtonHandler.classList.add("highlight");
  leftTextHandler.value = rightTextHandler.value;
  encode();
});
//Increment or decrement Shift Number in the center of the screen
function decrementShift() {
  let shiftNumber = parseInt(shiftNumberHandler.innerHTML);
  if (shiftNumber > 0 && shiftNumber < 27) {
    shiftNumber -= 1;
  }
  shiftNumberHandler.innerHTML = shiftNumber;
}
function incrementShift() {
  let shiftNumber = parseInt(shiftNumberHandler.innerHTML);
  if (shiftNumber >= 0 && shiftNumber < 26) {
    shiftNumber += 1;
  }
  shiftNumberHandler.innerHTML = shiftNumber;
}

function caesarCipher(str, shift) {
  let output = "";
  for (let i = 0; i < str.length; i++) {
    let c = str[i];
    if (c.match(/[a-z]/i)) {
      let code = str.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        c = String.fromCharCode(((code - 65 + shift) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        c = String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
    }
    output += c;
  }
  return output;
}

function encode() {
  let shiftNumber = parseInt(shiftNumberHandler.innerHTML);
  let textToEncode = leftTextHandler.value;
  let encodedText = caesarCipher(textToEncode, shiftNumber);
  rightTextHandler.value = encodedText;
}
function decode() {
  let shiftNumber = parseInt(shiftNumberHandler.innerHTML);
  let textToDecode = leftTextHandler.value;
  let decodedText = caesarCipher(textToDecode, -1 * shiftNumber);
  rightTextHandler.value = decodedText;
}

incrementDecrementShiftFunction = (DOMHandler, encryptionFunction) => {
  DOMHandler.addEventListener("click", () => {
    encryptionFunction();
    if (flagDecode == 1) {
      decode();
    } else {
      encode();
    }
  });
};

incrementDecrementShiftFunction(minusRectangleHandler, decrementShift);
incrementDecrementShiftFunction(plusRectangleHandler, incrementShift);
window.onload = encode;

if (flagDecode == 1) {
  ["keydown", "keyup"].forEach((event) =>
    leftTextHandler.addEventListener(event, encode, false)
  );
} else {
  ["keydown", "keyup"].forEach((event) =>
    leftTextHandler.addEventListener(event, decode, false)
  );
}
