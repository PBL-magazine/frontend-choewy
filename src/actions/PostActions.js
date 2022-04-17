import Axios from '../utils/Axios';

const PostActions = {
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
  addPost: async (postDto) => {
    const { content, image } = postDto;

    console.log(postDto);
    if (!content) return alert('게시물 내용을 입력하세요.');
    if (!image) return alert('이미지 파일을 선택하세요.');

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
  updatePost: async (post_id, postDto) => {
    const { content } = postDto;

    if (!content) return alert('게시물 내용을 입력하세요.');

    return await Axios.patch(`/api/posts/${post_id}`, { content })
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
