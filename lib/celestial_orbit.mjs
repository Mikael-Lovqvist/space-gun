import { Scalar, Vector_3 } from './vectors.mjs';

class Field {
	constructor(name, mandatory, representation, type, unit, description) {
		this.name = name;
		this.mandatory = mandatory ?? true;
		this.representation = representation;
		this.type = type;
		this.unit = unit;
		this.description = description;
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

			if (custom_factory) {
				pending_value = custom_factory(pending_value);
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

		//const unit_formatter = field.type.represent_unit
	}


}

export class Celestial_Orbit extends Abstract_Object {
	static _fields = [
		//			Parameter			 Mandatory		Representation    Type			 Unit				Description
		new Field('name',                 false,		'Name',		      'string',       null,           	'The name of the orbit'),
		new Field('position',             true,			null,  		      Vector_3,	     'm',            	'Center position of the orbit'),
		new Field('semi_major_axis',      true,			'a',   		      Scalar,      	 'm',            		'Semi-major Axis'),
/*		new Field('eccentricity',         true,			'e',   		      'scalar',       null,           'Eccentricity'),
		new Field('inclination',          true,			'i',   		      'scalar',       '°',            'Inclination'),
		new Field('longitude_asc_node',   true,			'Ω',   		      'scalar',       '°',            'Longitude of the Ascending Node'),
		new Field('arg_of_periapsis',     true,			'ω',   		      'scalar',       '°',            'Argument of Periapsis'),
		new Field('true_anomaly',         true,			'v',   		      'scalar',       '°',            'True Anomaly'),
		new Field('epoch',                true,			't',   		      'scalar',       's',            'Epoch'),
		new Field('orbital_period',       true,			'P',   		      'scalar',       's',            'Time to complete one orbit')*/
	]


};