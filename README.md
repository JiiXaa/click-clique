# click-clique

## User Stories

- As a user, I can create a new account, so that I can access all the features for signed up users.
- As a logged in user, I can create a post to share it with everyone else on the platform.
- As a user, I can view the details of a single post so that I can learn more about it.
- As a user, I can view all the most recent posts, so that is up to date with the newest content.
- As a user, I can search for posts with keywords, so that i can find the posts and user profiles I am most interested in.
- As a user I can keep scrolling trough the images that are loaded automatically so that I don't have to click on "next page".
- As a post owner I can edit my post so that I can make corrections or update it after it was created.
- As a logged in user I can add comments to a post so that I can share my thoughts about the post.
- As a user, I would like to read comments posted by users under posts so that I can be in touch with the community.
- As an owner of a comment I can edit my comment so that I can fix or update my existing comment.
- As a user I can see a list of the most followed profiles so that I can see which profiles are popular.
- As a user, I can view basic profile information like profile picture and name so that I can easily check a user's profile page.
- As a user I can view other users profiles so that I can see their profile stats and learn more about them.

## Technologies

- React
  react-router-dom (Routing, navigation: distinguish between active/non active nav Links using )
- React Bootstrap

## Features

- SPA (Single Page Application)
- Auth (Connection to the Back-End)
- 404 page

## Notes

- **Add JSDoc comments wherever possible as it provides clear code explanation**
- **Most followed profiles (does not get rerendered when user navigates between Home, Feed and Liked pages as it is same component located in App component)**
- **Popular profiles:**
  - Desktop view displays 10 most followed profiles
  - Mobile view displays 4 most followed profiles
