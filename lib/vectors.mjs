//TODO: Own module
export class SI_Prefix {
	static select_prefix(value) {
		if (value > 1e15) {
			return ['P', value * 1e-15];
		} else if (value > 1e12) {
			return ['T', value * 1e-12];
		} else if (value > 1e9) {
			return ['G', value * 1e-9];
		} else if (value > 1e6) {
			return ['M', value * 1e-6];
		} else if (value > 1e3) {
			return ['k', value * 1e-3];

		} else if (value < 1e-12) {
			return ['a', value * 1e15];
		} else if (value < 1e-9) {
			return ['p', value * 1e12];
		} else if (value < 1e-6) {
			return ['n', value * 1e9];
		} else if (value < 1e-3) {
			return ['µ', value * 1e6];
		} else if (value < 1) {
			return ['m', value * 1e3];
		} else {
			return ['', value];
		}
	}
}

//TODO: Own module

export class Scalar {
	constructor() {
		throw 'Scalar is an abstract class, you can not construct it';
	}

	static represent_field(instance, value) {
		return 'blargh';
	}

	static format_value_with_unit(value, unit, prefix_formatter) {
		if (unit && prefix_formatter) {
			const [prefix, scaled_value] = prefix_formatter.select_prefix(value);
			return `${scaled_value} ${prefix}${unit}`;
		} else if (unit) {
			return `${value} ${unit}`;
		} else {
			return `${value}`;
		}

	}


}

export function create_scalar_from_anything(...values) {
	if (values.length == 1) {
		const [all] = values;
		if (typeof(all) == 'number') {
			return all;
		}
	}

	throw `No idea how to create a scalar from "${values}".`
}



export class Vector_3 {
	constructor(x, y, z) {
		this.x = x ?? 0;
		this.y = y ?? 0;
		this.z = z ?? 0;
	}


	static create_from_anything(...values) {

		if (values.length == 1) {
			const [all] = values;

			if (typeof(all) == 'number') {
				return new Vector_3(all, all, all);
			} else if (Array.isArray(all)) {
				if (all.length == 3) {
					return new Vector_3(...all.map(v => create_scalar_from_anything(v)));
				} else {
					throw `Wrong number of elements in array to create Vector_3. Values: "${values}".`
				}
			}
		} else if (values.length == 3) {
			return new Vector_3(...values.map(v => create_scalar_from_anything(v)));
		}

		throw `No idea how to create a Vector_3 from "${values}".`

	}



}
