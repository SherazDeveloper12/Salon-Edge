import AdminNavbar from "../../../../components/adminNavbar/AdminNavbar"
import Styles from './services.module.css'
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addService } from "../../../../features/slices/servicesSlice"
export default function AdminServices(){
    const dispatch = useDispatch()
    const [AddServiceisOpen, SetAddService] = useState(false)
    const [ServiceName, SetServiceName] = useState('')
    const [Description, SetDescription] = useState('')
    const [Price, SetPrice] = useState('')
    const [Duration, SetDuration] = useState('')
    const AddSeviceClickerHandler=()=>{
        let newService={
            ServiceName,
            Description,
            Price,
            Duration
        }
        console.log("newService", newService);
        dispatch(addService(newService))
        SetServiceName('')
        SetDescription('')
        SetPrice('')
        SetDuration('')
        
    }
    return(
        <div className={Styles.Services}>
           <div className={Styles.AdminNavbar}> <AdminNavbar/></div>
              <div className={Styles.Services_container}>
                <div className={Styles.Services_TopBox}>
                <h1>Services</h1>
                <button onClick={()=>SetAddService(!AddServiceisOpen)} className={Styles.AddServiceButton}>Add Service</button>
                </div>
                {AddServiceisOpen && (
                <div className={Styles.AddServiceForm}>
                    <h2>Add New Service</h2>
                        <div className={Styles.FormGroup}>
                        <label className={Styles.Label}>Service Name:</label>
                        <input type="text" className={Styles.Input} value={ServiceName} onChange={(e) => SetServiceName(e.target.value)} />
                        <label className={Styles.Label}>Description:</label>
                        <textarea className={Styles.Textarea} value={Description} onChange={(e) => SetDescription(e.target.value)}></textarea>
                        <label className={Styles.Label}>Price:</label>
                        <input type="number" className={Styles.Input} value={Price} onChange={(e) => SetPrice(e.target.value)} />
                        <label className={Styles.Label}>Duration (minutes):</label>
                        <input type="number" className={Styles.Input} value={Duration} onChange={(e) => SetDuration(e.target.value)} />
                        <div className={Styles.Buttons}>
                            <button onClick={AddSeviceClickerHandler} type="button" className={Styles.SubmitButton}>Add Service</button>
                            <button type="button" className={Styles.CancelButton} onClick={() => SetAddService(false)}>Cancel</button>
                        </div>
                        </div>
                </div>
                )}

              </div>
        </div>
    )
}