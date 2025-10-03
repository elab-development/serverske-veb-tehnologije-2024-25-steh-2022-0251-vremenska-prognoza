import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Button } from "../src/components/ui/button";

describe("Button", () => {
  test("Button renders successfully", () => {
    render(<Button>ButtonText</Button>);
    expect(screen.getByText("ButtonText")).toBeDefined();
  });
});
