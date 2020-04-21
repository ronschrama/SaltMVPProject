import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';

function Placeholder() {
  useEffect(() => {

  }, []);

  return (
    <div>
      <p>Hallo</p>
    </div>
  )
}

const mapStateToProps = state => ({
  posts: state.posts.items
});

export default connect(null, { fetchPosts })(Placeholder);
