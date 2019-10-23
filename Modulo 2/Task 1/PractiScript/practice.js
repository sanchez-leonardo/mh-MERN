function createInnerTextAppend(element, text, parent) {

    let tag = document.createElement(element)
    tag.innerText = text
    document.getElementById(parent).appendChild(tag)

}

function activityWithButton(text, fn, id, parentID) {
    let oneDiv = document.createElement('div')
    oneDiv.setAttribute('id', id)

    let oneP = document.createElement('p')
    oneP.innerText = text

    let oneButton = document.createElement('button')
    oneButton.innerText = 'PRESS THIS'
    oneButton.addEventListener('click', fn)

    oneDiv.append(...[oneP, oneButton])
    document.getElementById(parentID).appendChild(oneDiv)
}

// Basics

let basics = document.getElementById('basics');

let myName = "Leonardo Sanchez"
console.log(myName)

createInnerTextAppend('p', myName, 'basics')

let myAge = 31
console.log(myAge)

createInnerTextAppend('p', myAge, 'basics')

let ignasiAge = 32;
let ageDiff = ignasiAge - myAge
let phrase = `The age difference between Ignasi and I of ${ageDiff} years.`
console.log(phrase)

createInnerTextAppend('p', phrase, 'basics')

//Conditionals

let act1Text = 'Click to check if ' + myName + ' is old enough:'

activityWithButton(act1Text, adulthood, 'oneDiv', 'conditionals')

function adulthood(e) {

    let result;

    if (myAge > 21) {
        result = 'He is older that 21'
    } else {
        result = 'He is not older that 21'
    }

    createInnerTextAppend('p', result, 'oneDiv')

    e.target.removeEventListener(e.type, arguments.callee);

}

let act2Text = "Click compare Leonardo's and Ignasi's age"

activityWithButton(act2Text, comparing, 'anotherDiv', 'conditionals')

function comparing(e) {
    let result;

    if (ignasiAge > myAge) {
        result = 'Ignasi is older than ' + myName
    } else if (ignasiAge < myAge) {
        result = myName + ' is older than Ignasi'
    } else {
        result = 'They both have the same age'
    }

    createInnerTextAppend('p', result, 'anotherDiv')

    e.target.removeEventListener(e.type, arguments.callee);

}

//Arraying

let namesArr = ["Braian Ezequiel Alderete", "Diego Weinmann", "Facundo Guena", "Juan Pablo Bidabehere", "Juan Pablo López Alurralde", "Leonardo Venezia", "Leonardo Sanchez", "Luciano Hernández", "Luis Alberto Ruiz Diaz", "María Valdez", "Maria Aquino", "María Fernanda Duran Rubio", "María Florencia Mónaco", "María Luna Molina", "Matias Gonzalez", "Miguelangel Parra", "Mitzi Marina Aguero", "Oscar Espinoza", "Sebastian Otero", "Tomás Osorio"];
//Por si surge la curiosidad, fui a la plataforma al listado de miembros de la comision,
//busqué la clase de la celda donde estan los nombres, extraje el texto de cada celda y lo convertí en un array
//Por la ciencia
//let cells = document.getElementsByClassName('cell c0')
//let namesArr = Array.from(cells).map(el => el.innerText)

//Sorting
let sortingDiv = document.getElementById('sorting')

activityWithButton('Check the console as well', sortNlog, 'buttonThingy', 'sorting')

function sortNlog(e) {

    let sortedArray = namesArr.sort()

    let originalArrayText = 'Original Array: ' + namesArr.join(', ')
    createInnerTextAppend('p', originalArrayText, 'sorting');

    let firstElementText = 'First Element: ' + sortedArray[0];
    createInnerTextAppend('p', firstElementText, 'sorting');

    let lastElementText = 'Last Element: ' + sortedArray[sortedArray.length - 1];
    createInnerTextAppend('p', lastElementText, 'sorting')

    for (let i = 0; i < namesArr.length; i++) {
        console.log(namesArr[i]);
    }

    e.target.removeEventListener(e.type, arguments.callee);

}

//Looping
//Funcion de numeros random
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//Array de edades totalmente aleatorio
let agesArr = namesArr.map(name => getRandomInt(18, 30))

//While
let whileText = 'Open the console to see the while thing with while'
activityWithButton(whileText, whilingAges, 'whileDiv', 'looping')

function whilingAges(e) {

    createInnerTextAppend('p', 'Ages Array: ' + agesArr, 'whileDiv')

    let whileIndex = 0

    while (whileIndex <= agesArr.length) {

        if (agesArr[whileIndex] % 2 == 0) {
            console.log(agesArr[whileIndex])
        }

        whileIndex++

    }

    e.target.removeEventListener(e.type, arguments.callee);

}

let whileForText = 'Open the console to see the while thing with for'
activityWithButton(whileForText, whileForAges, 'whileForDiv', 'looping')

function whileForAges(e) {

    createInnerTextAppend('p', 'Ages Array: ' + agesArr, 'whileForDiv')

    for (let i = 0; i < agesArr.length; i++) {

        if (agesArr[i] % 2 == 0) {
            console.log(agesArr[i])
        }

    }

    e.target.removeEventListener(e.type, arguments.callee);
}

