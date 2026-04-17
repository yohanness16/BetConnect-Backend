import Bookmark from "../models/bookmark.model.js";

// Add bookmark
export const addBookmark = async (req, res) => {
  const userId = req.user._id;
  const { propertyId } = req.params;

  const exists = await Bookmark.findOne({
    user: userId,
    property: propertyId
  });

  if (exists) {
    return res.status(400).json({ message: "Already bookmarked" });
  }

  const bookmark = await Bookmark.create({
    user: userId,
    property: propertyId
  });

  res.status(201).json(bookmark);
};

// Get bookmarks
export const getBookmarks = async (req, res) => {
  const bookmarks = await Bookmark.find({ user: req.user._id })
    .populate("property");

  res.json(bookmarks);
};

// Remove bookmark
export const removeBookmark = async (req, res) => {
  const userId = req.user._id;
  const { propertyId } = req.params;

  const deleted = await Bookmark.findOneAndDelete({
    user: userId,
    property: propertyId
  });

  if (!deleted) {
    return res.status(404).json({ message: "Bookmark not found" });
  }

  res.json({ message: "Bookmark removed" });
};
