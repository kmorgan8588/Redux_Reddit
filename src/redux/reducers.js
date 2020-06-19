import { combineReducers } from 'redux';
import {
  SELECT_SUBREDDT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECIEVE_POSTS,
} from './actions';

const selectedSubreddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_SUBREDDT:
      return action.subreddit;
    default:
      return state;
  }
};

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items = [],
}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {...state, ...{
        didInvalidate: true,
      }}
    case REQUEST_POSTS:
      return {...state, ...{
        isFetching: true,
        didInvalidate: false,
      }}
    case RECIEVE_POSTS:
      return {...state, ...{
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
      }}
    default:
      return state;
  }
};

const postsBySubreddit = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECIEVE_POSTS:
    case REQUEST_POSTS:
      return {...state, ...{
        [action.subreddit] : posts(state[action.subreddit], action)
      }}
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
})

export default rootReducer;
