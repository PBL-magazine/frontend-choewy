import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentActions from '../actions/CommentActions';

const PostCommentWrite = (props) => {
  const { user } = props;
  const { post_id } = useParams();
  const [commentDto, setCommentDto] = useState({
    content: '',
  });

  const commentDtoChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setCommentDto({ ...commentDto, [name]: value });
  };

  const onSubmitButtonClick = async () => {
    const { content } = commentDto;

    if (!content) return alert('댓글 내용을 입력하세요.');

    const { ok, message } = await CommentActions.addComment(
      post_id,
      commentDto,
    );
    if (!ok) return alert(message);

    /* Redux 적용 후 새로고침 대신 다시 API 요청하여 store 상태 업데이트 */
    window.location.reload();
  };

  const isDisabled = user ? false : true;
  const placeholder = user
    ? '댓글을 입력하세요.'
    : '로그인 후 댓글 작성이 가능합니다.';
  const buttonText = user ? '작성완료' : '로그인하세요.';

  return (
    <div className="container">
      <h2>댓글 남기기</h2>
      <textarea
        name="content"
        disabled={isDisabled}
        placeholder={placeholder}
        value={commentDto.content}
        onChange={commentDtoChange}
      />
      <button disabled={isDisabled} onClick={onSubmitButtonClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default PostCommentWrite;
