import AdminNavbar from "../../../../components/adminNavbar/AdminNavbar";
import Styles from './stylists.module.css';
import { useState, useRef } from "react";
import { useDispatch } from 'react-redux';
import { addStylist, fetchStylists } from "../../../../features/slices/stylistSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {deleteStylist, updateStylist} from "../../../../features/slices/stylistSlice";
export default function Stylists() {
   const { stylists, stylistStatus, stylistError } = useSelector((state) => state.stylists);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    stylistName: '',
    description: '',
    rating: '',
    status: 'Available',
    daysAvailable: [],
    imageUrl: '' // New field for image URL
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStylistId, setEditingStylistId] = useState(null);
  useEffect(() => {
    dispatch(fetchStylists());
  }, [dispatch]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsImageUploading(true);
    const temporaryUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, imageUrl: temporaryUrl }));

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "image_uploader_preset");
    data.append("cloud_name", "dcli1vwir");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dcli1vwir/image/upload", {
        method: "post",
        body: data,
      });
      if (!response.ok) {
        throw new Error('Image upload failed');
      }
      const jsonResponse = await response.json();
      const url = jsonResponse.url;
   
      setFormData((prev) => ({ ...prev, imageUrl: url }));
    } catch (error) {
   
      setFormData((prev) => ({ ...prev, imageUrl: '' }));
      // You can add error message to UI if needed
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleAddStylist = () => {
   
    const newStylistData = {
      ...formData,
      rating: formData.rating ? Number(formData.rating) : 0
    };
    dispatch(addStylist(newStylistData));
    setFormData({
      stylistName: '',
      description: '',
      rating: '',
      status: 'Available',
      daysAvailable: [],
      imageUrl: ''

    });

  
  };
  const handleUpdateStylist = (stylist) => {
    // Implement update functionality here

    // You can open a modal or navigate to an update page with stylist details
    // open add form with existing data
    setFormData({
      stylistName: stylist.stylistName,
      description: stylist.description,
      rating: stylist.rating,
      status: stylist.status,
      daysAvailable: stylist.daysAvailable,
      imageUrl: stylist.imageUrl
    });
    setIsFormVisible(true);
    setIsEditing(true);
    setEditingStylistId(stylist.id);
  }
  const handleDeleteStylist = (stylistId) => {
    // Implement delete functionality here
   
    // You can dispatch a delete action here
    dispatch(deleteStylist(stylistId));
  }

  const updatingStylist = () => {
    let  updatedStylistData = {
      ...formData,
    
    }

    dispatch(updateStylist({id: editingStylistId, stylistData: updatedStylistData}));
    // Clear form and states
    setFormData({
      stylistName: '',
      description: '',
      rating: '',
      status: 'Available',
      daysAvailable: [],
      imageUrl: ''  

    }
    );;
    setIsFormVisible(false);
    setIsEditing(false);
    setEditingStylistId(null);
  }
  

  return (
    <div className={Styles.Stylists}>
      <div className={Styles.AdminNavbar}><AdminNavbar /></div>
      <div className={Styles.Stylists_container}>
        <div className={Styles.Stylists_TopBox}>
          <h1>Stylists</h1>
          <button onClick={() => setIsFormVisible(!isFormVisible)} className={Styles.AddStylistButton}>Add Stylist</button>
        </div>
        {isFormVisible && (
          <div className={Styles.AddStylistForm}>
            <h2>{isEditing ? "Edit Stylist" : "Add New Stylist"}</h2>
            <div className={Styles.ImgDetailContainer}>
              <div className={Styles.ImgContainer} onClick={handleImageClick}>
                <img
                  src={formData.imageUrl || require("../../../../assets/avatar-default-symbolic-svgrepo-com.png")} // Default image path, adjust as needed
                  alt="Stylist Preview"
                />
                <div className={Styles.uploadOverlay}>Upload New</div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  accept="image/*"
                />
              </div>
            </div>
            {isImageUploading && <p>Uploading image...</p>}
            <label className={Styles.Label}>Stylist Name:</label>
            <input
              value={formData.stylistName}
              onChange={(e) => setFormData({ ...formData, stylistName: e.target.value })}
              type="text"
              className={Styles.Input}
              placeholder="Enter stylist name"
            />
            <label className={Styles.Label}>Description:</label>
            <input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              type="text"
              className={Styles.Input}
              placeholder="Enter description"
            />
            <label className={Styles.Label}>Rating:</label>
            <input
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              type="number"
              className={Styles.Input}
              placeholder="Enter rating"
            />

            <div className={Styles.RadioGroup}>
              <label className={Styles.Label}>Status:</label>
              <label className={Styles.RadioLabel}>
                <input
                  checked={formData.status === 'Available'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  type="radio"
                  name="status"
                  value="Available"
                />
                Available
              </label>
              <label className={Styles.RadioLabel}>
                <input
                  checked={formData.status === 'Not Available'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  type="radio"
                  name="status"
                  value="Not Available"
                />
                Not Available
              </label>
            </div>

            <div className={Styles.CheckboxGroup}>
              <label className={Styles.Label}>Days Available:</label>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <label key={day} className={Styles.CheckboxLabel}>
                  <input
                    checked={formData.daysAvailable.includes(day)}
                    onChange={(e) => {
                      const value = e.target.checked;
                      setFormData((prev) => ({
                        ...prev,
                        daysAvailable: value
                          ? [...prev.daysAvailable, e.target.value]
                          : prev.daysAvailable.filter((d) => d !== e.target.value)
                      }));
                    }}
                    type="checkbox"
                    name="days"
                    value={day}
                  />
                  {day}
                </label>
              ))}
            </div>
            <div className={Styles.Buttons}>
              <button onClick={isEditing? updatingStylist : handleAddStylist} type="button" className={Styles.SubmitButton}>{isEditing? "Update Stylist" : "Add Stylist"}</button>
              <button onClick={() => setIsFormVisible(false)} type="button" className={Styles.CancelButton}>Cancel</button>
            </div>
          </div>
        )}
        <div className={Styles.ExistingStylists}>
          <h2>Existing Stylists</h2>
          <div className={Styles.StylistItems}>
            {stylists && stylists.length > 0 ? (
              stylists.map((stylist) => (
                <div key={stylist.id} className={Styles.StylistItem}>
                  <div className={Styles.StylistImageContainer}>
                    <img
                      src={stylist.imageUrl || require("../../../../assets/avatar-default-symbolic-svgrepo-com.png")} // Default image path, adjust as needed
                      alt={stylist.stylistName}
                      className={Styles.StylistImage}
                    />
                  </div>
                  <h3>{stylist.stylistName}</h3>
                  <p>{stylist.description}</p>
                  <p>Rating: {stylist.rating}</p>
                  <p >Status: {stylist.status}</p>
                  <p>Days Available: {stylist.daysAvailable.join(", ")}</p>
                  <div className={Styles.StylistButtons}>
                    <button
                      onClick={() => handleUpdateStylist(stylist)}
                      className={Styles.UpdateButton}
                    >
                      Update 
                    </button>
                    <button
                      onClick={() => handleDeleteStylist(stylist.id)}
                      className={Styles.DeleteButton}
                    >
                      Delete 
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No stylists available. Please add a stylist.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}