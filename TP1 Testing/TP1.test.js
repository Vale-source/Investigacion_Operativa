import {test, expect} from "bun:test";
import { 
    pinCode,
    calculateVolume,
    calculateCentury,
    calculateLiters,
    rockPaperScissors,
    addressValidator
    
} from './index.js';


//Ejercicio 1
const pin = "123456";
test("Validar si el PIN bancario devuelve verdadero", () => {
    expect(pinCode(pin)).toBe(true);
});

test("Validar si el PIN bancario no es Null", () => {
    expect(pinCode(pin)).not.toBeNull();
});

test("Validar si el PIN esta definido", () => {
    expect(pinCode(pin)).toBeDefined();
});

test("Validar si la longitud del PIN es 6 digitos", () => {
    expect(pin).toHaveLength(6);
});
test("Validar si la longitud del PIN es 4 digitos", () => {
    expect("1234").toHaveLength(4);
});

test("Validar si el PIN contiene letras, simbolos o espacio", () => { //Para probar si funciona bien la expresion regular
    expect(pinCode("1234Ad& ")).toBe(false);
});

//Ejercicio 2
test("Corroborar que la funcion es correcta", () => {
    expect(calculateVolume(3,5)).toBe(70686);
});

test("Corrobrar que la entrada sea en centimetros", () => {
    expect(calculateVolume(300,500)).toBe(70686);
});

test("Corrobrar que la alutra sea en centimetros y el diametro en metros", () => {
    expect(calculateVolume(300,5)).toBe(70686);
});

test("Corrobrar que la alutra sea en metros y el diametro en centimetros", () => {
    expect(calculateVolume(3,500)).toBe(70686);
});

test("Corroborar si calcular el volumen con valores negativos arroja un error", () => {
    expect(calculateVolume(3, -5)).toBe(false);
});

test("Corroborar si calcular el volumen con la altura negativa arroja un error", () => { //Matematicamente no deberia ya que todo numero negativo elevado al cuadrado da positivo
    expect(calculateVolume(-3, 5)).toBe(70686);
});

test("Corroborar que no se permitan letras", () => {
    expect(calculateVolume("abc", 5 + "def")).toBe(false);
});

test("Corroborar que se permita una altura y un diametro de valor 0", () => {
    expect(calculateVolume(0, 0)).toBeFalse;
});

//Ejercicio 3
test("Verificar que la funcion ande", () => {
    expect(calculateLiters(6.7)).toBe(3);
});

test("Verificar que no se acepten letras", () => {
    expect(calculateLiters("abcdefg")).toBeFalse;
});

test("Verificar que no se acepten valores negativos", () => {
    expect(calculateLiters(-8)).toBeFalse;
});

test("Verificar que no se permita el valor 0", () => {
    expect(calculateLiters(0)).toBeFalse;
});

test("Verificar que no se permita no enviar un parametro a la funcion", () => {
    expect(calculateLiters()).toBeFalse;
});

test("Verificar que no se permita que el parametro sea 'null'", () => {
    expect(calculateLiters(null)).not.toBeNull;
})


//Ejercicio 4
test("Corroborar que el año sea antes de Cristo", () => {
    expect(calculateCentury(304)).toBe(4 + " b.C");
});

test("Corroborar que el año sea despues de Cristo", () => {
    expect(calculateCentury(2024)).toBe(21 + " a.C");
});

test("Corroborar que no se permitan letras", () => {
    expect(calculateCentury("abc")).toBeFalse;
});

test("Corroborar que el redondeo funcione", () => {
    expect(calculateCentury(1786)).not.toBe(17 + " a.C");
});

test("Corroborar que no se permiten numeros de un solo digito", () => {
    expect(calculateCentury(1)).toBeFalse;
});

test("Corroborar que el resultado 'pueda' ser falso", () => { //No entendia la diferencia entre toBeFalse y toBeFalsy asi que probe
    expect(calculateCentury(1900)).toBeFalsy;
});



//Ejercicio 5
test("Prueba de empate", () => {
    expect(rockPaperScissors("piedra","piedra")).toBe("Empate");
    });

test("Verificar que el jugador 1 gane", () => {
    expect(rockPaperScissors("piedra","tijera")).toBe("Jugador 1 gana");
    expect(rockPaperScissors("tijera","papel")).toBe("Jugador 1 gana");
});

test("Verificar que el jugador 2 gane", () => {
    expect(rockPaperScissors("tijera","piedra")).toBe("Jugador 2 gana");
    expect(rockPaperScissors("papel","tijera")).toBe("Jugador 2 gana");
});

test("Corroborar que no se pueda ingresar valores distintos a piedra, papel o tijeras", () => {
    expect(rockPaperScissors("auto","avion")).toBeFalse;
    expect(rockPaperScissors("tijeras","avion")).toBeFalse;
    expect(rockPaperScissors("auto","papel")).toBeFalse;

})

test("Corroborar que no se pueda ingresar strings vacios o con espacios", () => {
    expect(rockPaperScissors(""," ")).toBeFalse;
})

//Ejercicio 6
test("Corroborar que devuelva true si la direccion es valida", () => {
    const address = {
        street: "Avenida San Martin",
        number: 658,
        zip_code: 5500,
        city: "Godoy Cruz",
        province: "Mendoza"
        };
        expect(addressValidator(address)).toBeTrue
    }
)

test("Corroborar que la direccion no sea un objeto", () => {
    expect(addressValidator("string")).toBeFalse;
    expect(addressValidator(123)).toBeFalse;
})

test("Corroborar que la direccion no sea null", () => {
    expect(addressValidator(null)).toBeFalse;
})

test("Corroborar que devuelva false si falta un campo obligatorio", () => {
    const addressWithoutStreet = {
        number: 658,
        zip_code: 5500,
        city: "Godoy Cruz",
        province: "Mendoza"
        };
    expect(addressValidator(addressWithoutStreet)).toBeFalse;
})

test("Corroborar si hay un tipo de dato erroneo en un campo", () => {
    const wrongAddress = {
        street: 78541,
        number: 658,
        zip_code: 5500,
        city: "Godoy Cruz",
        province: "Mendoza"
        };
    expect(addressValidator(wrongAddress)).toBeFalse;
})

test("Corroborar si un campo obligatorio contiene espacios", () => {
    const wrongAddress = {
        street: "Avenida San Martin",
        number: "   ",
        zip_code: 5500,
        city: "Godoy Cruz",
        province: "Mendoza"
        };
    expect(addressValidator(wrongAddress)).toBeFalse;
})

test("Corroborar si un campo obligatorio esta vacio", () => {
    const wrongAddress = {
        street: "Avenida San Martin",
        number: 658,
        zip_code: 5500,
        city: "",
        province: "Mendoza"
        };
    expect(addressValidator(wrongAddress)).toBeFalse;
})