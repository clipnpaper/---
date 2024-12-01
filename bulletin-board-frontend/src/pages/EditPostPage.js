import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPostPage = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // 기존 게시글 데이터 가져오기
        axios.get(`http://localhost:3000/posts/${id}`)
            .then((response) => {
                const { title, author, content, category } = response.data;
                setTitle(title);
                setAuthor(author);
                setContent(content);
                setCategory(category);
            })
            .catch((error) => console.error(error));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedPost = { title, author, content, category };

        // 게시글 수정 요청
        axios.put(`http://localhost:3000/posts/${id}`, updatedPost)
            .then(() => {
                alert('게시글이 성공적으로 수정되었습니다!');
                navigate(`/posts/${id}`); // 수정 완료 후 상세 페이지로 이동
            })
            .catch((error) => {
                console.error(error);
                alert('게시글 수정에 실패했습니다.');
            });
    };

    return (
        <div className="container">
            <h1>게시글 수정</h1>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>작성자</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>내용</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>카테고리</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="edit-button">수정 완료</button>
            </form>
        </div>
    );
};

export default EditPostPage;
