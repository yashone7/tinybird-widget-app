import { topNBusiestripsOrderByPuDoQuery } from "@/utils/queries";
import { http, HttpResponse } from "msw";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const handlers = [
  // handler to get top N busiest routes
  http.get(`${API_URL}`, ({ request }) => {
    const url = new URL(request.url);

    const query = url.searchParams.get("q");

    if (query === topNBusiestripsOrderByPuDoQuery("1")) {
      const data = {
        meta: [
          {
            name: "id",
            type: "UInt64",
          },
          {
            name: "pulocationid",
            type: "Int32",
          },
          {
            name: "dolocationid",
            type: "Int32",
          },
          {
            name: "trip_count",
            type: "UInt64",
          },
        ],
        data: [
          {
            id: 1,
            pulocationid: 264,
            dolocationid: 264,
            trip_count: 140744,
          },
        ],
        rows: 1,
        rows_before_limit_at_least: 25936,
        statistics: {
          elapsed: 0.051897807,
          rows_read: 9710124,
          bytes_read: 116521488,
        },
      };

      return HttpResponse.json(data, { status: 200 });
    } else return HttpResponse.text("Invalid query", { status: 400 });
  }),
];
