import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 서버에서 특정 게시글 가져오기
        axios.get(`http://localhost:3000/posts/${id}`)
            .then((response) => setPost(response.data))
            .catch((error) => console.error(error));
    }, [id]);

    if (!post) return <div className="container">로딩 중...</div>;

    return (
        <div className="container">
            <h1>{post.title}</h1>
            <p><strong>작성자:</strong> {post.author}</p>
            <p>{post.content}</p>
            <p><strong>카테고리:</strong> {post.category}</p>

            <Link to="/" className="back-button">목록으로 돌아가기</Link>
            <button
                onClick={() => navigate(`/posts/${id}/edit`)}
                className="edit-button"
            >
                수정하기
            </button>
        </div>
    );
};

export default PostPage;
