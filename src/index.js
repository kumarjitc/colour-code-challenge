const { getColor } = require('./apiMock');

const Color = require('./classes');

const COLORS = require('./constants').COLORS;
const ALL_COLORS = require('./constants').ALL_COLORS;
const [
    HEX,
    RGB
] = require('./constants').COLOR_CODES;

async function getColors(colors, callback) {
    callback(colors.map(color => {
        return getColor(Color.get(color).name);
    }));
}

function colors() {
    console.log("DEBUG: ", process.argv);

    let colorCode = process.argv[2].toUpperCase();
    let requestedColors = process.argv.slice(3);

    // Parameters Validation
    if (process.argv.length < 4) {
        throw new ReferenceError('No Colors Are Passed To Fetch Code');
    } else if (colorCode !== HEX && colorCode !== RGB) {
        throw new ReferenceError(`Color Code Parameter Is Incorrect - ${colorCode}`);
    } else if (requestedColors.length === 1 && requestedColors[0].toLowerCase() === ALL_COLORS) {
        requestedColors = COLORS;// Since we are not updating using it by ref
    }

    getColors(requestedColors, async function (colorPromises) {
        const filtered = await Promise.all(colorPromises);

        console.log(filtered.map(color => color[colorCode]));
    });
}

colors();

/*
To run application:
Success - node src/index.js HEX green blue red
Success - node src/index.js RGB White bLuE red
Error   - node src/index.js
Error   - node src/index.js HELLO White blue red
Error   - node src/index.js HEX gRay
Success - node src/index.js RGB ALL
Success - node src/index.js RGB All1
Command can be run with any combination of the colours and th output will follow the same order as passed
*/
