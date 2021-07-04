const [
	GREEN,
	RED,
	BLUE,
	WHITE,
	BLACK
] = require('./constants').COLORS;

class Color {
	constructor(name) {
		this.name = name
	}

	/**
	 * This is a spread approach; But good for this problem
	 * This static method is used as an loader method
	 * Individual colour classes are kept assuming there could be other properties for colours
	 * With TypeScript Color will be an abstract class; 
	 */
	static get(color) {
		switch (color.toLowerCase()) {
			case GREEN:
				return new Green();
			case RED:
				return new Red();
			case BLUE:
				return new Blue();
			case WHITE:
				return new White();
			case BLACK:
				return new Black();
			default:
				throw new ReferenceError(`Color Not Available In API - ${color}`);
		}
	}
}

class Green extends Color {
	constructor() {
		super('green');
	}
}

class Blue extends Color {
	constructor() {
		super('blue');
	}
}

class Red extends Color {
	constructor() {
		super('red');
	}
}

class White extends Color {
	constructor() {
		super('white');
	}
}

class Black extends Color {
	constructor() {
		super('black');
	}
}

module.exports = Color;
