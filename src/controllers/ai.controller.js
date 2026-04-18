import Property from '../models/Property.model.js';
import { chatWithData } from '../services/ai.service.js';

export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    const subcities = ["Bole", "CMC", "Lebu", "Ayat", "Old Airport", "Kazanchis"];
    let foundSubcity = subcities.find(s => message.toLowerCase().includes(s.toLowerCase()));

    let query = {};
    if (foundSubcity) query.subcity = new RegExp(foundSubcity, 'i');
    
    const matches = await Property.find(query).limit(5).select('-agentId');

    const aiResponse = await chatWithData(message, matches);

    res.json({ response: aiResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};