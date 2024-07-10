interface Meta {
  name: string;
  type: string;
}

interface Statistics {
  elapsed: number;
  rows_read: number;
  bytes_read: number;
}

interface TotalRevenueData {
  total_revenue: number;
}

interface TripDistanceData {
  total_trip_distance: number;
}

interface TotalPassengerHailedData {
  passenger_hailed_count: number;
}

export interface TotalRevenueSchema {
  meta: Meta[];
  data: TotalRevenueData[];
  rows: number;
  statistics: Statistics;
}

interface TripData {
  vendorid: number;
  tpep_pickup_datetime: string;
  tpep_dropoff_datetime: string;
  passenger_count: number;
  trip_distance: number;
  ratecodeid: number;
  store_and_fwd_flag: string;
  pulocationid: number;
  dolocationid: number;
  payment_type: number;
  fare_amount: string;
  extra: number;
  mta_tax: number;
  tip_amount: number;
  tolls_amount: number;
  improvement_surcharge: number;
  total_amount: number;
}

export interface TripDataSchema {
  meta: Meta[];
  data: TripData[];
  rows: number;
  rows_before_limit_at_least: number;
  statistics: Statistics;
}

export interface TotalTripDistanceSchema {
  meta: Meta[];
  data: TripDistanceData[];
  rows: number;
  statistics: Statistics;
}

export interface TotalPassengersHailedSchema {
  meta: Meta[];
  data: TotalPassengerHailedData[];
  rows: number;
  statistics: Statistics;
}

export interface BusiestTripsSchema {
  id: number;
  pulocationid: number;
  dolocationid: number;
  trip_count: number;
}

export interface TopNBusiestTripsSchema {
  meta: Meta[];
  data: BusiestTripsSchema[];
  rows: number;
  rows_before_limit_at_least: number;
  statistics: Statistics;
}

export interface PreferredPaymentType {
  payment_type: number;
  trip_count: number;
  percentage: number | null;
}

export interface PreferredPaymentTypeSchema {
  meta: Meta[];
  data: PreferredPaymentType[];
  rows: number;
  statistics: Statistics;
}

export interface DayWiseTripData {
  week_of_year: number;
  date: string;
  trip_count: number;
  total_revenue: number;
}

export interface DayWiseTripDataSchema {
  meta: Meta[];
  data: DayWiseTripData[];
  rows: number;
  statistics: Statistics;
}
