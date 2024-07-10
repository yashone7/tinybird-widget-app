import useEntity from "@/utils/useEntity";
import { dayWiseTripAndRevenueParams } from "@/utils/queries";
import { DayWiseTripDataSchema } from "@/types/types";
import { AxiosError } from "axios";
import RevenueChart from "../common/RevenueChart";
import { Toaster } from "../ui/toaster";

function Dashboard() {
  const {
    data: dayWiseTripData,
    isLoading,
    error,
  } = useEntity<DayWiseTripDataSchema, AxiosError>(dayWiseTripAndRevenueParams);

  console.log(dayWiseTripData);

  if (error) {
    return "error";
  }

  return (
    <div className="mx-10 my-4">
      <div className="bg-white p-4 border border-gray-200 rounded-lg">
        <RevenueChart schema={dayWiseTripData} id="revenue-vs-trip_count" />
      </div>

      <Toaster className="bg-slate-700 text-slate-50" />
    </div>
  );
}

export default Dashboard;
