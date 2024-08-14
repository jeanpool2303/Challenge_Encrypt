const texto = document.getElementById('texto');
const resultado = document.getElementById('resultado');
const tituloMensaje = document.getElementById('titulo-mensaje');
const parrafo = document.getElementById('parrafo');
const muñeco = document.getElementById('muñeco');
const btnEncriptar = document.getElementById('btn-encriptar');
const btnDesencriptar = document.getElementById('btn-desencriptar');
const btnCopiar = document.getElementById('btn-copiar');

const encryptionMap = {
  'e': 'enter',
  'i': 'imes',
  'a': 'ai',
  'o': 'ober',
  'u': 'ufat'
};

texto.addEventListener('input', validateInput);
btnEncriptar.addEventListener('click', () => processText(true));
btnDesencriptar.addEventListener('click', () => processText(false));
btnCopiar.addEventListener('click', copiarTexto);

function validateInput() {
  this.value = this.value.toLowerCase().replace(/[^a-z\s]/g, '');
}

function processText(isEncrypt) {
  const text = texto.value;
  if (!text) {
    showAlert("Debes ingresar un texto", "error");
    return;
  }

  const processedText = isEncrypt ? encrypt(text) : decrypt(text);
  showResult(processedText, isEncrypt);
}

function encrypt(text) {
  return text.replace(/[aeiou]/g, letter => encryptionMap[letter]);
}

function decrypt(text) {
  let decrypted = text;
  Object.entries(encryptionMap).forEach(([key, value]) => {
    decrypted = decrypted.replaceAll(value, key);
  });
  return decrypted;
}

function showResult(text, isEncrypt) {
  resultado.value = text;
  tituloMensaje.textContent = `Texto ${isEncrypt ? 'encriptado' : 'desencriptado'} con éxito`;
  parrafo.textContent = "";
  muñeco.style.display = 'none';
  resultado.style.display = 'block';
  btnCopiar.style.display = 'block';
}

function copiarTexto() {
  resultado.select();
  document.execCommand('copy');
  showAlert("El texto ha sido copiado al portapapeles", "success");
}

function showAlert(message, icon) {
  swal({
    title: icon === "error" ? "Ooops!" : "¡Éxito!",
    text: message,
    icon: icon,
    button: "OK",
  });
}