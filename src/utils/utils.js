import { axiosRes } from '../api/axiosDefaults';

// * Can be reused with any paginated data like comments, posts and profiles.
export const fetchMoreData = async (resource, setResource) => {
  try {
    // * resource.next is a URL for the next page of data to fetch (if it exists) Next is a Django Rest Framework convention and is automatically added to the response data.
    const { data } = await axiosRes.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      // * Link to the next page of results for the page we just fetched
      next: data.next,
      // * Spread the previous results and remove any duplicates
      results: data.results.reduce((acc, cur) => {
        // * If the current result is already in the accumulator, return the accumulator. Otherwise, return the accumulator with the current result added to it.
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (error) {
    console.error(error);
  }
};
