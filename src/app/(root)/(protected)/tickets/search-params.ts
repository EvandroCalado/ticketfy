import { createSearchParamsCache, parseAsString } from 'nuqs/server';

export const searchParse = parseAsString.withDefault('').withOptions({
  shallow: false,
  clearOnDefault: true,
});
export const sortParse = parseAsString.withDefault('newest').withOptions({
  shallow: false,
  clearOnDefault: true,
});

export const searchParamsCache = createSearchParamsCache({
  search: searchParse,
  sort: sortParse,
});
