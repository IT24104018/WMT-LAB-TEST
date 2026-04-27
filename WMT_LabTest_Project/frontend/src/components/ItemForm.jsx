import { useState } from "react";

function ItemForm({ initialValues, onSubmit, submitText }) {
  const normalizedInitialValues = initialValues
    ? {
        ...initialValues,
        expiryDate: initialValues.expiryDate
          ? String(initialValues.expiryDate).slice(0, 10)
          : "",
      }
    : null;

  const [formData, setFormData] = useState(
    normalizedInitialValues || {
      name: "",
      category: "",
      price: "",
      description: "",
      imageUrl: "",
      expiryDate: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: Number(formData.price),
      expiryDate: formData.expiryDate || null,
    });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>{submitText}</h2>

      <label>Item Name</label>
      <input name="name" value={formData.name} onChange={handleChange} required />

      <label>Category</label>
      <input name="category" value={formData.category} onChange={handleChange} required />

      <label>Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label>Description</label>
      <textarea
        name="description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Image URL</label>
      <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />

      <label>Expiry Date</label>
      <input
        type="date"
        name="expiryDate"
        value={formData.expiryDate}
        onChange={handleChange}
      />

      <button className="btn primary" type="submit">{submitText}</button>
    </form>
  );
}

export default ItemForm;