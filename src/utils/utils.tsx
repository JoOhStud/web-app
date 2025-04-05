// export const getSearchParams = (searchParams: {
//   [key: string]: string | number | boolean | null | undefined;
// }): string => {
//   const search = new URLSearchParams();
//   Object.entries(searchParams).forEach(([key, value]) => {
//     if (value !== null && value !== undefined) {
//       search.set(key, String(value));
//     }
//   });
//   return search.toString();
// };

export const getSearchParams = <
  T extends { [key: string]: string | number | boolean | null | undefined }
>(
  searchParams: T
): string => {
  const search = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      search.set(key, String(value));
    }
  });
  return search.toString();
};
