function PasswordGenerator() {
    const passwordDisplay = document.getElementById("password");
    const numbers = "0123456789";
    const uncapitalisedLetters = "abcdefghijklmnopqrstuvwxyz";
    const capitalisedLetters = uncapitalisedLetters.toUpperCase();
    const specialSymbols = "!@#$%^&*-=_+\|?><`~";
    const allSymbols = numbers + uncapitalisedLetters + capitalisedLetters + specialSymbols;
    const passwordLength = 15;
    let generatedPassword;
    function generate() {
        const { chosenSymbols, passwordSymbols } = resetValues();
        for (let i = 0; i < passwordLength; i++) {
            chosenSymbols.push(String(passwordSymbols[Math.floor(Math.random() * passwordSymbols.length)]));
        }
        generatedPassword = chosenSymbols.join("");
        passwordDisplay.style.color = "black";
        passwordDisplay.textContent = generatedPassword;
    }
    function resetValues() {
        passwordDisplay.textContent = "";
        const chosenSymbols = [];
        const passwordSymbols = allSymbols.split("");
        return { chosenSymbols, passwordSymbols };
    }
    function copyPassword() {
        if (!generatedPassword) {
            return console.log("Please generate a password first!");
        }
        navigator.clipboard.writeText(generatedPassword);
        //Create a succesful password copy message
        //Create a failed password copy message
    }
    return { generate, copyPassword };
}
const { generate, copyPassword } = PasswordGenerator();
document.getElementById("generate-Btn").onclick = () => generate();
document.getElementById("copy-Btn").onclick = () => copyPassword();
export {};
//# sourceMappingURL=script.js.map