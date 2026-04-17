import User from "../models/User.model.js";

// Get pending agents
export const getPendingAgents = async (req, res) => {
  try {
    const agents = await User.find({
      role: "agent",
      status: "pending"
    });

    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve agent
export const approveAgent = async (req, res) => {
  try {
    const agent = await User.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    res.json(agent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
