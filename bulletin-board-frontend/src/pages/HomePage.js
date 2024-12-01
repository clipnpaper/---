import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const postsPerPage = 7; // 한 페이지에 표시할 글 수

    useEffect(() => {
        // 게시글 가져오기
        axios.get('http://localhost:3000/posts')
            .then((response) => {
                setPosts(response.data);
                setFilteredPosts(response.data);

                // 중복 제거된 카테고리 추출
                const uniqueCategories = [...new Set(response.data.map(post => post.category))].sort();
                setCategories(uniqueCategories);
            })
            .catch((error) => console.error(error));
    }, []);

    // 현재 페이지에 해당하는 글 목록 계산
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 변경
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 카테고리별 필터링
    const filterByCategory = (category) => {
        if (category === '전체') {
            setFilteredPosts(posts); // 전체 게시글 표시
        } else {
            setFilteredPosts(posts.filter(post => post.category === category));
        }
        setCurrentPage(1); // 필터링 시 첫 페이지로 이동
    };

    // 페이지 번호 생성
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container">
            <h1>자유 게시판</h1>

            {/* 카테고리 필터 버튼 */}
            <div className="category-buttons">
                <button onClick={() => filterByCategory('전체')} className="category-button">전체</button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => filterByCategory(category)}
                        className="category-button"
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* 게시글 목록 */}
            <ul>
                {currentPosts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>

            {/* 페이지네이션 */}
            <div className="pagination">
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`page-button ${number === currentPage ? 'active' : ''}`}
                    >
                        {number}
                    </button>
                ))}
            </div>
            <Link to="/create" className="create-button">게시글 작성</Link> {/* 작성 페이지 이동 버튼 */}
        </div>
    );
};

export default HomePage;
