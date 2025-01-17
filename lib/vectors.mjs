import { Predefined_Prefix } from './prefix.mjs';
import { Abstract_Vector } from './abc.mjs';

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
			const [prefix, scale_factor] = prefix_formatter.select_prefix(value);
			const scaled_value = scale_factor * value;
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



export class Vector_3 extends Abstract_Vector {
	constructor(x, y, z) {
		super();
		this.x = x ?? 0;
		this.y = y ?? 0;
		this.z = z ?? 0;
	}

	*[Symbol.iterator] () {
		yield this.x;
		yield this.y;
		yield this.z;
	}

	static format_value_with_unit(value, unit, prefix_formatter) {
		if (prefix_formatter) {
			const pfa = [
				prefix_formatter.select_prefix(value.x),
				prefix_formatter.select_prefix(value.y),
				prefix_formatter.select_prefix(value.z)
			];

			//Use median prefix for all dimensions
			const select_prefix = new Predefined_Prefix(...pfa.sort((a, b) => b[1] - a[1])[1]);
			const fx = Scalar.format_value_with_unit(value.x, unit, select_prefix);
			const fy = Scalar.format_value_with_unit(value.y, unit, select_prefix);
			const fz = Scalar.format_value_with_unit(value.z, unit, select_prefix);
			return `${this.name}(${fx}, ${fy}, ${fz});`

		} else {

			const fx = Scalar.format_value_with_unit(value.x, unit, prefix_formatter);
			const fy = Scalar.format_value_with_unit(value.y, unit, prefix_formatter);
			const fz = Scalar.format_value_with_unit(value.z, unit, prefix_formatter);

			//TODO - call join_preformatted_elements for drysoot reasons (DRY SSoT)
			return `${this.name}(${fx}, ${fy}, ${fz});`
		}
	}

	static join_preformatted_elements(fx, fy, fz) {
		return `${this.name}(${fx}, ${fy}, ${fz});`
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
					throw `Wrong number of elements in array to create ${this.name}. Values: "${values}".`
				}
			}
		} else if (values.length == 3) {
			return new Vector_3(...values.map(v => create_scalar_from_anything(v)));
		}

		throw `No idea how to create a ${this.name} from "${values}".`

	}



}
