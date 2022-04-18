const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const alteredColor = document.getElementById('alteredColor');
const alteredColorText = document.getElementById('alteredColorText');
const slider = document.getElementById('slider');
const sliderText = document.getElementById('sliderText');

const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', (e) => {
	if (toggleBtn.classList.contains('toggled')) {
		toggleBtn.classList.remove('toggled');
		lightenText.classList.remove('unselected');
		darkenText.classList.add('unselected');
	} else {
		toggleBtn.classList.add('toggled');
		lightenText.classList.add('unselected');
		darkenText.classList.remove('unselected');
	}
	reset();
});

// Check the input from the user to see if it's a valid hex color
// the length should be either 3 or 6 characters
hexInput.addEventListener('keyup', () => {
	const hex = hexInput.value;
	if (!isValidHex(hex)) return;

	const strippedHex = hex.replace('#', '');
	inputColor.style.backgroundColor = '#' + strippedHex;
	reset();
});

const isValidHex = (hex) => {
	if (!hex) return false;
	const strippedHex = hex.replace('#', '');
	return strippedHex.length === 3 || strippedHex.length === 6;
};

//Create a function to convert Hex to RGB
const convertHexToRGB = (hex) => {
	if (!isValidHex(hex)) return null;

	let strippedHex = hex.replace('#', '');
	if (strippedHex.length === 3) {
		strippedHex =
			strippedHex[0] + strippedHex[0] + strippedHex[1] + strippedHex[1] + strippedHex[2] + strippedHex[2];
	}
	const r = parseInt(strippedHex.substring(0, 2), 16);
	const g = parseInt(strippedHex.substring(2, 4), 16);
	const b = parseInt(strippedHex.substring(4, 6), 16);
	return {
		r: r,
		g: g,
		b: b
	};
};

// Create a function that converts RGB to Hex
// I need 3 parameters, and for each r,g,b I need to createa hex pair that's 2 characters long
// I need to return a hex value that starts with a hashtag
const convertRGBToHex = (r, g, b) => {
	const firstPair = ('0' + r.toString(16)).slice(-2);
	const secondPair = ('0' + g.toString(16)).slice(-2);
	const thirdPair = ('0' + b.toString(16)).slice(-2);
	const hex = '#' + firstPair + secondPair + thirdPair;
	return hex;
};

// create a function that accepts hex value and percentage
// convert hex to rgb
// increase rgb value by appropiate amout(% of 255)
// use new rgb value to convert to hex value
// return the hex value
const alterColor = (hex, percentage) => {
	const { r, g, b } = convertHexToRGB(hex);

	const amount = Math.floor(percentage / 100 * 255);

	const newR = increseWithin0To255(r, amount);
	const newG = increseWithin0To255(g, amount);
	const newB = increseWithin0To255(b, amount);

	return convertRGBToHex(newR, newG, newB);
};

const increseWithin0To255 = (hex, amount) => {
	const newHex = hex + amount;
	if (newHex > 255) return 255;
	if (newHex < 0) return 0;
	return newHex;
};

// Slider - update the altered color
slider.addEventListener('input', () => {
	if (!isValidHex(hexInput.value)) return;

	sliderText.textContent = `${slider.value}%`;

	const valueAddition = toggleBtn.classList.contains('toggled') ? -slider.value : slider.value;
	const alteredHex = alterColor(hexInput.value, valueAddition);
	alteredColor.style.backgroundColor = alteredHex;
	alteredColorText.innerText = `Altered Color ${alteredHex}`;
});

const reset = () => {
	slider.value = 0;
	sliderText.innerText = `0%`;
	alteredColor.style.backgroundColor = hexInput.value;
	alteredColorText.innerText = `Altered Color ${hexInput.value}`;
};
