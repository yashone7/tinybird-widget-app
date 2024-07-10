// src/components/CopyLink/__tests__/CopyLink.test.tsx

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import ShareWidget from "@/components/common/ShareWidget"; // Adjust the import path as needed
import { Toaster } from "@/components/ui/toaster";

const mockClipboard = () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal("navigator", {
    clipboard: {
      writeText: writeTextMock,
    },
  });
  return writeTextMock;
};

const createMockLocation = (url: string) => {
  const { origin, pathname, search } = new URL(url);
  return {
    ...window.location,
    href: url,
    origin,
    pathname,
    search,
  } as unknown as Location;
};

describe("CopyLink", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const renderShareWidget = () => {
    render(
      <>
        <Toaster />
        <ShareWidget />
      </>
    );

    return {
      popoverBtn: screen.getByLabelText(/open popup/i),
      copyLinkBtn: () => screen.getByLabelText(/copy link/i),
    };
  };
  const user = userEvent.setup();

  test("opens popover and displays the correct URL with query parameters", async () => {
    const mockLocation = createMockLocation(
      "http://localhost:3000/route?param=value"
    );
    vi.stubGlobal("location", mockLocation);

    const { popoverBtn } = renderShareWidget();

    // Click the button to open the popover
    await user.click(popoverBtn);

    // input appears after the user has clicked so find it by label-text

    const textbox = await screen.findByLabelText("url-textbox");
    expect(textbox).toHaveValue("http://localhost:3000/route?param=value");

    // Check if the popover is opened and the URL is displayed
  });

  test("copies the link to clipboard and shows toast notification", async () => {
    const mockLocation = createMockLocation(
      "http://localhost:3000/route?param=value"
    );
    vi.stubGlobal("location", mockLocation);

    mockClipboard();

    const { copyLinkBtn, popoverBtn } = renderShareWidget();

    // Open the popover
    await user.click(popoverBtn);

    // Click the copy button
    await user.click(copyLinkBtn());

    // Assert that the clipboard content is correct
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        "http://localhost:3000/route?param=value"
      );
    });

    const toastMessage = await screen.findByText(/link copied to clipboard/i);
    expect(toastMessage).toBeInTheDocument();
  });
});
