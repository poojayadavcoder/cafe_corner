import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Hero from "../components/Home/Hero";
import { ThemeContext } from "../context/ThemeContext";

describe("Hero Component", () => {

  it("updates search query when user types", () => {
    const mockSetSearch = vi.fn();

    render(
      <ThemeContext.Provider value={{ theme: "dark", toggleTheme: vi.fn() }}>
        <Hero searchQuery="" setSearchQuery={mockSetSearch} />
      </ThemeContext.Provider>
    );

    const input = screen.getByPlaceholderText(/Search cafe or location/i);

    fireEvent.change(input, { target: { value: "Cozy Cafe" } });

    expect(mockSetSearch).toHaveBeenCalledWith("Cozy Cafe");
  });

  it("scrolls to discover section on form submit", () => {
    const scrollMock = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollMock;

    const section = document.createElement("div");
    section.id = "discover-section";
    document.body.appendChild(section);

    render(
      <ThemeContext.Provider value={{ theme: "dark", toggleTheme: vi.fn() }}>
        <Hero searchQuery="Coffee" setSearchQuery={vi.fn()} />
      </ThemeContext.Provider>
    );

    const input = screen.getByPlaceholderText(/Search cafe or location/i);
    const form = input.closest("form");

    fireEvent.submit(form!);

    expect(scrollMock).toHaveBeenCalled();

    document.body.removeChild(section);
  });

});