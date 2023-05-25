const readlineSync = require("readline-sync");

let exitLoop = false; // Indica se o loop deve ser encerrado
let errorCount = 0; // Contador de erros

while (!exitLoop) {
  console.log("Digite uma palavra ou tecle enter para sair:");
  let inputString = readlineSync.question(); // Entrada do usuário
  const maxTokenLength = 10;

  // Verifica se o comprimento da string excede o limite máximo de tokens.
  if (inputString.length > maxTokenLength) {
    inputString = inputString.substring(0, maxTokenLength);
  }

  if (inputString === "") {
    // Se a entrada for vazia, encerra o loop
    exitLoop = true;
    continue;
  }

  const validCharsRegex = /^[a-ik-vx-zA-IK-VX-Z0-9\/\(\)\&a\$\#\@c\!]+$/;

  if (!validCharsRegex.test(inputString)) {
    // Verifica se a entrada contém caracteres inválidos
    console.log(
      `${errorCount++} =>`,
      `'${inputString}' não passou na validação. As letras [j, w, k, y, G, h, q] e as demais entradas especiais [/, (), &, a, $, #, @, !] não são permitidas pelo sistema.\n`
    );
  }

  const lexicalRegex =
    /^(?:[b-df-hj-np-tv-z][aeiou](?:[b-df-hj-np-tv-z][aeiou])*[b-df-hj-np-tv-z0-9]*|.*[0-9])$/;

  if (!lexicalRegex.test(inputString)) {
    // Verifica se a entrada atende aos critérios léxicos
    console.log(
      `${errorCount++} =>`,
      `A cadeia de caracteres fornecida não atende aos critérios do conjunto léxico aceito em cadeias (strings):\n- As palavras devem sempre começar com letras consoantes válidas e alternar entre consoantes e vogais.\n- São permitidas strings terminadas em algarismos numéricos.\n- Não são aceitas palavras compostas por digrafos de consoantes e algarismos numéricos no meio da cadeia.\n`
    );
  }

  const reservedWordsRegex = /^[zex]/i;

  if (reservedWordsRegex.test(inputString)) {
    // Verifica se a palavra começa com as letras reservadas
    console.log(
      `${errorCount++} =>`,
      `A palavra iniciada com '${inputString[0]}' é uma palavra reservada pelo sistema.\n`
    );
  }

  if (
    validCharsRegex.test(inputString) &&
    lexicalRegex.test(inputString) &&
    !reservedWordsRegex.test(inputString)
  )
    // Se a entrada passar por todas as verificações, a análise léxica é concluída
    console.log(
      `'${inputString}' atendeu a todos critérios, análise léxica concluída.\n`
    );
  else {
    console.log(
      `'${inputString}' não atendeu a todos critérios, falha na análise léxica.\n`
    );
  }
}
