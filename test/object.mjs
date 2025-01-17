import { Celestial_Orbit } from '../lib/celestial_orbit.mjs';


const o = new Celestial_Orbit({
	position: 0,
	semi_major_axis: 149.598e9, //m
});

console.log(o.format_field_value('semi_major_axis'));