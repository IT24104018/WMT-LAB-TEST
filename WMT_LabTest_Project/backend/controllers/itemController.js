import Item from "../models/Item.js";

const normalizeExpiryDate = (value) => {
  if (value === "" || value === null) return null;

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return null;

  return parsedDate;
};

export const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch item" });
  }
};

export const createItem = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (Object.prototype.hasOwnProperty.call(payload, "expiryDate")) {
      if (payload.expiryDate === "" || payload.expiryDate === null) {
        payload.expiryDate = null;
      } else {
        const parsedDate = normalizeExpiryDate(payload.expiryDate);
        if (!parsedDate) {
          return res.status(400).json({
            message: "Failed to create item",
            error: "Expiry Date must be a valid date",
          });
        }
        payload.expiryDate = parsedDate;
      }
    }

    const newItem = await Item.create(payload);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create item",
      error: error.message,
    });
  }
};

export const updateItem = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (Object.prototype.hasOwnProperty.call(payload, "expiryDate")) {
      if (payload.expiryDate === "" || payload.expiryDate === null) {
        payload.expiryDate = null;
      } else {
        const parsedDate = normalizeExpiryDate(payload.expiryDate);
        if (!parsedDate) {
          return res.status(400).json({
            message: "Failed to update item",
            error: "Expiry Date must be a valid date",
          });
        }
        payload.expiryDate = parsedDate;
      }
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update item",
      error: error.message,
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item" });
  }
};