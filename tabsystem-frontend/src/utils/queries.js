export const areAnyLoading = (...queries) =>
  queries.some(({ status }) => status === "loading");
export const areAnyFailed = (...queries) =>
  queries.some(({ error }) => !!error);
export const areAllLoaded = (...queries) =>
  queries.every(
    ({ status, error, data }) => status === "success" && !error && !!data
  );
