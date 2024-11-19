const registerWebsite = async (req, res) => {
    try {
      const { name, domain } = req.body;
      
      // Validate input
      if (!name || !domain) {
        return res.status(400).json({ message: 'Name and domain are required' });
      }
  
      // Check if domain already exists
      const existingWebsite = await Website.findOne({ domain });
      if (existingWebsite) {
        return res.status(409).json({ message: 'Domain already exists' });
      }
  
      // Create a new website
      const newWebsite = new Website({
        name,
        domain,
      });
  
      await newWebsite.save();
  
      res.status(201).json({
        message: 'Website added successfully',
        website: newWebsite,
      });
    } catch (error) {
      console.error('Error adding website:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

export {
    registerWebsite
}