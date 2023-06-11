app.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed' });
  });