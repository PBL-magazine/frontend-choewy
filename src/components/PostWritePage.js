import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostActions from '../actions/PostActions';

const PostWritePage = () => {
  const navigate = useNavigate();

  const [postDto, setPostDto] = useState({
    content: '',
    image: null,
  });

  const [previewDto, setPreviewDto] = useState({
    previewUrl: '',
  });

  const postDtoChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setPostDto({ ...postDto, [name]: value });
  };

  const postImageChange = (e) => {
    const {
      target: { files },
    } = e;
    const image = files[0];

    if (image) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);
      fileReader.onload = () => {
        const previewUrl = fileReader.result;
        setPreviewDto({ previewUrl });
      };
    }

    setPostDto({ ...postDto, image: image ? image : null });
  };

  const onSubmitButtonClick = async () => {
    const { content, image } = postDto;

    if (!content) return alert('게시물 내용을 입력하세요.');
    if (!image) return alert('이미지 파일을 선택하세요.');

    const { ok, message } = await PostActions.addPost(postDto);
    if (!ok) return alert(message);
    navigate('/');
  };

  const onCancleButtonClick = () => navigate('/post');

  const renderPreviewImage = () => {
    const { previewUrl } = previewDto;
    if (!previewUrl) return <div>선택된 이미지 없음</div>;
    return <img alt="post_image" src={previewUrl} />;
  };

  return (
    <div className="container">
      <h1>게시물 작성 페이지</h1>
      <div>
        <div>
          <h3>이미지</h3>
          {renderPreviewImage()}
          <input
            type="file"
            accept="image/*"
            file={postDto.image}
            onChange={postImageChange}
          />
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
          <button onClick={onSubmitButtonClick}>등록</button>
          <button onClick={onCancleButtonClick}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default PostWritePage;
