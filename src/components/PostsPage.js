import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostActions from '../actions/PostActions';

const PostsPage = (props) => {
  const { user } = props;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const { ok, rows, message } = await PostActions.getPosts();
      if (!ok) return alert(message);
      setPosts(rows);
    };
    getPosts();
    return () => {};
  }, []);

  const renderPostImage = (image_url) => {
    if (!image_url) return <div>이미지 없음</div>;
    return <img src={image_url} alt="post_image" />;
  };

  const renderLikeButtonText = (post) => {
    if (!user) return '좋아요';

    const likesUserIds = post.likes.map((like) => like.user_id);
    if (likesUserIds.includes(user.user_id)) return '좋아요 취소';
    return '좋아요';
  };

  const onLikeButtonClick = async (post) => {
    const { ok, message } = await PostActions.likePost(post.post_id);
    if (!ok) return alert(message);

    const isLike = post.likes.find((like) => like.user_id === user.user_id);

    const likes = isLike
      ? post.likes.filter((like) => like.user_id !== user.user_id)
      : [...post.likes, { user_id: user.user_id }];

    setPosts(
      posts.map((row) =>
        row.post_id === post.post_id ? { ...row, likes } : row,
      ),
    );
  };

  return (
    <div className="container">
      <h1>게시물 목록 페이지</h1>
      <div>
        {posts.map((post, key) => (
          <div key={key}>
            <div>
              <h3>
                {post.user.nickname}({post.user.email})
              </h3>
              <div>
                <Link to={`/post/${post.post_id}`}>
                  {renderPostImage(post.image_url)}
                </Link>
              </div>
              <div>{post.content}</div>
              <div>
                <button onClick={() => onLikeButtonClick(post)}>
                  {renderLikeButtonText(post)}
                </button>{' '}
                : {post.likes.length}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
