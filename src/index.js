const { getColor } = require('./apiMock');

const Color = require('./classes');

const COLORS = require('./constants').COLORS;
const ALL_COLORS = require('./constants').ALL_COLORS;
const SINGLE_COLOR = require('./constants').SINGLE_COLOR;
const [
    HEX,
    RGB
] = require('./constants').COLOR_CODES;

async function getColors(colors, callback) {
    callback(colors.map(color => {
        return getColor(Color.get(color).name);
    }));
}

async function colors() {
    console.log("DEBUG: ", process.argv);

    let colorCode = process.argv[2].toUpperCase();
    let requestedColors = process.argv.slice(3);

    // Parameters Validation
    if (process.argv.length < 4) {
        throw new ReferenceError('No Colors Are Passed To Fetch Code');
    }
    if (colorCode !== HEX && colorCode !== RGB) {
        throw new ReferenceError(`Color Code Parameter Is Incorrect - ${colorCode}`);
    } else if (requestedColors[0].toLowerCase() === SINGLE_COLOR) {
        let color = await getColor(Color.get(requestedColors[1].toLowerCase()).name);
        console.log(`${colorCode} Code For ${color.name} Is - `, color[colorCode]);
        return;
    } else if (requestedColors.length === 1 && requestedColors[0].toLowerCase() === ALL_COLORS) {
        requestedColors = COLORS;// Since we are not updating using it by ref
    }

    getColors(requestedColors, async function (colorPromises) {
        const filtered = await Promise.all(colorPromises).catch(error => {
            throw new error;
        });

        console.log(filtered.map(color => color[colorCode]));
    });
    console.log('We Are Getting Nice Colors For You.....');
}

colors().catch(error => {
    console.error(error);
});

/*
To run application:
Success - node src/index.js HEX green blue red
Success - node src/index.js RGB White bLuE red
Error   - node src/index.js
Error   - node src/index.js HELLO White blue red
Error   - node src/index.js HEX gRay
Success - node src/index.js RGB ALL
Success - node src/index.js RGB All1
Success - node src/index.js RGB SIngle red
Success - node src/index.js HEX single red
Success - node src/index.js RGB SPam red
Command can be run with any combination of the colours and th output will follow the same order as passed
*/
