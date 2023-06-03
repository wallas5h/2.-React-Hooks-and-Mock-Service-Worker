import { act, renderHook } from "@testing-library/react-hooks";
import { responses } from "../mocks/pockemonResponses";
import { server } from "../server";
import { usePokemonsList } from "../usePokemonsList";

describe("testing usePokemonsList hook", () => {
  it("should fetch data mounting and change state to loading", async () => {
    const { result } = renderHook(() => {
      return usePokemonsList();
    });

    // tu dane sę jeszcze nie załadowały
    expect(result.current.pokemon).toStrictEqual([]);
    expect(result.current.isLoading).toBe(true);
  });

  it("should fetch data mounting and change state to loading", async () => {
    const { result, waitForNextUpdate } = renderHook(() => {
      return usePokemonsList();
    });

    // waitForNextUpdate powoduje to że czekamy aż załadują się dane
    await waitForNextUpdate();
    expect(result.current.pokemon).toStrictEqual(responses[0]);
    expect(result.current.isLoading).toBe(false);
  });

  it("should fetch data mounting and change state to loading", async () => {
    const { result, waitForNextUpdate } = renderHook(() => {
      return usePokemonsList();
    });

    // waitForNextUpdate powoduje to że czekamy aż załadują się dane
    await waitForNextUpdate();

    act(() => result.current.nextPage());
    expect(result.current.pokemon).toStrictEqual(responses[0]);
    expect(result.current.isLoading).toBe(true);

    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.pokemon).toStrictEqual(responses[0]);
  });

  // pobieranie danych z cache
  it("should fetch data mounting and change state to loading", async () => {
    const { result, waitForNextUpdate } = renderHook(() => {
      return usePokemonsList();
    });

    await waitForNextUpdate();
    act(() => result.current.nextPage());
    await waitForNextUpdate();
    act(() => result.current.previousPage());
    expect(result.current.pokemon).toStrictEqual(responses[0]);
    expect(result.current.isLoading).toBe(false);
  });
});

// -----------------------------------Mocked Server

describe("using mocked data from Mocked Service Worker", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should fetch data mounting and change state to loading", async () => {
    const { result } = renderHook(() => {
      return usePokemonsList();
    });

    // tu dane sę jeszcze nie załadowały
    expect(result.current.pokemon).toStrictEqual([]);
    expect(result.current.isLoading).toBe(true);
  });

  it("should fetch data mounting and change state to loading", async () => {
    const { result, waitForNextUpdate } = renderHook(() => {
      return usePokemonsList();
    });

    // waitForNextUpdate powoduje to że czekamy aż załadują się dane
    await waitForNextUpdate();
    expect(result.current.pokemon).toStrictEqual(responses[0]);
    expect(result.current.isLoading).toBe(false);
  });

  it("should fetch data mounting and change state to loading", async () => {
    const { result, waitForNextUpdate } = renderHook(() => {
      return usePokemonsList();
    });

    await waitForNextUpdate();

    act(() => result.current.nextPage());
    expect(result.current.pokemon).toStrictEqual(responses[0]);
    expect(result.current.isLoading).toBe(true);

    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.pokemon).toStrictEqual(responses[0]);
  });

  // pobieranie danych z cache
  it("should fetch data mounting and change state to loading", async () => {
    const { result, waitForNextUpdate } = renderHook(() => {
      return usePokemonsList();
    });

    await waitForNextUpdate();
    act(() => result.current.nextPage());
    await waitForNextUpdate();
    act(() => result.current.previousPage());
    expect(result.current.pokemon).toStrictEqual(responses[0]);
    expect(result.current.isLoading).toBe(false);
  });
});
