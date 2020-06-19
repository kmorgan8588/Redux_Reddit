import React from 'react';
import PropTypes from 'prop-types';

const Posts = (props) => {
  const { posts } = props;

  return (
    <ul>
      {posts.map((post, index) => (
        <li key={index}>
          <a target="_blank" href={`https://www.reddit.com${post.permalink}`}>
            {post.title}
          </a>
          {' - '}
          <a target="_blank" href={`https://www.reddit.com/u/${post.author}`}>
            {post.author}
          </a>
        </li>
      ))}
    </ul>
  );
};
Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
