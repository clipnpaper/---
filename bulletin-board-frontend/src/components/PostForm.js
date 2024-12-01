import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = { title, author, content, category };

        // 서버에 게시글 추가 요청
        axios.post('http://localhost:3000/posts', postData)
            .then((response) => {
                console.log(response.data);
                onSubmit(); // 게시글 등록 후 콜백 실행
            })
            .catch((error) => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>제목:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>작성자:</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div>
                <label>내용:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div>
                <label>카테고리:</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <button type="submit">등록</button>
        </form>
    );
};

export default PostForm;
