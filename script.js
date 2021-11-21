var css = document.querySelector('h3');
var color1 = document.querySelector('.color1');
var color2 = document.querySelector('.color2');
var randomize = document.querySelector('.randomize');
var body = document.getElementById('gradient');

function setGradient() {
  body.style.background =
    'linear-gradient(to right, ' + color1.value + ', ' + color2.value + ')';

  css.textContent = body.style.background + ';';
}

function extractColors(rgb) {
  let colors = [];
  for (let [item, ...rest] of rgb.matchAll(/\d+/g)) {
    colors.push(Number(item));
  }
  return colors;
}

function getRgbStrings() {
  const gcsb = getComputedStyle(body).background;

  const rgbStrings = [];
  for (let [item, ...rest] of gcsb.matchAll(/rgb(\(.+?)\)/g)) {
    rgbStrings.push(item);
  }
  return rgbStrings;
}

function setInitialGradientColors() {
  const [rgbColor1, rgbColor2] = getRgbStrings();

  color1.value = rgbToHex(...extractColors(rgbColor1));
  color2.value = rgbToHex(...extractColors(rgbColor2));

  setGradient();
}

function rgbToHex(...colors) {
  return '#' + colors.map((c) => c.toString(16).padStart(2, '0')).join('');
}

function getRandomRgb() {
  let colors = [];
  for (let i = 0; i < 3; i++) {
    colors.push(Math.trunc(Math.random() * 255 + 1));
  }
  return colors;
}

function onRandomize() {
  color1.value = rgbToHex(...getRandomRgb());
  color2.value = rgbToHex(...getRandomRgb());
  setGradient();
}

color1.addEventListener('input', setGradient);
color2.addEventListener('input', setGradient);
randomize.addEventListener('click', onRandomize);

setInitialGradientColors();
