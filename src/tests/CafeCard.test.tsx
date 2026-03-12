import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import CafeCard from "../components/Home/CafeCard";
import { ThemeContext } from "../context/ThemeContext";

const mockCafe:any = {
  id: 1,
  name: "Test Cafe",
  image: "test-image.jpg",
  rating: 4.5,
  description: "A cozy test cafe.",
  tags: ["Cozy", "Quiet"],
  location: "Downtown"
};

describe("CafeCard Component", () => {

  it("renders cafe information", () => {
    render(
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: vi.fn() }}>
        <BrowserRouter>
          <CafeCard cafe={mockCafe} isFavorite={false} onToggleFavorite={vi.fn()} />
        </BrowserRouter>
      </ThemeContext.Provider>
    );

    expect(screen.getByText("Test Cafe")).toBeInTheDocument();
    expect(screen.getByText("A cozy test cafe.")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("calls favorite function when heart button is clicked", () => {
    const mockToggle = vi.fn();

    render(
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: vi.fn() }}>
        <BrowserRouter>
          <CafeCard cafe={mockCafe} isFavorite={false} onToggleFavorite={mockToggle} />
        </BrowserRouter>
      </ThemeContext.Provider>
    );

    const button = screen.getByLabelText(/Add to favorites/i);
    fireEvent.click(button);

    expect(mockToggle).toHaveBeenCalled();
  });

  it("navigates to cafe details page", () => {
    render(
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: vi.fn() }}>
        <BrowserRouter>
          <CafeCard cafe={mockCafe} isFavorite={false} onToggleFavorite={vi.fn()} />
        </BrowserRouter>
      </ThemeContext.Provider>
    );

    const link = screen.getByText(/View Details/i).closest("a");
    expect(link).toHaveAttribute("href", "/cafes/1");
  });

});