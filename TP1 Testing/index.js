export {
    pinCode,
    calculateVolume,
    calculateCentury,
    calculateLiters,
    rockPaperScissors,
    addressValidator,
};

const pinCode = (pin) => {
    const pinRegex = /^\d{4}$|^\d{6}$/; // Expresion regular que verifica si el numero tiene 4 o 6 digitos
    return pinRegex.test(pin);
};

const calculateVolume = (height, diameter) => {
    const centimeterRegex = /^\d{3}$/; // Expresion regular que detecta si el numero esta en centimetros, es decir 3 digitos equivale a centimetros
    const noNegativeNumbers = /^(?!.*-).+$/; // Expresion regular que no permite el simbolo "-" en ninguna parte de la expresion
    const noLettersAllowed = /^(?!.*[a-zA-Z]).+$/; // Expresion regular que no permite letras minusculas ni mayusculas

    if (
        !noNegativeNumbers.test(diameter) ||
        !noLettersAllowed.test(height) ||
        !noLettersAllowed.test(diameter) ||
        height === 0 ||
        diameter === 0
    ) {
        return false;
    } else {
        if (centimeterRegex.test(height)) {
            height = height / 100;
        }
        if (centimeterRegex.test(diameter)) {
            diameter = diameter / 100;
        }

        const volume = Math.PI * Math.pow(height, 2) * (diameter / 2);
        const liters = volume * 1000;
        return Math.round(liters, 2);
    }
};

const calculateLiters = (hour) => {
    const digitRegex = /^[1-9]\d*(\.\d+)?$/; // Expresion regular que permite numeros del 1 al 9, donde pueden ser numeros de dos o mas digitos y tambien pueden ser numeros con decimales
    const litersPerOneHour = 0.5;
    if (digitRegex.test(hour)) {
        return Math.floor(hour * litersPerOneHour);
    } else {
        return false;
    }
};

const calculateCentury = (year) => {
    const afterChristRegex = /^\d{4}$/; // Expresion regular para saber si un siglo es despues de cristo
    const beforeChristRegex = /^\d{3}$/; // Expresion regular para saber si un siglo es antes de cristo

    if (afterChristRegex.test(year)) {
        let afterChristCentury = Math.ceil(year / 100);
        return afterChristCentury + " a.C";
    } else if (beforeChristRegex.test(year)) {
        let beforeChristCentury = Math.ceil(year / 100);
        return beforeChristCentury + " b.C";
    } else {
        return false;
    }
};

const rockPaperScissors = (firstHand, secondHand) => {
    const regex = /^(piedra|papel|tijera)$/;
    firstHand = firstHand.toLowerCase();
    secondHand = secondHand.toLowerCase();

    if (regex.test(firstHand) && regex.test(secondHand)) {
        if (firstHand === secondHand) {
            return "Empate";
        }

        switch (firstHand) {
            case "piedra":
                switch (secondHand) {
                    case "tijera":
                        return "Jugador 1 gana";
                    case "papel":
                        return "Jugador 2 gana";
                }
                break;

            case "papel":
                switch (secondHand) {
                    case "piedra":
                        return "Jugador 1 gana";
                    case "tijera":
                        return "Jugador 2 gana";
                }
                break;

            case "tijera":
                switch (secondHand) {
                    case "papel":
                        return "Jugador 1 gana";
                    case "piedra":
                        return "Jugador 2 gana";
                }
                break;
        }
    } else {
        return false;
    }
};

const addressValidator = (address) => {
    // Si ingreso un parametro que no sea un objeto o que sea un objeto nulo, retorno falso
    if (typeof address !== "object" || address === null) {
        return false;
    }

    // Creo un array con los campos obligatorios con los tipos que se espera que tenga cada campo
    const requiredFields = [
        { field: "street", type: "string" },
        { field: "number", type: "number" },
        { field: "zip_code", type: "number" },
        { field: "city", type: "string" },
        { field: "province", type: "string" },
    ];

    /* Recorro la direccion que paso como parametro, accedo a su respectivo campo, es decir address[street] es lo mismo que address.street
    una vez que accedo, compruebo si el tipo de valor de address es distinto a su tipo esperado, en caso de ser distinto, retorno false
    luego, en caso de que se ingrese un valor que no sea string, lo paso a un string, le quito los espacios al principio y al final y 
     verifico que no este vacio, en caso de estarlo retorno false */
    for (const { field, type } of requiredFields) {
        if (
            typeof address[field] !== type ||
            address[field].toString().trim() === ""
        ) {
            return false;
        }
    }

    return true;
};
