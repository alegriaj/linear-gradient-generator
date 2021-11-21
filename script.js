var css = document.querySelector('h3');
var color1 = document.querySelector('.color1');
var color2 = document.querySelector('.color2');
var body = document.getElementById('gradient');

function setGradient() {
  body.style.background =
    'linear-gradient(to right, ' + color1.value + ', ' + color2.value + ')';

  css.textContent = body.style.background + ';';
}

function extractColors(rgb) {
  let colors = [];
  for (let item of rgb[0].matchAll(/\d+/g)) colors.push(Number(item[0]));
  return colors;
}

function getInitialGradientColors() {
  let gcsb = getComputedStyle(body).background;

  let rgbstrings = [];
  for (let item of gcsb.matchAll(/rgb(\(.+?)\)/g)) rgbstrings.push(item[0]);

  let colors = [];
  for (let item of rgbstrings[0].matchAll(/\d+/g)) colors.push(Number(item[0]));

  let [r1, g1, b1] = colors;
  color1.value = rgbToHex(r1, g1, b1);

  colors = [];
  for (let item of rgbstrings[1].matchAll(/\d+/g)) colors.push(Number(item[0]));

  [r1, g1, b1] = colors;
  color2.value = rgbToHex(r1, g1, b1);
  setGradient();
}

function componentToHex(c) {
  return c.toString(16).padStart(2, '0');
}

function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

color1.addEventListener('input', setGradient);
color2.addEventListener('input', setGradient);

getInitialGradientColors();
