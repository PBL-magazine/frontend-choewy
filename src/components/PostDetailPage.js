import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostActions from '../actions/PostActions';

const PostPage = (props) => {
  const { user } = props;
  const { post_id } = useParams();
  const navitgate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      const { ok, row, message } = await PostActions.getPost(post_id);
      if (!ok) return alert(message);
      setPost(row);
    };
    getPost();
    return () => {};
  }, [post_id]);

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
    if (user && user.user_id === post.user.user_id) {
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

  const renderLikeButtonText = () => {
    const likesUserIds = post.likesDetail.map(
      (likesDetail) => likesDetail.user_id,
    );
    if (likesUserIds.includes(user.user_id)) return '좋아요 취소';
    return '좋아요';
  };

  const onLikeButtonClick = async () => {
    const { ok, like, message } = await PostActions.likePost(post_id);
    if (!ok) return alert(message);

    const likes = like ? post.likes + 1 : post.likes - 1;
    const likesDetail = like
      ? [...post.likesDetail, { post_id, user_id: user.user_id, user }]
      : post.likesDetail.filter(
          (likesDetail) => likesDetail.user_id !== user.user_id,
        );

    setPost({ ...post, likes, likesDetail });
  };

  return (
    <div className="container">
      <h1>게시물 상세 페이지</h1>
      {renderOwnerButton()}
      <div>
        <div>
          <h3>이미지</h3>
          {renderPostImage()}
        </div>
        <div>
          <h3>내용</h3>
          <p>{post.content}</p>
        </div>
        <div>
          <h3>게시물 정보</h3>
          <p>닉네임 : {post.user.nickname}</p>
          <p>이메일 : {post.user.email}</p>
          <p>작성일자 : {post.createdAt}</p>
          <p>수정일자 : {post.updatedAt}</p>
        </div>
        <div>
          <button onClick={onLikeButtonClick}>{renderLikeButtonText()}</button>
          {' : '}
          {post.likes}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
