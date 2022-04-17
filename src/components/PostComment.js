import { useState } from 'react';
import CommentActions from '../actions/CommentActions';

const PostComment = (props) => {
  const { post_id, user, comment } = props;

  const [editable, setEditable] = useState(false);
  const [commentDto, setCommentDto] = useState({
    content: comment.content,
  });

  const editEnable = () => setEditable(true);
  const editDisable = () => setEditable(false);

  const commentDtoChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setCommentDto({ ...commentDto, [name]: value });
  };

  const onSaveButtonClick = async () => {
    const { content } = commentDto;
    if (!content) return alert('댓글 내용을 입력하세요.');

    const { ok, message } = await CommentActions.updateComment(
      post_id,
      comment.comment_id,
      commentDto,
    );

    if (!ok) return alert(message);
    window.location.reload();
  };

  const onDeleteButtonClick = async () => {
    const confirm = window.confirm('해당 댓글을 삭제하시겠습니까?');
    if (confirm) {
      const { ok, message } = await CommentActions.deleteComment(
        post_id,
        comment.comment_id,
      );
      if (!ok) return alert(message);
      window.location.reload();
    }
  };

  const renderContent = () => {
    return editable ? (
      <textarea
        name="content"
        value={commentDto.content}
        onChange={commentDtoChange}
      />
    ) : (
      <div>{comment.content}</div>
    );
  };

  const renderOwnerButton = () => {
    if (user === null) return <></>;
    if (user.user_id === comment.user_id) {
      if (editable)
        return (
          <div>
            <button onClick={onSaveButtonClick}>완료</button>
            <button onClick={editDisable}>취소</button>
          </div>
        );
      return (
        <div>
          <button onClick={editEnable}>수정</button>
          <button onClick={onDeleteButtonClick}>삭제</button>
        </div>
      );
    }
  };

  return (
    <div style={{ margin: '10px 0' }}>
      <div>
        <b>
          {comment.user.nickname}({comment.user.email})
        </b>
      </div>
      {renderContent()}
      <div>{comment.updatedAt}</div>
      {renderOwnerButton()}
    </div>
  );
};

export default PostComment;
