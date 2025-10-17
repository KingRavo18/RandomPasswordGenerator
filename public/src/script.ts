function PasswordGenerator(){
    const passwordDisplay: HTMLElement | null = document.getElementById("password");
    const numbers: string = "0123456789";
    const uncapitalisedLetters: string = "abcdefghijklmnopqrstuvwxyz";
    const capitalisedLetters: string = uncapitalisedLetters.toUpperCase();
    const specialSymbols: string = "!@#$%^&*-=_+|?><`~";
    const allSymbols: string = numbers + uncapitalisedLetters + capitalisedLetters + specialSymbols;
    const passwordLength: number = 15;
    let generatedPassword: string;

    function generate(): void{  
        const {chosenSymbols, passwordSymbols} = resetValues();
        for(let i = 0; i < passwordLength; i++){
            chosenSymbols.push(String(passwordSymbols[Math.floor(Math.random() * passwordSymbols.length)]));
        }   
        generatedPassword = chosenSymbols.join("");
        (passwordDisplay as HTMLElement).style.color = "black";
        (passwordDisplay as HTMLElement).textContent = generatedPassword
    }
    function resetValues(){
        (passwordDisplay as HTMLElement).textContent = "";
        const chosenSymbols: string[] = [];
        const passwordSymbols: string[] = allSymbols.split("");
        return {chosenSymbols, passwordSymbols};
    }

    function copyPassword(){
        if(!generatedPassword){
            return customResponseMessage("error-message", "Please generate a password first!");
        }
        navigator.clipboard.writeText(generatedPassword);
        customResponseMessage("success-message", `${generatedPassword} has been copied!`);
    }
    function customResponseMessage(messageType: string, messageText: string){
        const message: HTMLElement = document.createElement("div");
        message.classList.add("message");
        message.classList.add(messageType);
        message.classList.add("message-appear-animation");
        message.textContent = messageText;
        (document.getElementById("website-main") as HTMLElement).appendChild(message);
        setTimeout(() => {
                message.classList.remove("message-appear-animation");
                message.classList.add("message-disappear-animation");
                setTimeout(() => {
                    (document.getElementById("website-main") as HTMLElement).removeChild(message);  
                }, 300);
        }, 2000);
        
    }

    return {generate, copyPassword};
}   

const {generate, copyPassword} = PasswordGenerator();
(document.getElementById("generate-Btn") as HTMLElement).onclick = () => generate();
(document.getElementById("copy-Btn") as HTMLElement).onclick = () => copyPassword();