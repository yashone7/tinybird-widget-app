export const totalRevenueQuery = `SELECT  SUM(total_amount) AS total_revenue FROM  _`;

export const totalTripDistanceQuery = `SELECT SUM(trip_distance) AS total_trip_distance FROM _`;

export const dayWiseTripAndRevenueQuery = `SELECT 
    WEEK(tpep_pickup_datetime, 1) AS week_of_year,
    DATE(tpep_pickup_datetime) AS date, 
    COUNT(*) AS trip_count,   
    SUM(total_amount) AS total_revenue FROM _ 
    WHERE tpep_pickup_datetime >= '2017-01-01' AND tpep_pickup_datetime < '2017-02-01' 
    GROUP BY 
    WEEK(tpep_pickup_datetime, 1), DATE(tpep_pickup_datetime), DAYOFWEEK(tpep_pickup_datetime) ORDER BY week_of_year, DATE(tpep_pickup_datetime)`;

export const preferredPaymentTypeQuery = `SELECT 
    payment_type, 
    COUNT(*) AS trip_count, 
    (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM _)) AS percentage 
    FROM
    _ 
    GROUP BY 
    payment_type 
    ORDER BY 
    percentage DESC `;

export const totalNumberofPassengersHailedQuery = `SELECT SUM(passenger_count) AS passenger_hailed_count FROM _`;

export const topNBusiestripsOrderByPuDoQuery = (
  limit: string | null = "10"
) => `WITH RankedTrips AS ( 
  SELECT 
    pulocationid, 
    dolocationid, 
    COUNT(*) AS trip_count, 
    ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC) AS id 
  FROM 
    _ 
  WHERE 
    tpep_pickup_datetime >= '2017-01-01' AND tpep_pickup_datetime < '2017-02-01' 
  GROUP BY 
    pulocationid, dolocationid 
)
SELECT 
  id, 
  pulocationid, 
  dolocationid, 
  trip_count 
FROM 
  RankedTrips 
ORDER BY 
  trip_count DESC 
LIMIT ${limit || 10} `;

export const revenueParams = new URLSearchParams({
  q: totalRevenueQuery,
});

export const totalTripDistanceParams = new URLSearchParams({
  q: totalTripDistanceQuery,
});

export const dayWiseTripAndRevenueParams = new URLSearchParams({
  q: dayWiseTripAndRevenueQuery,
});

export const preferredPaymentTypeParams = new URLSearchParams({
  q: preferredPaymentTypeQuery,
});

export const totalNumberofPassengersHailedParams = new URLSearchParams({
  q: totalNumberofPassengersHailedQuery,
});

export const topNBusiestripsOrderByPuDoParam = (limit?: string | null) =>
  new URLSearchParams({
    q: topNBusiestripsOrderByPuDoQuery(limit),
  });
