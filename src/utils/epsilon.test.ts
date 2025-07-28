import { expect, test } from "vitest";
import { epsilon, nonZero } from "./epsilon";

test("nonZero returns the same number when it's larger than epsilon", () => {
  expect(nonZero(1)).toBe(1);
  expect(nonZero(-1)).toBe(-1);
  expect(nonZero(0.5)).toBe(0.5);
  expect(nonZero(-0.5)).toBe(-0.5);
  expect(nonZero(100)).toBe(100);
  expect(nonZero(-100)).toBe(-100);
});

test("nonZero returns the same number when it equals epsilon", () => {
  expect(nonZero(epsilon)).toBe(epsilon);
  expect(nonZero(-epsilon)).toBe(-epsilon);
});

test("nonZero returns epsilon when given zero", () => {
  expect(nonZero(0)).toBe(epsilon);
  expect(nonZero(+0)).toBe(epsilon);
  expect(nonZero(-0)).toBe(epsilon); // -0 === 0 in JavaScript
});

test("nonZero returns epsilon with correct sign for very small positive numbers", () => {
  expect(nonZero(0.00001)).toBe(epsilon);
  expect(nonZero(0.00005)).toBe(epsilon);
  expect(nonZero(epsilon / 2)).toBe(epsilon);
  expect(nonZero(epsilon * 0.99)).toBe(epsilon);
});

test("nonZero returns -epsilon with correct sign for very small negative numbers", () => {
  expect(nonZero(-0.00001)).toBe(-epsilon);
  expect(nonZero(-0.00005)).toBe(-epsilon);
  expect(nonZero(-epsilon / 2)).toBe(-epsilon);
  expect(nonZero(-epsilon * 0.99)).toBe(-epsilon);
});

test("nonZero edge case: numbers just above epsilon threshold", () => {
  const justAboveEpsilon = epsilon * 1.01;
  expect(nonZero(justAboveEpsilon)).toBe(justAboveEpsilon);
  expect(nonZero(-justAboveEpsilon)).toBe(-justAboveEpsilon);
});

test("nonZero works correctly with division", () => {
  // Test that division by nonZero(0) doesn't result in Infinity
  expect(() => 1 / nonZero(0)).not.toThrow();
  expect(1 / nonZero(0)).toBe(1 / epsilon);
  expect(1 / nonZero(0)).toBe(10000);

  // Test with very small numbers
  expect(() => 1 / nonZero(0.00001)).not.toThrow();
  expect(1 / nonZero(0.00001)).toBe(1 / epsilon);
  expect(1 / nonZero(0.00001)).toBe(10000);
});

test("nonZero preserves sign correctly", () => {
  // Smallest positive number
  expect(nonZero(Number.MIN_VALUE)).toBe(epsilon);
  // Smallest negative number
  expect(nonZero(-Number.MIN_VALUE)).toBe(-epsilon);

  // Very small positive numbers become positive epsilon
  expect(nonZero(1e-10)).toBe(epsilon);
  // Very small negative numbers become negative epsilon
  expect(nonZero(-1e-10)).toBe(-epsilon);
});

test("nonZero prevents division by zero in all cases", () => {
  // Direct zero
  expect(isFinite(1 / nonZero(0))).toBe(true);
  expect(1 / nonZero(0)).not.toBe(Infinity);
  expect(1 / nonZero(0)).not.toBe(-Infinity);

  // Very small numbers
  expect(isFinite(1 / nonZero(1e-10))).toBe(true);
  expect(isFinite(1 / nonZero(-1e-10))).toBe(true);

  // Numbers at the epsilon boundary
  expect(isFinite(1 / nonZero(epsilon * 0.5))).toBe(true);
  expect(isFinite(1 / nonZero(-epsilon * 0.5))).toBe(true);
});
