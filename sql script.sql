CREATE TABLE "size_history" (
    "date" VARCHAR(30),
    "county" VARCHAR(30),
    "state" VARCHAR(2),
    "vehicle_primary_use" VARCHAR(10),
    "battery_electric_vehicles_bevs_" INT,
    "plug_in_hybrid_electric_vehicles_phevs_" INT,
    "electric_vehicle_ev_total" INT,
    "non_electric_vehicles" INT,
    "total_vehicles" INT,
    "percent_electric_vehicles"  FLOAT(3),
	"index" VARCHAR(30),
    CONSTRAINT "pk_size_history" PRIMARY KEY (
        "index"
     )
);

-- Query all fields from the table
SELECT *
FROM size_history;