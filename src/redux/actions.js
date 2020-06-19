import fetch from 'cross-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECIEVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

export const selectSubreddit = (selectSubreddit = (subreddit) => ({
  type: SELECT_SUBREDDIT,
  subreddit,
}));

export const invalidateSubreddit = (invalidateSubreddit = (subreddit) => ({
  type: INVALIDATE_SUBREDDIT,
  subreddit,
}));

const requestPosts = (subreddit) => ({ type: REQUEST_POSTS, subreddit });

const receivePosts = (subreddit, json) => ({
  type: RECIEVE_POSTS,
  subreddit,
  posts: json.data.children.map((child) => child.data),
  receivedAt: Date.now(),
});

const fetchPosts = (subreddit) => (dispatch) => {
  dispatch(requestPosts(subreddit));
  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then((response) => response.json())
    .then((json) => dispatch(receivePosts(json)));
};

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else return posts.didInvalidate;
};

export const fetchPostsIfNeeded = (fetchPostsIfNeeded = (subreddit) => (
  dispatch,
  getState,
) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit));
  }
});
