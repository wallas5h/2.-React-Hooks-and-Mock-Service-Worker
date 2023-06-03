import { setupServer } from "msw/node";
import { getPokemons } from "./mocks/handler";

export const server = setupServer(getPokemons);
