import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import isEmpty from "lodash/isEmpty";
import {
  PreferredPaymentType,
  PreferredPaymentTypeSchema,
} from "@/types/types";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384"];

const scalePercentage = (percentage: number | null) => {
  if (!percentage) {
    return null;
  } else {
    const scaled = Math.log10(percentage + 1.2); // Log scale to handle small values
    return scaled;
  }
};

interface PaymentPieChartProps {
  data: PreferredPaymentType[] | undefined;
}

function PaymentPieChart({ data }: PaymentPieChartProps) {
  if (isEmpty(data)) {
    return;
  }
  const scaledData =
    data &&
    data.map((item) => ({
      ...item,
      scaled_percentage: scalePercentage(item?.percentage),
    }));

  const paymentTypeNames: { [key: number]: string } = {
    1: "Credit Card",
    2: "Cash",
    3: "Free Voucher",
    4: "Dispute",
    5: "Misc",
  };

  if (!scaledData) {
    return;
  }

  return (
    <>
      <PieChart width={400} height={400}>
        <Pie
          data={scaledData}
          dataKey="scaled_percentage"
          nameKey="payment_type"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label={({ name, percent }) => `${paymentTypeNames[name]}`}
        >
          {scaledData.length > 0
            ? scaledData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))
            : null}
        </Pie>
        <Tooltip
          formatter={(value, name, entry) => {
            const originalPercentage = (
              Math.pow(10, Number(value)) - 1
            ).toFixed(2);
            const paymentType = paymentTypeNames[entry.payload.payment_type];
            return [
              `${originalPercentage}% (${entry.payload.trip_count} trips)`,
              paymentType,
            ];
          }}
        />
        <Legend
          formatter={(value, entry, index) => {
            const paymentTypeName =
              paymentTypeNames[value] ?? "Unknown Payment Type";
            const percentage = data[index]?.percentage?.toFixed(2) ?? "0.00";
            return `${paymentTypeName}: ${percentage}%`;
          }}
        />
      </PieChart>
    </>
  );
}

export default PaymentPieChart;
