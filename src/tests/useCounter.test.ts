import { act, renderHook } from "@testing-library/react-hooks";
import { useCounter } from "../useCounter";

describe("testing useCounter hook", () => {
  it("should return 0 as default value without argument", async () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.counterValue).toBe(0);
  });

  it("should return default value provided as an argument", async () => {
    const { result } = renderHook(() => useCounter({ defaultValue: 5 }));

    expect(result.current.counterValue).toBe(5);
  });

  it("should return should incremented value once increment function is called", async () => {
    const { result } = renderHook(() => useCounter());

    // act - działa to troche asynchronicznie

    act(() => result.current.increment());
    expect(result.current.counterValue).toBe(1);

    act(() => result.current.increment());
    expect(result.current.counterValue).toBe(2);
  });

  it("should return should decremented value once decrement function is called", async () => {
    const { result } = renderHook(() => useCounter());

    // act - działa to troche asynchronicznie

    act(() => result.current.decrement());
    expect(result.current.counterValue).toBe(-1);

    act(() => result.current.decrement());
    expect(result.current.counterValue).toBe(-2);
  });

  it("should return should incremented until maxValue", async () => {
    const { result } = renderHook(() =>
      useCounter({
        defaultValue: 5,
        maxValue: 6,
      })
    );

    act(() => result.current.increment());
    expect(result.current.counterValue).toBe(6);

    act(() => result.current.increment());
    expect(result.current.counterValue).toBe(6);
  });

  it("should return should decremented until minValue", async () => {
    const { result } = renderHook(() =>
      useCounter({
        defaultValue: 5,
        minValue: 6,
      })
    );

    act(() => result.current.decrement());
    expect(result.current.counterValue).toBe(6);

    act(() => result.current.decrement());
    expect(result.current.counterValue).toBe(6);
  });

  it("should return defaultValue as counter value after reset", async () => {
    const { result } = renderHook(() =>
      useCounter({
        defaultValue: 1900,
      })
    );

    act(() => result.current.decrement());

    act(() => result.current.reset());
    expect(result.current.counterValue).toBe(1900);
  });
});
