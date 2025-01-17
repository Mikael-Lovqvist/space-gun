# Space gun project


## Scope

- The planetoids will be represented by ellipsoids
- We will make the simulation somewhat modular, so that we can plug in various functions for things such as
    + Atmospheric density at position
    + Gravity at position
- The projectile must have the following properties
    + Mass
    + Surface aera
    + Drag coefficient


## Objects / Classes

- Celestial Orbit
    | Parameter          | Representation | Type     | Unit | Description                     |
    |:-------------------|:---------------|:---------|:-----|:--------------------------------|
    | name               | Name           | string   |      | The name of the orbit           |
    | position           |                | vector_3 | m    | Center position of the orbit    |
    | semi_major_axis    | a              | scalar   | m    | Semi-major Axis                 |
    | eccentricity       | e              | scalar   |      | Eccentricity                    |
    | inclination        | i              | scalar   | °    | Inclination                     |
    | longitude_asc_node | Ω              | scalar   | °    | Longitude of the Ascending Node |
    | arg_of_periapsis   | ω              | scalar   | °    | Argument of Periapsis           |
    | true_anomaly       | v              | scalar   | °    | True Anomaly                    |
    | epoch              | t              | scalar   | s    | Epoch                           |
    | orbital_period     | P              | scalar   | s    | Time to complete one orbit      |


- Planetoid
    | Parameter               | Representation         | Type           | Unit           | Description                              |
    |:------------------------|:-----------------------|:---------------|:---------------|:-----------------------------------------|
    | semi_major_axis         | a                      | scalar         | m              | Semi-major Axis                          |
    | flattening              | f                      | scalar         |                | Degree of flattening or oblateness       |
    | obliquity_angle         | ϵ                      | scalar         | °              | Obliquity Angle                          |
    | position                |                        | vector_3       | m              | Center position of planetoid             |
    | rotation_rate           | ω                      | scalar         | °s⁻¹           | Rate of rotation                         |
    | name                    | Name                   | string         | Name           |                                          |
    | mass                    | m                      | scalar         | kg             | Mass                                     |
    | orbit                   | o                      | reference      |                | Reference to celestial orbit instance    |



## Implementation
- The project will be implemented in a browser so that we can access it from https://mikael-lovqvist.github.io/space-gun/index.html



