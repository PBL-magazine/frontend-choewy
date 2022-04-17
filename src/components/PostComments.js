import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentActions from '../actions/CommentActions';
import PostComment from './PostComment';

const PostComments = (props) => {
  const { user } = props;
  const { post_id } = useParams();
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const getComments = async () => {
      const { ok, rows, message } = await CommentActions.getComments(post_id);
      if (!ok) return alert(message);
      setComments(rows);
    };
    getComments();
    return () => {};
  }, [post_id]);

  if (comments === null) return <></>;

  return (
    <div className="container">
      <h2>댓글 목록</h2>
      {comments.map((comment, key) => {
        const PostCommentProps = { key, post_id, user, comment };
        return <PostComment {...PostCommentProps} />;
      })}
    </div>
  );
};

export default PostComments;
