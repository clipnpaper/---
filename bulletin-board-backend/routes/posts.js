const pool = require('../db/connection');

module.exports = (app) => {
    // 게시글 전체 조회
    app.get('/posts', async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT * FROM Posts');
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // 특정 게시글 조회
    app.get('/posts/:id', async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT * FROM Posts WHERE id = ?', [req.params.id]);
            if (rows.length === 0) return res.status(404).json({ error: 'Post not found' });
            res.status(200).json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // 게시글 작성
    app.post('/posts', async (req, res) => {
        const { title, author, content, category } = req.body;
        try {
            const [result] = await pool.query('INSERT INTO Posts (title, author, content, category) VALUES (?, ?, ?, ?)', [title, author, content, category]);
            res.status(201).json({ id: result.insertId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // 게시글 수정
    app.put('/posts/:id', async (req, res) => {
        const { title, author, content, category } = req.body;
        try {
            const [result] = await pool.query('UPDATE Posts SET title = ?, author = ?, content = ?, category = ? WHERE id = ?', [title, author, content, category, req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Post not found' });
            res.status(200).json({ message: 'Post updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // 게시글 삭제
    app.delete('/posts/:id', async (req, res) => {
        try {
            const [result] = await pool.query('DELETE FROM Posts WHERE id = ?', [req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Post not found' });
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};