//Functions
function create30RandomNumbers() {
    let array = []
    for (let i = 0; i < 30; i++) {
        array.push(getRandomInt(1, 101))
    }

    return array;
}

let randomNumbersArray = create30RandomNumbers()

//Lowest
let minText = 'The minimun from ' + randomNumbersArray;
activityWithButton(minText, minFromArray, 'minFromArray', 'functions')

function minFromArray(e) {

    createInnerTextAppend('p', 'The lowest is: ' + Math.min(...randomNumbersArray), 'minFromArray')

    e.target.removeEventListener(e.type, arguments.callee);

}

//Highest
let maxText = 'The maximun from ' + randomNumbersArray;
activityWithButton(maxText, maxFromArray, 'maxFromArray', 'functions')

function maxFromArray(e) {

    createInnerTextAppend('p', 'The highest is: ' + Math.max(...randomNumbersArray), 'maxFromArray')

    e.target.removeEventListener(e.type, arguments.callee);

}


//Number at a particular index
//No es especificamente lo que pide la tarea pero usa una funcion del array de numeros aleatorios 
//y busca uno de un indice generado aleatoriamente
let indexBasedFunctionText = 'Each click will show you a random number from ' + randomNumbersArray;
activityWithButton(indexBasedFunctionText, randomIndexFunction, 'indexElement', 'functions')

let specialP = document.createElement('p')
specialP.setAttribute('id', 'specialP')
document.getElementById('indexElement').appendChild(specialP);

function randomIndexFunction() {

    let recipient = document.getElementById('specialP');

    let index = getRandomInt(0, randomNumbersArray.length)

    recipient.innerText = 'Value at ' + index + ' is ' + randomNumbersArray[index];
}

//Repeated Numbers
let repeatedNumbersArray = 'Retrieve repeated numbers from ' + randomNumbersArray;
activityWithButton(repeatedNumbersArray, repeatedNumbers, 'repeatedElements', 'functions')

function repeatedNumbers(e) {

    let newArray = []

    for (let i = 0; i < randomNumbersArray.length; i++) {
        for (let j = i + 1; j < randomNumbersArray.length; j++) {

            if ((randomNumbersArray[i] == randomNumbersArray[j]) && (!newArray.includes(randomNumbersArray[i]))) {

                newArray.push(randomNumbersArray[i])

            }
        }
    }

    let repeatedText = 'The repeated numbers, if any, is/are: ' + newArray
    createInnerTextAppend('p', repeatedText, 'repeatedElements')


    e.target.removeEventListener(e.type, arguments.callee);

}

//Join array into string
let myColor = ["Red", "Green", "White", "Black"];

let joinArrayText = 'Join strings in this array: [' + myColor + ']'
activityWithButton(joinArrayText, joinArray, 'joinElements', 'functions')

function joinArray(e) {

    createInnerTextAppend('p', myColor.join(), 'joinElements')

    e.target.removeEventListener(e.type, arguments.callee);

}

//Reverse number
let number = getRandomInt(1000, 10000)

let reverseNumberText = 'Press the button to reverse this number: ' + number
activityWithButton(reverseNumberText, reverseNumber, 'reverseNumber', 'strings')

function reverseNumber(e) {

    let reversedNumber = 'The number reversed is: ' + parseInt(number.toString().split('').reverse().join(''))
    createInnerTextAppend('p', reversedNumber, 'reverseNumber')

    e.target.removeEventListener(e.type, arguments.callee);
}

//Reverse string
let string = 'webmaster'

let orderedStringText = 'Press the button to order: ' + string
activityWithButton(orderedStringText, orderString, 'orderString', 'strings')

function orderString(e) {

    let orderedString = 'The String ordered is: ' + string.toString().split('').sort().join('')
    createInnerTextAppend('p', orderedString, 'orderString')

    e.target.removeEventListener(e.type, arguments.callee);
}

//Uppercasing
let phraseToCapitalize = 'prince of persia: warrior within'

let uppercasingText = 'The phrase to be uppercased is: ' + phraseToCapitalize
activityWithButton(uppercasingText, upperCaseAPhrase, 'upperCaseAPhrase', 'strings')

function upperCaseAPhrase(e) {

    let words = phraseToCapitalize.split(' ')

    let transformedPhraseArray = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

    createInnerTextAppend('p', transformedPhraseArray, 'upperCaseAPhrase')

    e.target.removeEventListener(e.type, arguments.callee);

}

//Find longest word

let phraseWithLongWords = 'Web Development Tutorial'

let findAWordText = 'Press the button to get the longest word in: ' + phraseWithLongWords
activityWithButton(findAWordText, findLongest, 'longestWord', 'strings')

function findLongest(e) {


    let tempArray = phraseWithLongWords.split(' ')

    let longest = tempArray.reduce((acc, val) => val.length > acc.length ? val : acc, '')

    createInnerTextAppend('p', 'The longest word is: ' + longest, 'longestWord')

    e.target.removeEventListener(e.type, arguments.callee);

}