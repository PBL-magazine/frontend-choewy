import Axios from '../utils/Axios';

const PostActions = {
  /* 모든 게시물의 정보를 요청합니다. */
  getPosts: async () => {
    return await Axios.get('/api/posts')
      .then((response) => {
        const {
          data: { ok, rows },
        } = response;
        return { ok, rows };
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

  /* 특정 게시물의 정보를 요청합니다. */
  getPost: async (post_id) => {
    return await Axios.get(`/api/posts/${post_id}`)
      .then((response) => {
        const {
          data: { ok, row },
        } = response;
        return { ok, row };
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

  /* 특정 게시물에 대한 자신의 좋아요 상태를 변경합니다. */
  likePost: async (post_id) => {
    return await Axios.put(`/api/posts/${post_id}/like`)
      .then((response) => {
        const {
          data: { ok, like },
        } = response;
        return { ok, like };
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

  /* 새로운 게시물을 발행합니다. */
  addPost: async (postDto) => {
    const formData = new FormData();
    Object.keys(postDto).forEach((key) => {
      formData.append(key, postDto[key]);
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    return await Axios.post('/api/posts', formData, config)
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

  /* 자신의 게시물의 내용을 수정합니다(현재 상태에서는 이미지 수정이 불가능합니다). */
  updatePost: async (post_id, postDto) => {
    return await Axios.patch(`/api/posts/${post_id}`, postDto)
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

  /* 자신의 게시물을 삭제합니다. */
  deletePost: async (post_id) => {
    return await Axios.delete(`/api/posts/${post_id}`)
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
};

export default PostActions;
