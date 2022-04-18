import { useState } from 'react';
import { Link } from 'react-router-dom';
import PostActions from '../actions/PostActions';

const PostCard = (props) => {
  const { user } = props;
  const [post, setPost] = useState(props.post);

  const renderPostImage = (image_url) => {
    if (!image_url) return <div>이미지 없음</div>;
    return <img src={image_url} alt="post_image" />;
  };

  const renderLikeButtonText = () => {
    if (!user) return '좋아요';

    const likesUserIds = post.likes.map((like) => like.user_id);
    if (likesUserIds.includes(user.user_id)) return '좋아요 취소';
    return '좋아요';
  };

  const onLikeButtonClick = async () => {
    const { ok, message } = await PostActions.likePost(post.post_id);
    if (!ok) return alert(message);

    const isLike = post.likes.find((like) => like.user_id === user.user_id);

    const likes = isLike
      ? post.likes.filter((like) => like.user_id !== user.user_id)
      : [...post.likes, { user_id: user.user_id }];

    setPost({ ...post, likes });
  };

  return (
    <div className="container">
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
        <button onClick={() => onLikeButtonClick()}>
          {renderLikeButtonText()}
        </button>{' '}
        : {post.likes.length}
      </div>
    </div>
  );
};

export default PostCard;
