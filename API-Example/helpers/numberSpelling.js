/**
 * Transforma un número de lenght 1 a letra
 * @param {Number}  num : 1
 * @version         1.0.0 - 08-01-2020
 * @author          Nicolás Arias - nicolarias
 * @returns {string} : UN
 */
function Unidades(num) {
  switch (num) {
    case 1:
      return "UN";
    case 2:
      return "DOS";
    case 3:
      return "TRES";
    case 4:
      return "CUATRO";
    case 5:
      return "CINCO";
    case 6:
      return "SEIS";
    case 7:
      return "SIETE";
    case 8:
      return "OCHO";
    case 9:
      return "NUEVE";
  }

  return "";
} //Unidades()

/**
 * Transforma un número de length 2 a letras y agrega a la frase la unidad
 * @param {Number}  num : 1
 * @version         1.0.0 - 08-01-2020
 * @author          Nicolás Arias - nicolarias
 * @returns {string} : UN
 */
function Decenas(num) {
  const decena = Math.floor(num / 10);
  const unidad = num - decena * 10;

  switch (decena) {
    case 1:
      switch (unidad) {
        case 0:
          return "DIEZ";
        case 1:
          return "ONCE";
        case 2:
          return "DOCE";
        case 3:
          return "TRECE";
        case 4:
          return "CATORCE";
        case 5:
          return "QUINCE";
        default:
          return "DIECI" + Unidades(unidad);
      }
    case 2:
      switch (unidad) {
        case 0:
          return "VEINTE";
        default:
          return "VEINTI" + Unidades(unidad);
      }
    case 3:
      return DecenasY("TREINTA", unidad);
    case 4:
      return DecenasY("CUARENTA", unidad);
    case 5:
      return DecenasY("CINCUENTA", unidad);
    case 6:
      return DecenasY("SESENTA", unidad);
    case 7:
      return DecenasY("SETENTA", unidad);
    case 8:
      return DecenasY("OCHENTA", unidad);
    case 9:
      return DecenasY("NOVENTA", unidad);
    case 0:
      return Unidades(unidad);
  }
} //Unidades()

/**
 * Añade un 'Y' para sumar los string de de decenas y unidades
 * @param {string}  strSin : SETENTA
 * @param {Number}  numUnidades : 2
 * @version         1.0.0 - 08-01-2020
 * @author          Nicolás Arias - nicolarias
 * @returns {string} : SETENTA Y DOS
 */
function DecenasY(strSin, numUnidades) {
  if (numUnidades > 0) return strSin + " Y " + Unidades(numUnidades);

  return strSin;
} //DecenasY()

/**
 * Transforma un número de length 3 a letras y agrega a la frase las decenas
 * @param {num}  num : CIEN, numUnidades : 2
 * @version         1.0.0 - 08-01-2020
 * @author          Nicolás Arias - nicolarias
 * @returns {string} : CIENTO DOS
 */
function Centenas(num) {
  const centenas = Math.floor(num / 100);
  const decenas = num - centenas * 100;

  switch (centenas) {
    case 1:
      if (decenas > 0) return "CIENTO " + Decenas(decenas);
      return "CIEN";
    case 2:
      return "DOSCIENTOS " + Decenas(decenas);
    case 3:
      return "TRESCIENTOS " + Decenas(decenas);
    case 4:
      return "CUATROCIENTOS " + Decenas(decenas);
    case 5:
      return "QUINIENTOS " + Decenas(decenas);
    case 6:
      return "SEISCIENTOS " + Decenas(decenas);
    case 7:
      return "SETECIENTOS " + Decenas(decenas);
    case 8:
      return "OCHOCIENTOS " + Decenas(decenas);
    case 9:
      return "NOVECIENTOS " + Decenas(decenas);
  }

  return Decenas(decenas);
} //Centenas()

/**
 * Añade un 'Y' para sumar los string de de decenas y unidades
 * @param {num}  num : 1000006
 * @param {divisor}  divisor : 1000000
 * @param {srtSingular}  srtSingular : UN MILLON DE
 * @param {strPlural}  strPlural : MILLONES DE
 * @version         1.0.0 - 08-01-2020
 * @author          Nicolás Arias - nicolarias
 * @returns {string} : UN MILLON SEIS
 */
function Seccion(num, divisor, strSingular, strPlural) {
  const cientos = Math.floor(num / divisor);
  const resto = num - cientos * divisor;

  letras = "";

  if (cientos > 0)
    if (cientos > 1) letras = Centenas(cientos) + " " + strPlural;
    else letras = strSingular;

  if (resto > 0) letras += "";

  return letras;
} //Seccion()

/**
 * Transforma un número de length 4 a letras
 * @param {num}  num : 1000
 * @version         1.0.0 - 08-01-2020
 * @author          Nicolás Arias - nicolarias
 * @returns {string} : MIL
 */
function Miles(num) {
  divisor = 1000;
  cientos = Math.floor(num / divisor);
  resto = num - cientos * divisor;

  strMiles = Seccion(num, divisor, "MIL", "MIL");
  strCentenas = Centenas(resto);

  if (strMiles == "") return strCentenas;

  return strMiles + " " + strCentenas;
} //Miles()

/**
 * Transforma números de millones a letras y agrega a la frase los demás números
 * @param {num}  num : 1000020
 * @version         1.0.0 - 08-01-2020
 * @author          Nicolás Arias - nicolarias
 * @returns {string} : UN MILLON VEINTE
 */
function Millones(num) {
  divisor = 1000000;
  cientos = Math.floor(num / divisor);
  resto = num - cientos * divisor;

  strMillones = Seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
  strMiles = Miles(resto);

  if (strMillones == "") return strMiles;

  return strMillones + " " + strMiles;
} //Millones()

/**
 * Transforma números a letras usando las demás funciones
 * @param {num}  num : 123
 * @version         1.0.0 - 08-01-2020
 * @author          Nicolás Arias - nicolarias
 * @returns {string} : CIENTO VEINTITRES
 */
function NumeroALetras(num) {
  var data = {
    numero: num,
    enteros: Math.floor(num),
    centavos: Math.round(num * 100) - Math.floor(num) * 100,
    letrasCentavos: "",
    letrasMonedaPlural: "PESOS", //"PESOS", 'Dólares', 'Bolívares', 'etcs'
    letrasMonedaSingular: "PESO", //"PESO", 'Dólar', 'Bolivar', 'etc'

    letrasMonedaCentavoPlural: "PESOS",
    letrasMonedaCentavoSingular: "PESO"
  };

  if (data.centavos > 0) {
    data.letrasCentavos =
      "CON " +
      (function() {
        if (data.centavos == 1)
          return (
            Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular
          );
        else
          return Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
      })();
  }

  if (data.enteros == 0)
    return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
  if (data.enteros == 1)
    return (
      Millones(data.enteros) +
      " " +
      data.letrasMonedaSingular +
      " " +
      data.letrasCentavos
    );
  else
    return (
      Millones(data.enteros) +
      " " +
      data.letrasMonedaPlural +
      " " +
      data.letrasCentavos
    );
} //NumeroALetras()

module.exports = {
  NumeroALetras
};
