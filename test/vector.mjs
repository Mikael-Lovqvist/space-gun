import { SI_Prefix, Scalar, Vector_3 } from '../lib/vectors.mjs';


console.log(Vector_3.create_from_anything(1.23));
console.log(Vector_3.create_from_anything(1, 2, 3));
console.log(Vector_3.create_from_anything([1, 2, 3]));



console.log(Scalar.format_value_with_unit(123, '°'));
console.log(Scalar.format_value_with_unit(2384, 'm', SI_Prefix));