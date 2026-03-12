import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Header from "../components/navigation/Header";
import { ThemeContext } from "../context/ThemeContext";

describe("Header Component", () => {

  it("renders the logo", () => {
    render(
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: vi.fn() }}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ThemeContext.Provider>
    );

    const logo = screen.getByAltText(/CafeCorner Logo/i);
    expect(logo).toBeInTheDocument();
  });

  it("shows navigation links", () => {
    render(
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: vi.fn() }}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ThemeContext.Provider>
    );

    expect(screen.getAllByText(/Home/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Mood Gallery/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Favorites/i).length).toBeGreaterThan(0);
  });

  it("changes theme when button is clicked", () => {
    const mockToggle = vi.fn();

    render(
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: mockToggle }}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ThemeContext.Provider>
    );

    const button = screen.getByLabelText(/Toggle Theme/i);
    fireEvent.click(button);

    expect(mockToggle).toHaveBeenCalled();
  });

});