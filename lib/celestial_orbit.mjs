import { Scalar, Vector_3 } from './vectors.mjs';
import { SI_Prefix } from './prefix.mjs';
import { Abstract_Vector } from './abc.mjs';

function isSubclass(subclass, superclass) {
    while (subclass) {
        if (subclass === superclass) return true;
        subclass = Object.getPrototypeOf(subclass);
    }
    return false;
}


class Astronomical_Distance {

	static filter(value, prefix_system) {
		const scale_factor = 149597870700;
		if (typeof(value) == 'string') {

			const match = value.match(/(-?\d*(?:\.\d+)?(?:e[+-]?\d+)?)\s*(\D.*)?/i);
			if (match) {
				//TODO - implement support for prefix system here
				const [number, unit] = [match[1], match[2]];

				if (number && unit) {
					if (unit.match(/au/i)) {
						return parseFloat(number) * scale_factor;
					}
				} else if (number) {
					return parseFloat(number)
				}
			}
		}

		return value;
	}

	static select_unit(value, prefix_system) {
		const scale_factor = 149597870700;

		if (prefix_system) {
			const pending_value = value / scale_factor;
			const [prefix, pfx_scale] = prefix_system.select_prefix(pending_value);
			return [pending_value * pfx_scale, `${prefix}AU`];

		} else {
			return [value / scale_factor, 'AU'];
		}


	}

}


class Field {
	constructor(name, mandatory, representation, type, unit, description, prefix_system) {
		this.name = name;
		this.mandatory = mandatory ?? true;
		this.representation = representation;
		this.type = type;
		this.unit = unit;
		this.description = description;
		this.prefix_system = prefix_system ?? SI_Prefix;
	}
}



class Abstract_Object {
	constructor(values) {

		const work_values = values ?? {};
		const field_map = {};

		for (const field of this.constructor._fields) {
			let pending_value = work_values[field.name];

			if (field.mandatory && (pending_value === undefined)) {
				throw `Field "${field.name}" of ${this.constructor.name} is mandatory but value was not supplied.`;
			}

			const custom_factory = field.type?.create_from_anything;
			const custom_unit_filter = field.unit?.filter;

			if (custom_factory) {
				pending_value = custom_factory(pending_value);
			}

			if (custom_unit_filter) {
				pending_value = custom_unit_filter(pending_value);
			}




			this[field.name] = pending_value;

			field_map[field.name] = field;

		}

		if (this.constructor._field_map === undefined) {
			this.constructor._field_map = field_map;
		}

	}

	format_field_value(field_name) {
		const field = this.constructor._field_map[field_name];

		const value = this[field.name];

		if (field.type) {
			if (typeof(field.unit) == 'string' ) {
				return field.type.format_value_with_unit(value, field.unit, field.prefix_system);
			} else {

				if (isSubclass(field.type, Abstract_Vector)) {

                    const result = [];
                    for (const num of value) {
                        result.push(Scalar.format_value_with_unit(...field.unit.select_unit(num, field.prefix_system)));
                    }

                    return field.type.join_preformatted_elements(...result);

                } else {
				    return field.type.format_value_with_unit(...field.unit.select_unit(value, field.prefix_system));
                }
			}
		}
	}


}

export class Celestial_Orbit extends Abstract_Object {
	static _fields = [
		//			Parameter			 Mandatory		Representation    Type			 Unit						Description
		new Field('name',                 false,		'Name',		      'string',       null,           			'The name of the orbit'),
		new Field('position',             true,			null,  		      Vector_3,	     Astronomical_Distance, 	'Center position of the orbit'),
		new Field('semi_major_axis',      true,			'a',   		      Scalar,      	 Astronomical_Distance,     'Semi-major Axis'),
/*		new Field('eccentricity',         true,			'e',   		      'scalar',       null,           'Eccentricity'),
		new Field('inclination',          true,			'i',   		      'scalar',       '°',            'Inclination'),
		new Field('longitude_asc_node',   true,			'Ω',   		      'scalar',       '°',            'Longitude of the Ascending Node'),
		new Field('arg_of_periapsis',     true,			'ω',   		      'scalar',       '°',            'Argument of Periapsis'),
		new Field('true_anomaly',         true,			'v',   		      'scalar',       '°',            'True Anomaly'),
		new Field('epoch',                true,			't',   		      'scalar',       's',            'Epoch'),
		new Field('orbital_period',       true,			'P',   		      'scalar',       's',            'Time to complete one orbit')*/
	]


};