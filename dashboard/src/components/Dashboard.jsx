import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { GoCheckCircleFill } from 'react-icons/go';
import { AiFillCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify'; // Added toast import (ensure react-toastify is installed)

const Dashboard = () => {
  const { isAuthenticated, user } = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]); // Added state for doctors

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:4000/api/v1/appointment/getall',
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
      }
    };

    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:4000/api/v1/user/doctors',
          { withCredentials: true }
        );
        console.log('Doctors data:', data);
        setDoctors(data.doctors || data || []); // Try both options
      } catch (error) {
        console.error('Error fetching doctors:', {
          message: error.message,
          response: error.response,
          config: error.config
        });
        setDoctors([]);
      }
    };

    fetchAppointments();
    fetchDoctors();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={'/login'} />;
  }

  const doctorImage = user?.gender === 'Female' ? '/docf.webp' : '/doc.webp';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <section className="flex flex-col items-center justify-center px-4 py-8">
        <div className="bg-[#b8b8fc] w-full max-w-5xl rounded-xl p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-8 shadow-lg">
          <img
            src={doctorImage}
            alt="Doctor"
            className="w-48 h-auto sm:w-60 object-contain rounded-full"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Hello,{' '}
              <span className="text-pink-600 font-bold">
                {user && `${user.firstName} ${user.lastName}`}
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquid velit, dolorum saepe voluptatem perspiciatis sequi!
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-5xl">
          <div className="bg-indigo-700 p-6 rounded-lg shadow-md text-center">
            <p className="text-white text-lg font-medium">Total Appointments</p>
            <h3 className="text-3xl font-bold text-white mt-2">{appointments.length}</h3>
          </div>
          <div className="bg-pink-600 p-6 rounded-lg shadow-md text-center">
            <p className="text-white text-lg font-medium">Registered Doctors</p>
            <h3 className="text-3xl font-bold text-white mt-2">{doctors.length}</h3>
          </div>
        </div>
      </section>

      {/* Appointments Table */}
      <section className="px-4 py-8 w-full max-w-6xl mx-auto">
        <h5 className="text-2xl font-semibold text-gray-800 mb-6">Appointments</h5>
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead className="bg-gray-200">
              <tr className="text-gray-700">
                <th className="py-3 px-4 font-semibold">Patient</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Doctor</th>
                <th className="py-3 px-4 font-semibold">Department</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td className="py-3 px-4 text-gray-700">{appointment.appointment_date.substring(0, 16)}</td>
                    <td className="py-3 px-4 text-gray-700">{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td className="py-3 px-4 text-gray-700">{appointment.department}</td>
                    <td className="py-3 px-4">
                      <select
                          className={`
                            w-full py-1 px-2 rounded-md border 
                            ${appointment.status === 'Pending' ? 'bg-yellow-100 border-yellow-300 text-yellow-700' : ''}
                            ${appointment.status === 'Accepted' ? 'bg-green-100 border-green-300 text-green-700' : ''} 
                            ${appointment.status === 'Rejected' ? 'bg-red-100 border-red-300 text-red-700' : ''} 
                          `}
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="bg-yellow-100 text-yellow-700">
                            Pending
                          </option>
                          <option value="Accepted" className="bg-green-100 text-green-700">
                            Accepted
                          </option>
                          <option value="Rejected" className="bg-red-100 text-red-700">
                            Rejected
                          </option>
                        </select>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {appointment.hasVisited ? (
                        <GoCheckCircleFill className="text-green-500 text-xl mx-auto" />
                      ) : (
                        <AiFillCloseCircle className="text-red-500 text-xl mx-auto" />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 px-4 text-center text-gray-600">
                    No Appointments Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;