import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { describe, it, expect } from "vitest";

describe("Header", () => {
    it("renders the title", () => {
        render(<Header />);
        expect(screen.getByText(/kanban/i)).toBeInTheDocument();
    })
})