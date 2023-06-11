app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Compare the password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
       // Generate a JWT
    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});