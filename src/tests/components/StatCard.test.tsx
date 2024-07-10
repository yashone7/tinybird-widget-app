import StatCard from "@/components/StatCard";
import { render, screen } from "@testing-library/react";
// import { describe, it, expect } from "vitest";
import { DollarSign } from "lucide-react";
import "@testing-library/jest-dom";

describe("Test for stat card", () => {
  test("should render the stat", () => {
    render(
      <StatCard icon={<DollarSign />} heading="heading" content="content" />
    );

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/heading/i);
  });
});
