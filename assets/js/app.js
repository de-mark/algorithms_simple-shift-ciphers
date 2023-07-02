const resultArea = document.getElementById("res");
const plainEntry = document.getElementById("usr-plain");
const shiftEntry = document.getElementById("usr-shift");
const encryptBtn = document.getElementById("btn-encrypt");

const alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
               "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
               "U", "V", "W", "X", "Y", "Z"]

const onlyNumberEntry = () =>  {
    shiftEntry.value = shiftEntry.value.replace(/\D/g, "");
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


shiftEntry.addEventListener("change", onlyNumberEntry);
encryptBtn.addEventListener("click", encryptText);