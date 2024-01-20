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

/**
 * Updates profile data in the frontend state after a follow action is performed. This function ensures that the follower and following counts are updated correctly depending on the context (whether the profile being followed or the current user's profile is being updated).
 *
 * @param {Object} profile - The profile currently being processed. This could be any user's profile from the list of profiles.
 * @param {Object} clickedProfile - The profile that the current user has clicked on to follow.
 * @param {number|null} following_id - The ID representing the follow relationship. If the current user is following the clickedProfile, this should be the ID of the follow relationship. If the current user is not following, it should be null.
 *
 * @returns {Object} The updated profile object. If the profile is the one being followed, its followers_count is incremented and following_id is updated. If the profile belongs to the current user, its following_count is incremented. Otherwise, the profile is returned unchanged.
 *
 * @example
 * const updatedProfiles = profileData.map((profile) =>
 *   followHelper(profile, clickedProfile, following_id)
 * );
 */
export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? // This is the profile that was clicked
      // update followers count and set following_id
      {
        ...profile,
        following_id,
        followers_count: profile.followers_count + 1,
      }
    : profile.is_owner
    ? // This is the current user's profile
      // update the following count
      {
        ...profile,
        following_count: profile.following_count + 1,
      }
    : // this is not the profile that was clicked or the profile the user owns, so return the profile as is
      profile;
};

/**
 * Updates profile data in the frontend state after an unfollow action is performed. This function adjusts the follower and following counts appropriately, depending on whether the profile being unfollowed or the current user's profile is being updated.
 *
 * @param {Object} profile - The profile currently being processed. This could be any user's profile from the list of profiles.
 * @param {Object} clickedProfile - The profile that the current user has clicked on to unfollow.
 *
 * @returns {Object} The updated profile object. If the profile is the one being unfollowed, its followers_count is decremented and following_id is set to null. If the profile belongs to the current user, its following_count is decremented. Otherwise, the profile is returned unchanged.
 *
 * @example
 * const updatedProfiles = profileData.map((profile) =>
 *   unfollowHelper(profile, clickedProfile)
 * );
 */

export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? // This is the profile that was clicked
      // update followers count and set following_id
      {
        ...profile,
        following_id: null,
        followers_count: profile.followers_count - 1,
      }
    : profile.is_owner
    ? // This is the current user's profile
      // update the following count
      {
        ...profile,
        following_count: profile.following_count - 1,
      }
    : // this is not the profile that was clicked or the profile the user owns, so return the profile as is
      profile;
};
