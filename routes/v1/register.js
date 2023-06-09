app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
  
      res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  });