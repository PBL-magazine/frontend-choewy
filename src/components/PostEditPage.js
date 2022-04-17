import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostActions from '../actions/PostActions';

const PostEditPage = () => {
  const { post_id } = useParams();
  const navigate = useNavigate();
  const [postDto, setPostDto] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      const { ok, row, message } = await PostActions.getPost(post_id);
      if (!ok) return alert(message);
      setPostDto(row);
    };
    getPost();

    return () => {};
  }, [post_id]);

  if (postDto === null) return <></>;

  const postDtoChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setPostDto({ ...postDto, [name]: value });
  };

  const onSubmitButtonClick = async () => {
    const { ok, message } = await PostActions.updatePost(post_id, postDto);
    if (!ok) return alert(message);
    navigate(`/post/${post_id}`);
  };

  const onCancleButtonClick = () => navigate(`/post/${post_id}`);

  return (
    <div className="container">
      <h1>게시물 수정 페이지</h1>
      <div>
        <div>
          <h3>이미지</h3>
          <img alt="post_image" src={postDto.image_url} />
        </div>
        <div>
          <h3>게시물 내용</h3>
          <textarea
            name="content"
            value={postDto.content}
            onChange={postDtoChange}
          />
        </div>
        <div>
          <button onClick={onSubmitButtonClick}>수정</button>
          <button onClick={onCancleButtonClick}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default PostEditPage;
