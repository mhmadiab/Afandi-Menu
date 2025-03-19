import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { url } from '../../assets/assets';
import './List.css';

Modal.setAppElement('#root'); // Required for accessibility

const List = () => {
  const [list, setList] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [updatedData, setUpdatedData] = useState({ name: '', category: '', price: '', description: '' });
  const [image, setImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Could not fetch data");
      }
    } catch (error) {
      toast.error("Error fetching food items");
    }
  };

  console.log(list)

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      console.log(response.data);
      if (response.data.success) {
        await fetchList();
        toast.success(response.data.message);
      } else {
        toast.error("Error removing item");
      }
    } catch (error) {
      toast.error("Error");
    }
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setUpdatedData({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
    });
    setImage(null);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditItem(null);
  };

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const updateFood = async (e) => {
    e.preventDefault();
    if (!editItem) return;

    const formData = new FormData();
    formData.append('id', editItem._id);
    formData.append('name', updatedData.name);
    formData.append('category', updatedData.category);
    formData.append('price', updatedData.price);
    formData.append('description', updatedData.description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(`${url}/api/food/update`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        toast.success("Food item updated successfully");
        closeModal();
        fetchList();
      } else {
        toast.error("Error updating food item");
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Items:</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price} ل.ل</p>
            <div className="actions">
              <button className="edit-btn" onClick={() => openEditModal(item)}>Edit</button>
              <button className="delete-btn" onClick={() => removeFood(item._id)}>x</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Edit Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Food Item"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h3>Edit Food Item</h3>
        <form onSubmit={updateFood} className="edit-form">
          <input type="text" name="name" value={updatedData.name} onChange={handleChange} placeholder="Name" required />
          <input type="text" name="category" value={updatedData.category} onChange={handleChange} placeholder="Category" required />
          <input type="number" name="price" value={updatedData.price} onChange={handleChange} placeholder="Price" required />
          <textarea name="description" value={updatedData.description} onChange={handleChange} placeholder="Description" required />
          <label className="file-upload">
            Upload Image:
            <input type="file" onChange={handleImageChange} />
          </label>
          <div className="modal-buttons">
            <button type="submit" className="update-btn">Update</button>
            <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default List;

