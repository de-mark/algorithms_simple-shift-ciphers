const encryptOrDecrypt = ["e"];
const plainEntry = document.getElementById("usr-plain");
const shiftEntry = document.getElementById("usr-shift");
const resultArea = document.getElementById("res");
const equationArea = document.getElementById("eqn");
const screenArea = document.getElementById("screen");

const alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
               "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
               "U", "V", "W", "X", "Y", "Z"]

const onlyNumberEntry = () =>  {
    shiftEntry.value = shiftEntry.value.replace(/\D/g, "");
}

const toggleEnDecrypt = () => {
    encryptOrDecrypt[0] = encryptOrDecrypt[0] == "e" ? "d" : "e";
}

const displayScreen = () => {
    let thisVal = encryptOrDecrypt[0] == "e" ? "encrypt" : "decrypt";

    screenArea.innerHTML = `
        <button id="btn-${thisVal}" disabled>${thisVal.toUpperCase()}!</button>
    `;

    plainEntry.addEventListener("change", () => {
        if (shiftEntry.value && plainEntry.value) {
            updateEquation();
        }
    })

    shiftEntry.addEventListener("change", () => {
        onlyNumberEntry();
        if (shiftEntry.value && plainEntry.value) {
            updateEquation();
        }
    });

    if (encryptOrDecrypt[0] == "e") {
        document.getElementById("btn-encrypt").addEventListener("click", encryptText);
    } else {
        document.getElementById("btn-decrypt").addEventListener("click", decryptText);
    }
}

const updateEquation = () => {
    let thisButton = encryptOrDecrypt[0] == "e" ? document.getElementById("btn-encrypt"): document.getElementById("btn-decrypt");

    let thisSymbol = encryptOrDecrypt[0] == "e" ? "+" : "-";

    let shiftBy = shiftEntry.value;
    let plaintext = plainEntry.value;
    equationArea.innerHTML = `
        <h3>e(p) = (p ${thisSymbol} ${shiftBy}) mod 26</h3>
        <h5>p = ${plaintext}</h5>
    `;
    thisButton.disabled = false;
}

const encryptText = () => {
    let shiftBy = parseInt(shiftEntry.value);
    let textToEncrypt = plainEntry.value.toUpperCase().split('')
    let nextStep = textToEncrypt.map((p)=> p == " " ? " " : (alpha.indexOf(p) + shiftBy) % 26);
    let shiftedCode = nextStep.map((p)=> p == " " ? " " : alpha[p]).join("");
    resultArea.innerHTML = `
    <div>
        <div>
            <b>Plain text:</b> ${plainEntry.value}
        </div>
        <div>
            <b>Shift By:</b> ${shiftBy}
        </div>
    </div>
    <div>
        <div>
            <b>Code:</b> ${shiftedCode}
        </div>
    </div>
    `
    plainEntry.value = ""
    shiftEntry.value = ""
}

const decryptText = () => {
    let shiftBy = parseInt(shiftEntry.value);
    let textToEncrypt = plainEntry.value.toUpperCase().split('')
    let nextStep = textToEncrypt.map((p)=> p == " " ? " " : (alpha.indexOf(p) - shiftBy) % 26);
    let shiftedCode = nextStep.map((p)=> p == " " ? " " : alpha[p]).join("");
    resultArea.innerHTML = `
    <div>
        <div>
            <b>Plain text:</b> ${plainEntry.value}
        </div>
        <div>
            <b>Shift By:</b> ${shiftBy}
        </div>
    </div>
    <div>
        <div>
            <b>Code:</b> ${shiftedCode}
        </div>
    </div>
    `
    plainEntry.value = ""
    shiftEntry.value = ""
}

displayScreen()