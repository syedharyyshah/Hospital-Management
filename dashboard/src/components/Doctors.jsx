import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; // Add this import
import { toast } from 'react-toastify';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://hospital-management-gkeb.vercel.app/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">DOCTORS</h1>
        <div className="max-w-7xl mx-auto">
          {doctors && doctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((element) => (
                <div
                  key={element._id}
                  className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105"
                >
                  <img
                    src={element.docAvatar && element.docAvatar.url}
                    alt="Doctor Avatar"
                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-200"
                  />
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{`${element.firstName} ${element.lastName}`}</h4>
                  <div className="text-gray-600 space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Email: </span>
                      {element.email}
                    </p>
                    <p>
                      <span className="font-medium">Phone: </span>
                      {element.phone}
                    </p>
                    <p>
                      <span className="font-medium">DOB: </span>
                      {element.dob}
                    </p>
                    <p>
                      <span className="font-medium">Department: </span>
                      {element.doctorDepartment}
                    </p>
                    <p>
                      <span className="font-medium">NIC: </span>
                      {element.nic}
                    </p>
                    <p>
                      <span className="font-medium">Gender: </span>
                      {element.gender}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-2xl text-center text-gray-600 mt-10">No registered Doctors Found!</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default Doctors;