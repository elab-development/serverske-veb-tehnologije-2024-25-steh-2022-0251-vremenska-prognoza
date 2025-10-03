import { ArrowRightIcon } from "@radix-ui/react-icons";
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Button, ButtonProps } from "../src/components/ui/button";

const mockChild = vi.fn();
vi.mock("@radix-ui/react-icons", () => ({
  ArrowRightIcon: (props: ButtonProps) => {
    mockChild(props);
    return (
      <span {...props} id="icon">
        Icon
      </span>
    );
  },
}));

describe("AsChild test for Button", () => {
  it("Render the Button with Icon as a child component", () => {
    render(
      <Button aria-label="icon" asChild>
        <ArrowRightIcon />
      </Button>,
    );

    expect(screen.getByText("Icon")).toBeDefined();

    expect(mockChild).toHaveBeenCalledWith(
      expect.objectContaining({
        "aria-label": "icon",
      }),
    );
  });
});
