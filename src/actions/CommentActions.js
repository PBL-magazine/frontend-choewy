import Axios from '../utils/Axios';

const CommentActions = {
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
