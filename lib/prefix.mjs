
export class Predefined_Prefix {
	constructor(prefix, scale) {
		this.prefix = prefix;
		this.scale = scale;
	}

	select_prefix(value) {
		return [this.prefix, this.scale];
	}

}
export class SI_Prefix {
	static select_prefix(value) {
		if (value > 1e15) {
			return ['P', 1e-15];
		} else if (value > 1e12) {
			return ['T', 1e-12];
		} else if (value > 1e9) {
			return ['G', 1e-9];
		} else if (value > 1e6) {
			return ['M', 1e-6];
		} else if (value > 1e3) {
			return ['k', 1e-3];
		} else if (value == 0) {
			return ['', 1.0];
		} else if (value < 1e-12) {
			return ['a', 1e15];
		} else if (value < 1e-9) {
			return ['p', 1e12];
		} else if (value < 1e-6) {
			return ['n', 1e9];
		} else if (value < 1e-3) {
			return ['µ', 1e6];
		} else if (value < 1) {
			return ['m', 1e3];
		} else {
			return ['', 1.0];
		}
	}
}
