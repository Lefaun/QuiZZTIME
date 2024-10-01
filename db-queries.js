// Endpoint to handle question submission
app.post('/api/submit-question', async (req, res) => {
    const { question, option1, option2, correctAnswer } = req.body;

    const client = await pool.connect();
    try {
        const queryText = 'INSERT INTO questions (question, option1, option2, correct_answer) VALUES ($1, $2, $3, $4)';
        await client.query(queryText, [question, option1, option2, correctAnswer]);
        res.status(201).json({ message: 'Question added successfully' });
    } catch (error) {
        console.error('Error inserting question:', error);
        res.status(500).json({ error: 'Failed to add question' });
    } finally {
        client.release();
    }
});

// Endpoint to get random questions
app.get('/api/random-questions', async (req, res) => {
    const count = parseInt(req.query.count) || 1;
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM questions ORDER BY RANDOM() LIMIT $1', [count]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error retrieving questions:', error);
        res.status(500).json({ error: 'Failed to retrieve questions' });
    } finally {
        client.release();
    }
});
