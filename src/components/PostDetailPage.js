import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostActions from '../actions/PostActions';

const PostPage = (props) => {
  const { user } = props;
  const { post_id } = useParams();
  const navitgate = useNavigate();
  const [post, setPost] = useState(null);

  const getPost = useCallback(async () => {
    const { ok, row, message } = await PostActions.getPost(post_id);
    if (!ok) return alert(message);
    setPost(row);
  }, [post_id]);

  useEffect(() => {
    getPost();
    return () => {};
  }, [getPost]);

  if (post === null) return <></>;

  const onEditButtonClick = () => navitgate(`/post/${post_id}/edit`);
  const onDeleteButtonClick = async () => {
    const confirm = window.confirm('해당 게시물을 삭제하시겠습니까?');
    if (confirm) {
      const { ok, message } = await PostActions.deletePost(post_id);
      if (!ok) return alert(message);
      navitgate('/');
    }
  };

  const renderOwnerButton = () => {
    const isEditable = user.user_id === post.user.user_id || user.role === 1;
    if (user && isEditable) {
      return (
        <div>
          <button onClick={onEditButtonClick}>수정</button>
          <button onClick={onDeleteButtonClick}>삭제</button>
        </div>
      );
    }
  };

  const renderPostImage = () => {
    if (!post.image_url) return <div>없음</div>;
    return <img src={post.image_url} alt="post_image" />;
  };

  const renderLikeButton = () => {
    let buttonText = '좋아요';

    if (user) {
      const likesUserIds = post.likes.map((like) => like.user_id);
      buttonText = likesUserIds.includes(user.user_id)
        ? '좋아요 취소'
        : '좋아요';
    }

    return (
      <button onClick={onLikeButtonClick}>
        {buttonText}({post.likes.length})
      </button>
    );
  };

  const onLikeButtonClick = async () => {
    const { ok, message } = await PostActions.likePost(post_id);
    if (!ok) return alert(message);

    const isLike = post.likes.find((like) => like.user_id === user.user_id);
    const likes = isLike
      ? post.likes.filter((like) => like.user_id !== user.user_id)
      : [...post.likes, { user_id: user.user_id }];

    setPost({ ...post, likes });
  };

  return (
    <div className="container">
      <h1>게시물 상세 페이지</h1>
      {renderOwnerButton()}
      <div>
        <div>
          <h3>게시물 정보</h3>
          <p>닉네임 : {post.user.nickname}</p>
          <p>이메일 : {post.user.email}</p>
          <p>작성일자 : {post.createdAt}</p>
          <p>수정일자 : {post.updatedAt}</p>
        </div>
        <div>
          <h3>이미지</h3>
          {renderPostImage()}
        </div>
        <div>
          <h3>내용</h3>
          <p>{post.content}</p>
        </div>
        <div>{renderLikeButton()}</div>
      </div>
    </div>
  );
};

export default PostPage;
