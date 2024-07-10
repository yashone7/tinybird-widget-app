// RevenueChart.test.tsx
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RevenueChart from "@/components/common/RevenueChart";
import { MemoryRouter as Router } from "react-router-dom";
import { describe, test, expect, beforeEach } from "vitest";
import { addMonths, format } from "date-fns";

// Mock data
const mockData = {
  meta: [],
  data: [
    {
      week_of_year: 1,
      date: "2017-01-01",
      trip_count: 10,
      total_revenue: 1000,
    },
    {
      week_of_year: 1,
      date: "2017-01-02",
      trip_count: 15,
      total_revenue: 1500,
    },
    {
      week_of_year: 1,
      date: "2017-01-03",
      trip_count: 20,
      total_revenue: 2000,
    },
    {
      week_of_year: 1,
      date: "2017-01-04",
      trip_count: 25,
      total_revenue: 2500,
    },
    {
      week_of_year: 1,
      date: "2017-01-05",
      trip_count: 30,
      total_revenue: 3000,
    },
    {
      week_of_year: 1,
      date: "2017-01-06",
      trip_count: 35,
      total_revenue: 3500,
    },
    // Add more data up to Jan 31, 2017
  ],
  rows: 6,
  statistics: {
    elapsed: 0.02,
    rows_read: 6,
    bytes_read: 600,
  },
};

describe("RevenueChart", () => {
  beforeEach(() => {
    // Mock the ResponsiveContainer before each test
    vi.resetAllMocks();
  });

  const user = userEvent.setup();

  test("renders the chart with initial data", async () => {
    const { container } = render(
      <Router>
        <RevenueChart schema={mockData} id="test-chart" />
      </Router>
    );

    // screen.debug();

    expect(screen.getByText(/Revenue vs Trips Chart/i)).toBeInTheDocument();
    expect(screen.getByText(/Jan 01, 2017/i)).toBeInTheDocument();
    expect(screen.getByText(/Jan 07, 2017/i)).toBeInTheDocument();

    const bars = container.querySelector(
      ".recharts-layer .recharts-bar-rectangles"
    );

    expect(bars).toBeInTheDocument();

    expect(bars?.children.length).toBe(6);
  });

  // goddamn this test is failing IDEK.
  test("displays no data message for date ranges outside the data range", async () => {
    const { container } = render(
      <Router initialEntries={["/?startDate=2017-02-01&endDate=2017-03-07"]}>
        <RevenueChart schema={mockData} id="test-chart" />
      </Router>
    );

    const button = screen.getByLabelText("datepicker");
    await user.click(button);

    const calendar = await screen.findByRole("dialog");

    const monthTwoCaption = within(calendar).getAllByText(/February 2017/i)[0];
    expect(monthTwoCaption).toBeInTheDocument();

    const nextMonthButton =
      within(calendar).getByLabelText(/Go to next month/i);
    await user.click(nextMonthButton);

    const feb1 = within(calendar).getAllByText("1")[0];
    await user.click(feb1);
    const feb4 = within(calendar).getAllByText("4")[0];
    await user.click(feb4);

    await waitFor(async () =>
      expect(await screen.findAllByText(/no data.../i)).toBeInTheDocument()
    );

    const chart = screen.queryByRole("graphics-document");
    expect(chart).not.toBeInTheDocument();
  });

  test("renders no data message when schema is empty", () => {
    render(
      <Router>
        <RevenueChart schema={undefined} id="test-chart" />
      </Router>
    );

    expect(screen.getByText("No data...")).toBeInTheDocument();
  });
});
