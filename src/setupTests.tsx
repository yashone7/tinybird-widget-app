import "@testing-library/react";
import "@testing-library/jest-dom";
import ResizeObserver from "resize-observer-polyfill";

import { server } from "./tests/mocks/server";
import { vi } from "vitest";

// matchMedia error in vitest ->
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock("recharts", async () => {
  const OriginalModule = await vi.importActual<any>("recharts");
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }) => (
      <OriginalModule.ResponsiveContainer width={800} height={600} aspect={1}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

global.ResizeObserver = ResizeObserver;
