import { Celestial_Orbit } from '../lib/celestial_orbit.mjs';


const o = new Celestial_Orbit({
	position: 0,
	semi_major_axis: '149598023 km',
	eccentricity: 0.0167086,
	inclination: [7.155, 1.57869, 0.00005],
	longitude_asc_node: -11.26064,
	arg_of_periapsis: 114.20783,
	mean_anomaly: 358.617,
	epoch: 'J2000',
	orbital_period: '365.256363004 d',

});

console.log(o);

console.log(o.format_field_value('position'));
console.log(o.format_field_value('inclination'));
console.log(o.format_field_value('orbital_period'));