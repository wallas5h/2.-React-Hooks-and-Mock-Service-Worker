import { rest } from "msw";

//Mock Service Worker
export const getPokemons = rest.get(
  "https://pokeapi.co/api/v2/pokemon",
  (request, response, context) => {
    let offset: number | null = null;
    if (request.url.searchParams.get("offset") === null) {
      offset = 0;
    } else {
      offset = Number(request.url.searchParams.get("offset"));
    }

    if (!offset) {
      return response(
        context.json({
          results: [
            {
              name: "Test",
              url: "www.youtube.com/c/domancode",
            },
          ],
        })
      );
    }

    return response(
      context.json({
        results: [
          {
            name: "Test-10",
            url: "www.youtube.com/c/domancode",
          },
        ],
      })
    );
  }
);
