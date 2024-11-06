import { validArrayValue } from "../arrays";
import { shallowEqual, shallowEqualArrays } from "../index";
import shallowEqualObjects, { validObjectValue } from "../objects";

const arr = [1, 2, 3];
const arrObj1 = { game: "chess" };
const arrObj2 = { company: "facebook" };
const arrObj3 = { technology: "react" };

const arrTests: {
  should: string;
  arrA: validArrayValue;
  arrB: validArrayValue;
  result: boolean;
}[] = [
  {
    should: "return false when A is falsy",
    arrA: null,
    arrB: [],
    result: false,
  },
  {
    should: "return false when B is falsy",
    arrA: [],
    arrB: undefined,
    result: false,
  },
  {
    should: "return true when arrays are ===",
    arrA: arr,
    arrB: arr,
    result: true,
  },
  {
    should: "return true when both arrays are empty",
    arrA: [],
    arrB: [],
    result: true,
  },
  {
    should: "return false when arrays do not have the same amount of elements",
    arrA: [1, 2, 3],
    arrB: [1, 2],
    result: false,
  },
  {
    should:
      "return false if there are corresponding elements which are not ===",
    arrA: [arrObj1, arrObj2, arrObj3],
    arrB: [arrObj1, arrObj2, { technology: "react" }],
    result: false,
  },
  {
    should: "return true if all corresponding elements are ===",
    arrA: [arrObj1, arrObj2, arrObj3],
    arrB: [arrObj1, arrObj2, arrObj3],
    result: true,
  },
];

const obj1 = { game: "chess", year: "1979" };
const obj2 = { language: "elm" };

const objTests: {
  should: string;
  objA: validObjectValue;
  objB: validObjectValue;
  result: boolean;
}[] = [
  {
    should: "return false when A is falsy",
    objA: null,
    objB: {},
    result: false,
  },
  {
    should: "return false when B is falsy",
    objA: {},
    objB: undefined,
    result: false,
  },
  {
    should: "return true when objects are ===",
    objA: obj1,
    objB: obj1,
    result: true,
  },
  {
    should: "return true when both objects are empty",
    objA: {},
    objB: {},
    result: true,
  },
  {
    should: "return false when objects do not have the same amount of keys",
    objA: { game: "chess", year: "1979", country: "Australia" },
    objB: { game: "chess", year: "1979" },
    result: false,
  },
  {
    should: "return false when there corresponding values which are not ===",
    objA: { first: obj1, second: obj2 },
    objB: { first: obj1, second: { language: "elm" } },
    result: false,
  },
  {
    should: "return true when all values are ===",
    objA: { first: obj1, second: obj2 },
    objB: { second: obj2, first: obj1 },
    result: true,
  },
  {
    should: "return false when objectA contains undefined",
    objA: { first: undefined },
    objB: { second: "green" },
    result: false,
  },
];

describe("shallowEqual on arrays", () => {
  arrTests.forEach((test) => {
    it("should " + test.should, () => {
      expect(shallowEqual(test.arrA, test.arrB)).toEqual(test.result);
    });
  });
});

describe("shallowEqual on objects", () => {
  objTests.forEach((test) => {
    it("should " + test.should, () => {
      expect(shallowEqual(test.objA, test.objB)).toEqual(test.result);
    });
  });
});

describe("shallowEqual on mixed array/objects", () => {
  it("should act correctly when types are mixed", () => {
    expect(shallowEqual(["boris", "johnson"], { boris: "johnson" })).toBe(
      false
    );
    expect(shallowEqual({ boris: "johnson" }, ["boris", "johnson"])).toBe(
      false
    );
    expect(shallowEqual(["boris", "johnson"], { liz: "truss" })).toBe(false);
    expect(shallowEqual({}, [])).toBe(false);
  });
});

describe("shallowEqual on primitive values of any type", () => {
  it("should act correctly", () => {
    expect(shallowEqual<any>(1, 2)).toBe(false);
    expect(shallowEqual<any>(1, 1)).toBe(true);
    expect(shallowEqual<any>("boris", "johnson")).toBe(false);
    expect(shallowEqual<any>("boris", "boris")).toBe(true);
  });
});

describe("shallowEqualObjects", () => {
  objTests.forEach((test) => {
    it("should " + test.should, () => {
      expect(shallowEqualObjects(test.objA, test.objB)).toEqual(test.result);
    });
  });

  it("should act correctly for primitive values of any type", () => {
    expect(shallowEqualObjects(1 as any, 2 as any)).toBe(false);
    expect(shallowEqualObjects(1 as any, 1 as any)).toBe(true);
    expect(shallowEqualObjects("boris" as any, "johnson" as any)).toBe(false);
    expect(shallowEqualObjects("boris" as any, "boris" as any)).toBe(true);
  });
});

describe("shallowEqualArrays", () => {
  arrTests.forEach((test) => {
    it("should " + test.should, () => {
      expect(shallowEqualArrays(test.arrA, test.arrB)).toEqual(test.result);
    });
  });

  it("should act correctly for primitive values of any type", () => {
    expect(shallowEqualArrays(1 as any, 2 as any)).toBe(false);
    expect(shallowEqualArrays(1 as any, 1 as any)).toBe(true);
    expect(shallowEqualArrays("boris" as any, "johnson" as any)).toBe(false);
    expect(shallowEqualArrays("boris" as any, "boris" as any)).toBe(true);
  });
});
