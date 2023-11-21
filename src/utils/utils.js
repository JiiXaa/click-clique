import { axiosRes } from '../api/axiosDefaults';

/**
 * Fetches and appends more data for a paginated resource. This function is versatile and can be used for any type of paginated data, such as comments, posts, and profiles.
 *
 * @param {Object} resource - The current state of the resource, which includes a 'next' property. This 'next' property is a URL provided by the Django Rest Framework for fetching the next page of data.
 * @param {Function} setResource - A state setter function for updating the resource state. This function takes a callback that receives the previous state and returns the new state.
 *
 * @example
 * fetchMoreData(paginatedData, setPaginatedData);
 */
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosRes.get(resource.next);

    setResource((prevResource) => ({
      ...prevResource,
      next: data.next, // Link to the next page of results.
      results: data.results.reduce((acc, cur) => {
        // Spread the previous results and remove any duplicates.
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (error) {
    console.error(error);
  }
};
