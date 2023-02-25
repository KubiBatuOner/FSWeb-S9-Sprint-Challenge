import React from "react";
import AppFunctional from "./AppFunctional";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Write your tests here
test("sanity", () => {
  expect(true).toBe(true);
});

test("App Functional sayfası hatasız render ediliyor", () => {
  render(<AppFunctional />);
});

test("bütün butonlar gözüküyor", () => {
  render(<AppFunctional />);
  const solButon = screen.getByText(/SOL/i);
  expect(solButon).toBeInTheDocument();
  const sagButon = screen.getByText(/SAĞ/i);
  expect(sagButon).toBeInTheDocument();
  const asagiButon = screen.getByText(/AŞAĞI/i);
  expect(asagiButon).toBeInTheDocument();
  const yukariButon = screen.getByText(/YUKARI/i);
  expect(yukariButon).toBeInTheDocument();
  const resetButon = screen.getByText(/RESET/i);
  expect(resetButon).toBeInTheDocument();
});

test("koordinatlar yazısı görünüyor", () => {
  render(<AppFunctional />);
  const coordinatesText = screen.getByText(/Koordinatlar/i);
  expect(coordinatesText).toBeInTheDocument();
});

test("(steps) kere ilerlediniz metni görünür", () => {
  render(<AppFunctional />);
  const countStep = screen.getByText(/kere ilerlediniz/i);
  expect(countStep).toBeInTheDocument();
});

test("sol buton çalışıyor", () => {
  render(<AppFunctional />);
  const solButon = screen.getByText(/SOL/i);
  const coordinatesText = screen.getByText(/Koordinatlar/i);
  const countStep = screen.getByText(/kere ilerlediniz/i);
  fireEvent.click(solButon);
  expect(coordinatesText).toHaveTextContent("Koordinatlar (1, 2)");
  expect(countStep).toHaveTextContent("1 kere ilerlediniz");
});
