// import fetch from "cross-fetch";
import { useEffect, useRef, useState } from "react";

export function usePokemonsList({ defaultLimit = 10, defaultPage = 0 } = {}) {
  // use ref, przy każdym renderze mam dostęp do tej samej referencji
  const cache = useRef({});

  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(defaultPage);
  const [limit, setLimit] = useState(defaultLimit);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // min 31

  useEffect(() => {
    const cacheKey = `${limit}:${page}`;

    if (cache.current[cacheKey]) {
      return setPokemons(cache.current[cacheKey]);
    }

    let isMountedHook = true;

    setIsLoading(true);

    fetch(
      `https://pokeapi.co/api/v2/ability/?limit=${limit}&offset=${page * limit}`
    )
      .then((response) => {
        response.json();
      })
      .then(({ results }: any) => {
        if (!isMountedHook) {
          return;
        }

        cache.current[cacheKey] = results;
        setPokemons(results);

        return () => {
          isMountedHook = false;
        };
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, limit]);

  const changeLimit = (limit = defaultLimit) => setLimit(limit);
  const nextPage = () => setPage((prev) => ++prev);
  const previousPage = () => setPage((prev) => --prev);

  return { pokemon: pokemons, isLoading, nextPage, changeLimit, previousPage };
}
