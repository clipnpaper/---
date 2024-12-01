import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = { title, author, content, category };

        axios.post('http://localhost:3000/posts', postData)
            .then(() => {
                alert('게시글이 성공적으로 등록되었습니다!');
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
                alert('게시글 등록에 실패했습니다.');
            });
    };

    return (
        <div className="container">
            <h1> 게시판 작성 </h1>
            <form onSubmit={handleSubmit}>
                {/* 제목 */}
                <div className="title-field">
                    <label>제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                {/* 작성자 */}
                <div className="author-field">
                    <label>작성자</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>

                {/* 내용 */}
                <div className="content-field">
                    <label>내용</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows="10"
                    />
                </div>

                {/* 카테고리 */}
                <div className="category-field">
                    <label>카테고리</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>

                {/* 작성 버튼 */}
                <div className="submit-button-container">
                    <button type="submit" className="submit-button">작성</button>
                </div>
            </form>
        </div>
    );
};

export default CreatePostPage;