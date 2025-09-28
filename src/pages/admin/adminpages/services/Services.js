import AdminNavbar from "../../../../components/adminNavbar/AdminNavbar";
import Styles from "./services.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addService, updateService, deleteService } from "../../../../features/slices/servicesSlice";

export default function AdminServices() {
  const dispatch = useDispatch();
  const { services, status, error } = useSelector((state) => state.services);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [ServiceName, SetServiceName] = useState("");
  const [Description, SetDescription] = useState("");
  const [Price, SetPrice] = useState("");
  const [Duration, SetDuration] = useState("");

  const handleFormSubmit = () => {
    const serviceData = {
      ServiceName,
      Description,
      Price,
      Duration,
    };
    console.log("serviceData", serviceData);
    if (isEditing) {
      dispatch(updateService({ id: editingServiceId, ...serviceData }));
    } else {
      dispatch(addService(serviceData));
    }
    // Clear fields and close form
    SetServiceName("");
    SetDescription("");
    SetPrice("");
    SetDuration("");
    setIsFormOpen(false);
    setIsEditing(false);
    setEditingServiceId(null);
  };

  const handleUpdateService = (service) => {
    // Pre-fill form with service data
    SetServiceName(service.ServiceName || "");
    SetDescription(service.Description || "");
    SetPrice(service.Price || "");
    SetDuration(service.Duration || "");
    setEditingServiceId(service.id);
    setIsEditing(true);
    setIsFormOpen(true);
   
  };

  const handleDeleteService = (serviceId) => {
    dispatch(deleteService(serviceId));
  };

  const handleCancel = () => {
    // Clear fields and close form
    SetServiceName("");
    SetDescription("");
    SetPrice("");
    SetDuration("");
    setIsFormOpen(false);
    setIsEditing(false);
    setEditingServiceId(null);
  };

  const updatingService = () => {
     let updatedService = {
        ServiceName,
      Description,
      Price,
      Duration,
    };
    console.log("updatedService", updatedService);
    console.log("editingServiceId", editingServiceId);
    dispatch(updateService({ id: editingServiceId, serviceData: updatedService }));
    // Clear fields and close form
    SetServiceName("");
    SetDescription("");
    SetPrice("");
    SetDuration("");
    setIsFormOpen(false);
    setIsEditing(false);
    setEditingServiceId(null);
  }

  return (
    <div className={Styles.Services}>
      <div className={Styles.AdminNavbar}>
        <AdminNavbar />
      </div>
      <div className={Styles.Services_container}>
        <div className={Styles.Services_TopBox}>
          <h1>Services</h1>
          <button
            onClick={() => {
              setIsFormOpen(true);
              setIsEditing(false);
            }}
            className={Styles.AddServiceButton}
          >
            Add Service
          </button>
        </div>
        {isFormOpen && (
          <div className={Styles.AddServiceForm}>
            <h2>{isEditing ? "Update Service" : "Add New Service"}</h2>
            <div className={Styles.FormGroup}>
              <label className={Styles.Label}>Service Name:</label>
              <input
                type="text"
                className={Styles.Input}
                value={ServiceName}
                onChange={(e) => SetServiceName(e.target.value)}
              />
              <label className={Styles.Label}>Description:</label>
              <textarea
                className={Styles.Textarea}
                value={Description}
                onChange={(e) => SetDescription(e.target.value)}
              ></textarea>
              <label className={Styles.Label}>Price:</label>
              <input
                type="number"
                className={Styles.Input}
                value={Price}
                onChange={(e) => SetPrice(e.target.value)}
              />
              <label className={Styles.Label}>Duration (minutes):</label>
              <input
                type="number"
                className={Styles.Input}
                value={Duration}
                onChange={(e) => SetDuration(e.target.value)}
              />
              <div className={Styles.Buttons}>
                <button
                  onClick={isEditing ? updatingService : handleFormSubmit}
                  type="button"
                  className={Styles.SubmitButton}
                >
                  {isEditing ? "Update Service" : "Add Service"}
                </button>
                <button
                  type="button"
                  className={Styles.CancelButton}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <div className={Styles.ServicesList}>
          <h2>Existing Services</h2>
          <div className={Styles.ServiceItems}>
            {services && services.length > 0 ? (
              services.map((service) => (
                <div key={service.id} className={Styles.ServiceItem}>
                  <h3>{service.ServiceName}</h3>
                  <p>{service.Description}</p>
                  <p>Price: ${service.Price}</p>
                  <p>Duration: {service.Duration} minutes</p>
                  <div className={Styles.ServiceButtons}>
                    <button
                      onClick={() => handleUpdateService(service)}
                      className={Styles.UpdateButton}
                    >
                      Update Service
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className={Styles.DeleteButton}
                    >
                      Delete Service
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No services available. Please add a service.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}