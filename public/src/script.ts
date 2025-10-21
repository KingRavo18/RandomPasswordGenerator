interface passwordGeneratorTypes {
    generatePassword: () => void,
    copyPassword: () => void,
}

function passwordGenerator(): passwordGeneratorTypes{
    const htmlElement = {
        passwordDisplay: document.getElementById("password") as HTMLElement,
        websiteMain: document.getElementById("website-main") as HTMLElement
    } as const;
    const passwordCharacters = {
        numbers: "0123456789",
        uncapitalisedLetters: "abcdefghijklmnopqrstuvwxyz",
        capitalisedLetters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        specialSymbols: "!@#$%^&*-=_+|?><`~"
    } as const;
    const allSymbols = passwordCharacters.numbers + 
                       passwordCharacters.uncapitalisedLetters + 
                       passwordCharacters.capitalisedLetters + 
                       passwordCharacters.specialSymbols;
    const passwordLength = 15;
    let generatedPassword = "";

    function generatePassword(){  
        const {chosenSymbols, passwordSymbols} = resetValues();
        for(const value of Object.values(passwordCharacters)){
            const characterSet = value.split("");
            chosenSymbols.push(String(characterSet[Math.floor(Math.random() * characterSet.length)]));
        }
        for(let i = 0; i < passwordLength - 4; i++){
            chosenSymbols.push(String(passwordSymbols[Math.floor(Math.random() * passwordSymbols.length)]));
        } 
        chosenSymbols.sort(() => Math.random() - 0.5);
        generatedPassword = chosenSymbols.join("");
        htmlElement.passwordDisplay.style.color = "black";
        htmlElement.passwordDisplay.textContent = generatedPassword
    }

    function resetValues(): {chosenSymbols: string[], passwordSymbols: string[]}{
        const chosenSymbols: string[] = [];
        const passwordSymbols: string[] = allSymbols.split("");
        return {chosenSymbols, passwordSymbols};
    }

    function copyPassword(){
        if(!generatedPassword){
            customResponseMessage("error-message", "Please generate a password first!");
        }else{
            navigator.clipboard.writeText(generatedPassword);
            customResponseMessage("success-message", `${generatedPassword} has been copied!`);
        }
    }

    function customResponseMessage(messageType: string, messageText: string): void{
        const message = document.createElement("div");
        message.classList.add("message");
        message.classList.add(messageType);
        message.classList.add("message-appear-animation");
        message.textContent = messageText;
        htmlElement.websiteMain.appendChild(message);
        setTimeout(() => {
                message.classList.remove("message-appear-animation");
                message.classList.add("message-disappear-animation");
                setTimeout(() => {
                    htmlElement.websiteMain.removeChild(message);  
                }, 300);
        }, 2000);
    }

    return {generatePassword, copyPassword};
}   

const {generatePassword, copyPassword} = passwordGenerator();
(document.getElementById("generate-Btn") as HTMLElement).onclick = () => generatePassword();
(document.getElementById("copy-Btn") as HTMLElement).onclick = () => copyPassword();