import jwt from 'jsonwebtoken';
import Admin from "../model/admin.model.js";

export const authenticateAdmin = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT with your secret key
    const admin = await Admin.findById(decoded.id); // Find admin by decoded ID
    if (!admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }
    req.admin = admin; 
    next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
