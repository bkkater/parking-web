const BASE_URL = "https://parking-lot-to-pfz.herokuapp.com";

export function api(path: string, init?: RequestInit) {
  const apiPrefix = "/parking";

  const url = new URL(apiPrefix.concat(path), BASE_URL);
  return fetch(url, init);
}
