import { TotalRevenueSchema, TotalTripDistanceSchema } from "@/types/types";

export function formatDistance(
  total_trip_distance: TotalTripDistanceSchema | undefined
) {
  const distance = total_trip_distance?.data[0]?.total_trip_distance;
  if (distance) return `${distance.toFixed(2)} km`;
}

export function formatNumberAsCurrency(amount: TotalRevenueSchema | undefined) {
  const revenue = amount?.data[0]?.total_revenue
    ? Math.round(amount?.data[0]?.total_revenue)
    : 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(revenue);
}

export function getTableHeaders<T>(
  tableRecord: T | undefined
): (keyof T)[] | undefined {
  if (!tableRecord) {
    return;
  }
  return Object.keys(tableRecord) as (keyof T)[];
}
