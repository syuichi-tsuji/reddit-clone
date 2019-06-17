import React, { Component } from 'react';

class Posts extends Component {
  handleUpvote = (post, key) => {
    this.props.firebase.ref('posts/' + key).set({
      title: post.title,
      upvote: post.upvote + 1,
      downvote: post.downvote
    });
  }

  handleDownvote = (post, key) => {
    this.props.firebase.ref('posts/' + key).set({
      title: post.title,
      upvote: post.upvote,
      downvote: post.downvote + 1
    });
  }

  render() {
    let posts = this.props.posts;
    let _this = this;

    if (!posts) {
      return false;
    }

    if (this.props.loading) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    return (
      <div className="Posts">
        { Object.keys(posts).map(function(key) {
            return (
              <section key={key} className="post clearfix">
                <div className="voting-buttons float-left">
                  <button
                    className="button"
                    onClick={ _this.handleUpvote.bind(this, posts[key], key) }
                    type="button"
                  >
                    Upvote
                  </button>
                  <button
                    className="button"
                    onClick={ _this.handleDownvote.bind(this, posts[key], key) }
                    type="button"
                  >
                    Downvote
                  </button>
                </div>
                <header>
                  <h2>Title: { posts[key].title }</h2>
                </header>
                <div>
                  <span className="vote-count">
                    Upvotes: { posts[key].upvote }
                  </span>
                  <span className="vote-count">
                    Downvotes: { posts[key].downvote }
                  </span>
                </div>
              </section>
            );
        })}
      </div>
    );
  }
}

export default Posts;
