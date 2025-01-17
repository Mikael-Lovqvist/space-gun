import { Celestial_Orbit } from '../lib/celestial_orbit.mjs';


const o = new Celestial_Orbit({
	position: [-100, '1 AU', 50000000],
	semi_major_axis: '1 AU',

});

console.log(o);

console.log(o.format_field_value('position'));