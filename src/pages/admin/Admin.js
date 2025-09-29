import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import Styles from "../../pages/admin/admin.module.css";
import { useSelector, useDispatch } from "react-redux";
import { updateAppointment } from "../../features/slices/appointmentSlice";
import { useState, useEffect } from "react";

export default function Admin() {
  const { appointments, appointmentStatus, appointmentError } = useSelector(
    (state) => state.appointments
  );
  const dispatch = useDispatch();

  // Filter appointments based on status
  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "Pending"
  );
  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status === "Confirmed"
  );
  const canceledAppointments = appointments.filter(
    (appointment) => appointment.status === "Canceled"
  );
  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed"
  );

  console.log("Pending Appointments:", pendingAppointments);
  console.log("Confirmed Appointments:", confirmedAppointments);
  console.log("Canceled Appointments:", canceledAppointments);
  console.log("Completed Appointments:", completedAppointments);

  // Handle status update (e.g., Confirm or Cancel)
  const handleStatusUpdate = (appointmentId, newStatus) => {
    dispatch(updateAppointment({ id: appointmentId, status: newStatus }));
  };

  // State to track the active filter
  const [activeFilter, setActiveFilter] = useState(null);
  const [displayedAppointments, setDisplayedAppointments] = useState(appointments);

  // Update displayed appointments based on filter
  useEffect(() => {
    if (activeFilter === "Pending") {
      setDisplayedAppointments(pendingAppointments);
    } else if (activeFilter === "Confirmed") {
      setDisplayedAppointments(confirmedAppointments);
    } else if (activeFilter === "Canceled") {
      setDisplayedAppointments(canceledAppointments);
    } else if (activeFilter === "Completed") {
      setDisplayedAppointments(completedAppointments);
    } else {
      setDisplayedAppointments(appointments); // Default to all appointments
    }
  }, [
    activeFilter,
   
  ]);


  // Handle filter clicks with toggle
  const handlePendingClick = () => {
    setActiveFilter((prev) => (prev === "Pending" ? null : "Pending"));
  };

  const handleConfirmedClick = () => {
    setActiveFilter((prev) => (prev === "Confirmed" ? null : "Confirmed"));
  };

  const handleCanceledClick = () => {
    setActiveFilter((prev) => (prev === "Canceled" ? null : "Canceled"));
  };

  const handleCompletedClick = () => {
    setActiveFilter((prev) => (prev === "Completed" ? null : "Completed"));
  };

  const { stylists } = useSelector((state) => state.stylists);

  // Earnings calculation functions
  const calculateTotalEarnings = (appointmentsList) =>
    appointmentsList
      .reduce(
        (sum, appointment) =>
          sum +
          (appointment.services?.reduce(
            (serviceSum, service) => serviceSum + parseFloat(service.Price || 0),
            0
          ) || 0),
        0
      )
      .toFixed(2);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(displayedAppointments.length / itemsPerPage);
  const handlePagination = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Paginate displayed appointments
  const paginatedAppointments = displayedAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const showAppointments = paginatedAppointments;

  return (
    <div className={Styles.admin}>
      <div className={Styles.AdminNavbar}>
        <AdminNavbar />
      </div>
      <div className={Styles.adminContainer} style={{ marginTop: "3rem" }}>
        {/* Added marginTop to push content below the collapsed navbar */}
        <h1>Admin Dashboard</h1>
        <p>
          Welcome to the admin dashboard. Here you can manage Appointments,
          Stylists, and view analytics.
        </p>
        <div className={Styles.analyticsSection}>
          <h2>Analytics Overview</h2>
          <div className={Styles.analytics}>
            <div className={Styles.TotalAppointmentBox}>
              <p>Total Appointments</p>
              <p>{appointments.length}</p>
            </div>
            <div className={Styles.CompletedAppointmentBox}>
              <p>Completed Appointments</p>
              <p>{completedAppointments.length}</p>
            </div>
            <div className={Styles.TotalEarningsBox}>
              <p>Total Earnings</p>
              <p>${calculateTotalEarnings(completedAppointments)}</p>
            </div>
            <div className={Styles.PendingEarningsBox}>
              <p>Pending Earnings</p>
              <p>${calculateTotalEarnings(pendingAppointments)}</p>
            </div>
            <div className={Styles.UpcomingEarningsBox}>
              <p>Upcoming Earnings</p>
              <p>${calculateTotalEarnings(confirmedAppointments)}</p>
            </div>
            <div className={Styles.TotalStylistsBox}>
              <p>Total Stylists</p>
              <p>{stylists.length}</p>
            </div>
          </div>
        </div>
        <h2 className={Styles.appointmentsOverviewTitle}>Appointments Overview</h2>
        <div className={Styles.appointmentsoverview}>
          <div
            onClick={handlePendingClick}
            className={`${Styles.PendingAppointments} ${activeFilter === "Pending" ? Styles.activeFilter : ""
              }`}
          >
            <div className={Styles.PendingIcon}>
              <img
                src={require("../../assets/time-caspule-start-svgrepo-com.png")}
                alt="Pending Icon"
                className={Styles.iconImage}
              />
            </div>
            <h2>{pendingAppointments.length}</h2>
            <p>Pending</p>
          </div>
          <div
            onClick={handleConfirmedClick}
            className={`${Styles.ConfirmedAppointments} ${activeFilter === "Confirmed" ? Styles.activeFilter : ""
              }`}
          >
            <div className={Styles.ConfirmedIcon}>
              <img
                src={require("../../assets/tick-circle-svgrepo-com.png")}
                alt="Confirmed Icon"
                className={Styles.iconImage}
              />
            </div>
            <h2>{confirmedAppointments.length}</h2>
            <p>Confirmed</p>
          </div>
          <div
            onClick={handleCanceledClick}
            className={`${Styles.CanceledAppointments} ${activeFilter === "Canceled" ? Styles.activeFilter : ""
              }`}
          >
            <div className={Styles.CanceledIcon}>
              <img
                src={require("../../assets/cancel-svgrepo-com.png")}
                alt="Canceled Icon"
                className={Styles.iconImage}
              />
            </div>
            <h2>{canceledAppointments.length}</h2>
            <p>Canceled</p>
          </div>
          <div
            onClick={handleCompletedClick}
            className={`${Styles.CompletedAppointments} ${activeFilter === "Completed" ? Styles.activeFilter : ""
              }`}
          >
            <div className={Styles.CompletedIcon}>
              <img
                src={require("../../assets/square-svgrepo-com.png")}
                alt="Completed Icon"
                className={Styles.iconImage}
              />
            </div>
            <h2>{completedAppointments.length}</h2>
            <p>Completed</p>
          </div>
        </div>
        <div className={Styles.appointmentsTable}>
          <h2>Appointments Details:</h2>
          <table>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Charges</th>
              </tr>
            </thead>
            <tbody>
              {showAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.user?.name || "Unknown"}</td>
                  <td>
                    {new Date(appointment.date.seconds * 1000).toLocaleDateString()}
                  </td>
                  <td>{appointment.time}</td>
                  <td className={`${Styles[appointment.status]}`}>
                    {appointment.status}
                  </td>
                  <td>
                    $
                    {appointment.services
                      .reduce(
                        (sum, service) => sum + parseFloat(service.Price || 0),
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="4" className={Styles.total}>
                  Total
                </td>
                <td>
                  $
                  {showAppointments
                    .reduce(
                      (sum, appointment) =>
                        sum +
                        appointment.services.reduce(
                          (s, service) => s + parseFloat(service.Price || 0),
                          0
                        ),
                      0
                    )
                    .toFixed(2)}
                </td>
              </tr>

              <tr className={Styles.ControlRow}>
                <td colSpan="5" className={Styles.pagination}>
                  <button
                    onClick={() => handlePagination("prev")}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePagination("next")}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}