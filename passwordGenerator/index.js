const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passworddisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#Uppercase");
const lowercaseCheck = document.querySelector("#Lowercase");
const numbersCheck = document.querySelector("#Numbers");
const symbolsCheck = document.querySelector("#Symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';



let passwordLength =10;

let checkCount = 0;
handleSlider();
//ste strength circle color to grey
setIndicator("#ccc");

// set passwordLength
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

    //for background color in slider
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%";
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 15px 1px ${color}`;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase() {
       return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65,91))
}



function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }

    if (passwordLength>=10 && passwordLength<15 )
    {
        setIndicator("#0f0");

    }

    else if(passwordLength<8){
        setIndicator("#f00");

    }
    else if(passwordLength>15){
        setIndicator("#ff0");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }

    //to make copy  span visible
    copyMsg.classList.add("span");

 setTimeout(() => {
    copyMsg.innerText.remove("span");
 }, 2000);

}

function shufflePassword(array) {
    
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
   for (let i=0;i<array.length;i++)
    {
        str=str+array[i];
    }
    return str;

    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

}

allCheckBox.forEach((checkbox)  =>{
 checkbox.addEventListener('change', handleCheckBoxChange)
}
) ;

inputSlider.addEventListener('input',(e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected



    if(checkCount <= 0)
    {
        return ;
    }
    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    //remove old password

    password = "";
   // an array of function
    let funcArr = [];  // it will put all the functions

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition

    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
        //  to execute a function
    }
    console.log("COmpulsory adddition done");

    // remaining addition

    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);

        password += funcArr[randIndex]();
    }

    console.log("Remaining adddition done");
    //shuffle the password

    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI

    passwordDisplay.value = password;
    console.log("UI adddition done");

    //calculate strength
    calcStrength();

});
