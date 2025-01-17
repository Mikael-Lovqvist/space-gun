import { Scalar, Vector_3 } from '../lib/vectors.mjs';
import { SI_Prefix } from '../lib/prefix.mjs';


console.log(Vector_3.create_from_anything(1.23));
console.log(Vector_3.create_from_anything(1, 2, 3));
console.log(Vector_3.create_from_anything([1, 2, 3]));



console.log(Scalar.format_value_with_unit(123, '°'));
console.log(Scalar.format_value_with_unit(2384, 'm', SI_Prefix));

const V = Vector_3.create_from_anything(0.000000001, .00000000002, 3e9);
console.log(Vector_3.format_value_with_unit(V, 'm', SI_Prefix));