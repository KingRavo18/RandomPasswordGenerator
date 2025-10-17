function PasswordGenerator(){
    const passwordDisplay: HTMLElement | null = document.getElementById("password");
    const numbers: string = "0123456789";
    const uncapitalisedLetters: string = "abcdefghijklmnopqrstuvwxyz";
    const capitalisedLetters: string = uncapitalisedLetters.toUpperCase();
    const specialSymbols: string = "!@#$%^&*-=_+\|?><`~";
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
            return console.log("Please generate a password first!");
        }
        navigator.clipboard.writeText(generatedPassword);
        //Create a succesful password copy message
        //Create a failed password copy message
    }
    
    return {generate, copyPassword};
}   

const {generate, copyPassword} = PasswordGenerator();
(document.getElementById("generate-Btn") as HTMLElement).onclick = () => generate();
(document.getElementById("copy-Btn") as HTMLElement).onclick = () => copyPassword();