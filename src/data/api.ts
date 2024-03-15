export function api(path: string, init?: RequestInit) {
  const apiPrefix = "/parking";

  const url = new URL(
    apiPrefix.concat(path),
    process.env.NEXT_PUBLIC_API_BASE_URL,
  );
  return fetch(url, init);
}
