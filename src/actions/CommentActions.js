import Axios from '../utils/Axios';

const CommentActions = {
  /* 특정 게시물의 모든 댓글 정보를 요청합니다. */
  getComments: async (post_id) => {
    return await Axios.get(`/api/posts/${post_id}/comments`)
      .then((response) => {
        const {
          data: { ok, rows },
        } = response;
        return { ok, rows };
      })
      .catch((error) => {
        const {
          response: {
            error: { ok, message },
          },
        } = error;
        return { ok, message };
      });
  },

  /* 특정 게시물에 새로운 댓글을 등록합니다. */
  addComment: async (post_id, commentDto) => {
    return await Axios.post(`/api/posts/${post_id}/comments`, commentDto)
      .then((response) => {
        const {
          data: { ok },
        } = response;
        return { ok };
      })
      .catch((error) => {
        const {
          response: {
            data: { ok, message },
          },
        } = error;
        return { ok, message };
      });
  },

  /* 특정 게시물에 자신의 댓글을 수정합니다. */
  updateComment: async (post_id, comment_id, commentDto) => {
    return await Axios.patch(
      `/api/posts/${post_id}/comments/${comment_id}`,
      commentDto,
    )
      .then((response) => {
        const {
          data: { ok },
        } = response;
        return { ok };
      })
      .catch((error) => {
        const {
          response: {
            data: { ok, message },
          },
        } = error;
        return { ok, message };
      });
  },

  /* 특정 게시물에 자신의 댓글을 삭제합니다. */
  deleteComment: async (post_id, comment_id) => {
    return await Axios.delete(`/api/posts/${post_id}/comments/${comment_id}`)
      .then((response) => {
        console.log(response);
        const {
          data: { ok },
        } = response;
        return { ok };
      })
      .catch((error) => {
        const {
          response: {
            data: { ok, message },
          },
        } = error;
        return { ok, message };
      });
  },
};

export default CommentActions;
