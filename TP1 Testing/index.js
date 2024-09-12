export{
    pinCode,
    calculateVolume,
    calculateCentury,
    calculateLiters
}
const pinCode = (pin) => {
    const pinRegex = /^\d{4}$|^\d{6}$/; //Expresion regular que verifica si el numero tien 4 o 6 digtos
    return pinRegex.test(pin);
}

const calculateVolume = (height, diameter) => {
    const centimeterRegex = /^\d{3}$/; //Expresion regular que detecta si el numero esta en centimetros, es decir 3 digitos equivale a centimetros
    const noNegativeNumbers = /^(?!.*-).+$/; //Expresion regular que no permite el simbolo "-" en ninguna parte de la expresion
    const noLettersAllowed = /^(?!.*[a-zA-Z]).+$/ //Expresion regular que no permite letras minusculas ni mayusculas

    if (!noNegativeNumbers.test(diameter) || !noLettersAllowed.test(height) || !noLettersAllowed.test(diameter) || height === 0 || diameter === 0) {
        return false;
    } else {
        if (centimeterRegex.test(height)) {
            height = height / 100;
        }
        if (centimeterRegex.test(diameter)){
            diameter = diameter / 100;
        }
    
        const volume = Math.PI * Math.pow(height, 2) * (diameter / 2);
        const liters = (volume * 1000);
        return Math.round(liters,2);
    }
}

const calculateLiters = (hour) => {
    const digitRegex = /^[1-9]\d*(\.\d+)?$/ //Expresion regular que permite numeros del 1 al 9, donde pueden ser numeros de dos o mas digitos y tambien pueden ser numeros con decimales
    const litersPerOneHour = 0.5;
    if (digitRegex.test(hour)) {
        return Math.floor(hour*litersPerOneHour)
    } else {
        return false
    }
}

const calculateCentury = (year) => {
    const afterChristRegex = /^\d{4}$/; //Expresion regular para saber si un siglo es despues de cristo
    const beforeChristRegex = /^\d{3}$/; //Expersion regular para saber si un siglo es antes de cristo

    if (afterChristRegex.test(year)) {
        let afterChristCentury = Math.ceil(year/100);
        return afterChristCentury + " a.C";
    } else if (beforeChristRegex.test(year)) {
        let beforeChristCentury = Math.ceil(year/100);
        return beforeChristCentury + " b.C";
    } else {
        return false;
    }
}