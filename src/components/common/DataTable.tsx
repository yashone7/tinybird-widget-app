import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ShareWidget from "./ShareWidget";
import isEmpty from "lodash/isEmpty";

// this table can be further be decomposed into reusable components...
// [CHORE] Decompose this into generic data table component

interface DataTableProps<T> {
  tableCaption: string;
  tableHeaders: (keyof T)[] | undefined;
  handleValueChange: (val: string) => void;
  pageSize: string | null;
  data: T[] | undefined;
  id: string;
}

function DataTable<T>({
  tableCaption,
  tableHeaders,
  handleValueChange,
  pageSize,
  data,
  id,
}: DataTableProps<T>) {
  if (isEmpty(data)) {
    return "No data";
  }

  return (
    <div id={id} aria-label="data-table">
      <div className="flex justify-between w-100 my-3 mx-2">
        <div>
          <Select
            value={pageSize || undefined}
            onValueChange={handleValueChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Page Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          {/* <Select>
            <SelectTrigger defaultValue={"asc"} className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ASC">Asc</SelectItem>
              <SelectItem value="DESC">Desc</SelectItem>
            </SelectContent>
          </Select> */}
        </div>
        <div>
          <ShareWidget />
        </div>
      </div>
      <div className="w-100">
        <Table>
          <TableCaption>{tableCaption}</TableCaption>
          <TableHeader>
            {tableHeaders ? (
              <TableRow>
                {tableHeaders.map((item, index) => (
                  <TableHead key={index}>{String(item)}</TableHead>
                ))}
              </TableRow>
            ) : null}
          </TableHeader>
          <TableBody>
            {data
              ? data.map((record, index) => {
                  return (
                    <TableRow key={index}>
                      {tableHeaders
                        ? tableHeaders.map((header) => {
                            return (
                              <TableCell key={header as string}>
                                {String(record[header])}
                              </TableCell>
                            );
                          })
                        : null}
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTable;
