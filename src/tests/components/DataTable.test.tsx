import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import DataTable from "@/components/common/DataTable";

interface data {
  Name: string;
  Age: number;
  Address: string;
}

describe("DataTable", () => {
  const headers = ["Name", "Age", "Address"] as (keyof data)[];
  const data = [
    { Name: "John Doe", Age: 30, Address: "123 Main St" },
    { Name: "Jane Smith", Age: 25, Address: "456 Elm St" },
  ];

  test("renders correctly with no data", () => {
    // render method is being called multiple times in this test
    // duplication can be avoided by rendering it in describe block and
    // exporting the relevant items for testing.

    render(
      <DataTable<data>
        tableHeaders={headers}
        data={[]}
        tableCaption="Test Table"
        pageSize={"10"}
        handleValueChange={vi.fn()}
        id="test"
      />
    );

    const noData = screen.getByText(/no data/i);
    expect(noData).toBeInTheDocument();
  });

  test("renders correctly with data", () => {
    render(
      <DataTable<data>
        tableHeaders={headers}
        data={data}
        tableCaption="Test Table"
        pageSize={"10"}
        handleValueChange={vi.fn()}
        id="test"
      />
    );

    expect(screen.getByText(/Test Table/i)).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")).toHaveLength(headers.length);
    expect(screen.getAllByRole("row")).toHaveLength(data.length + 1);
  });

  test("displays the correct table headers", () => {
    render(
      <DataTable
        tableHeaders={headers}
        data={data}
        tableCaption="Test Table"
        pageSize={"10"}
        handleValueChange={vi.fn()}
        id="test"
      />
    );
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test("renders correctly with empty tableHeaders", () => {
    render(
      <DataTable<data>
        tableHeaders={[]}
        data={data}
        tableCaption="Test Table"
        pageSize="1"
        handleValueChange={vi.fn()}
        id="test-2"
      />
    );
    expect(screen.getByText("Test Table")).toBeInTheDocument();
    expect(screen.queryAllByRole("columnheader")).toHaveLength(0);
  });

  test("renders correctly with an empty data array", () => {
    render(
      <DataTable
        tableHeaders={headers}
        data={[]}
        tableCaption="Test Table"
        handleValueChange={vi.fn()}
        pageSize={"1"}
        id="test-4"
      />
    );
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  test("handles invalid data gracefully", () => {
    const invalidData = [
      { Name: "John Doe", Age: "Invalid Age", Address: 123 },
    ];
    render(
      <DataTable
        tableHeaders={headers}
        data={invalidData}
        tableCaption="Test Table"
        handleValueChange={vi.fn()}
        pageSize={"1"}
        id="test-4"
      />
    );
    expect(screen.getByText("Test Table")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Invalid Age")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
  });
});
