import AdminNavbar from "../../../../components/adminNavbar/AdminNavbar";
import Styles from './stylists.module.css';
import { useState, useRef } from "react";
import { useDispatch } from 'react-redux';
import { addStylist, fetchStylists } from "../../../../features/slices/stylistSlice";
import { useEffect } from "react";

export default function Stylists() {
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
      console.log("img url is ", url);
      setFormData((prev) => ({ ...prev, imageUrl: url }));
    } catch (error) {
      console.error("Error uploading image:", error);
      setFormData((prev) => ({ ...prev, imageUrl: '' }));
      // You can add error message to UI if needed
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleAddStylist = () => {
    console.log("New Stylist Data:", formData);
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
            <h2>Add New Stylist</h2>
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
              <button onClick={handleAddStylist} type="button" className={Styles.SubmitButton}>Add Stylist</button>
              <button onClick={() => setIsFormVisible(false)} type="button" className={Styles.CancelButton}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}