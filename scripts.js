/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;

/**
 * Byrja forrit.
 */
function start() {
  do {
      let ans = window.prompt('Hvort viltu kóða eða afkóða streng? Skrifaðu „kóða“ eða „afkóða“');
      console.log(ans);

      if(ans != "kóða" && ans != "afkóða") {
        window.alert(`Veit ekki hvaða aðgerð ${ans} er.`);
        continue;
      } else {
          let n = window.prompt(`Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]`);
          n = window.parseInt(n);
          console.log(n);
          console.log(typeof n);
          console.log(n>31);
          if(Number.isNaN(n) || !Number.isInteger(n) || n > 31 || n < 0) {
            window.alert(`${n} er ekki heiltala á bilinu [1, 31]. Reyndu aftur.`);

            continue;
          } else {

            let str = window.prompt(`Gefðu upp strenginn sem á að ${ans} með hliðrun ${n}`);
            let correct = true;
            str = str.toUpperCase();

            for(let i = 0; i < str.length; i++) {
              if(LETTERS.indexOf(str[i]) < 0) {
                correct = false;
                console.log(LETTERS.indexOf(str[i]));
              }
            }

            if(!correct) {
              window.alert(`Þú gafst upp stafi sem ekki er hægt að ${ans}`);
              continue;
            } else if(ans == 'kóða') {
              let encodedString = encode(str, n);
              window.alert(`Hér er kóðaði strengurinn ${encodedString}`);
            } else {
              let decodedString = decode(str, n);
              window.alert(`Hér er afkóðaði strengurinn ${decodedString}`);
            }

          }
        }
  } while(true);

}

start();

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
  let temp = "";

  for(let i = 0; i < str.length; i++) {

    let index = LETTERS.indexOf(str[i]);

    temp = temp + LETTERS[(index + n) % LETTERS.length];
  }

  str = temp;

  return str;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  let temp = "";

  for(let i = 0; i < str.length; i++) {

    let index = LETTERS.indexOf(str[i]);

    temp = temp + LETTERS[(((index - n) % LETTERS.length) + LETTERS.length) % LETTERS.length];
  }

  str = temp;

  return str;
}

console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
