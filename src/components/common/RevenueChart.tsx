import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from "recharts";
import { addDays, format, isWithinInterval, parseISO } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DayWiseTripDataSchema } from "@/types/types";
import { useSearchParams } from "react-router-dom";
import ShareWidget from "./ShareWidget";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { isEmpty } from "lodash";
// import { scaleLog } from "d3-scale";

interface RevenueChartProps {
  schema: DayWiseTripDataSchema | undefined;
  id: string;
}

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#2563eb",
  },
  trips: {
    label: "Trips",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

// I'm adding a default value of 7 days at the start
function RevenueChart({ schema, id }: RevenueChartProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const startDate = new Date(2017, 0, 1);

  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const fromParam = searchParams.get("startDate");
    const toParam = searchParams.get("endDate");
    if (fromParam && toParam) {
      return {
        from: new Date(fromParam),
        to: new Date(toParam),
      };
    }
    return {
      from: startDate,
      to: addDays(startDate, 6),
    };
  });

  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (dateRange?.from && dateRange?.to) {
        newParams.set(
          "startDate",
          format(parseISO(dateRange.from.toISOString()), "yyyy-MM-dd")
        );
        newParams.set(
          "endDate",
          format(parseISO(dateRange.to.toISOString()), "yyyy-MM-dd")
        );
      } else {
        newParams.delete("startDate");
        newParams.delete("endDate");
      }
      return newParams;
    });
  }, [dateRange, setSearchParams]);

  const filteredData =
    schema &&
    schema.data.filter((item) => {
      const itemDate = parseISO(item.date);

      if (!dateRange?.from || !dateRange?.to) {
        return true;
      }

      const startDate = new Date(dateRange.from.setHours(0, 0, 0, 0));
      const endDate = new Date(dateRange.to.setHours(23, 59, 59, 999));

      return isWithinInterval(itemDate, {
        start: startDate,
        end: endDate,
      });
    });

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
  };

  if (isEmpty(schema)) {
    return "No data...";
  }

  return (
    <div className="p-4" id={id}>
      <h2 className="text-2xl font-bold mb-4">Revenue vs Trips Chart</h2>
      <div className="mb-4 flex gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`w-[300px] justify-start text-left font-normal`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" aria-label="datepicker" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={startDate}
              selected={dateRange}
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <div>
          <ShareWidget />
        </div>
      </div>
      {!isEmpty(filteredData) ? (
        <ChartContainer
          className="min-h-[200px] h-[500px] w-full min-w-[400px]"
          config={chartConfig}
        >
          <ComposedChart
            data={filteredData}
            accessibilityLayer
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => format(parseISO(value), "MM/dd")}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <ChartTooltip
              content={<ChartTooltipContent />}
              labelFormatter={(value) => {
                return format(parseISO(value), "E, MMM dd");
              }}
            />
            <ChartLegend />
            <Bar
              dataKey="total_revenue"
              fill="var(--color-revenue)"
              name="Total Revenue"
              radius={4}
              barSize={40}
              yAxisId={"left"}
            />
            <Bar
              yAxisId={"right"}
              dataKey="trip_count"
              fill="var(--color-trips)"
              name="Trip Count"
              radius={4}
              barSize={40}
            />
          </ComposedChart>
        </ChartContainer>
      ) : (
        "no data..."
      )}
    </div>
  );
}

export default RevenueChart;
