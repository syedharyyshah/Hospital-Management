import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nic, setNic] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [department, setDepartment] = useState('');
  const [doctorFirstName, setDoctorFirstName] = useState('');
  const [doctorLastName, setDoctorLastName] = useState('');
  const [address, setAddress] = useState('');
  const [hasVisited, setHasVisited] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const navigateTo = useNavigate();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "https://hospital-management-gkeb.vercel.app/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
    };
    fetchDoctors();
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "https://hospital-management-gkeb.vercel.app/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          address,
          hasVisited: hasVisitedBool,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const inputFocusVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)"
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-gray-50 p-8 rounded-lg shadow-lg w-full m-14 mb-8"
      >
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold text-center mb-4"
        >
          Appointment
        </motion.h2>
        
        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleAppointment} 
          className="space-y-4"
        >
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.input 
              whileFocus="focus"
              variants={inputFocusVariants}
              type="text" 
              placeholder="First Name" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            />
            <motion.input 
              whileFocus="focus"
              variants={inputFocusVariants}
              type="text" 
              placeholder="Last Name" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            />
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.input 
              whileFocus="focus"
              variants={inputFocusVariants}
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            />
            <motion.input 
              whileFocus="focus"
              variants={inputFocusVariants}
              type="tel" 
              placeholder="Phone Number" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            />
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.input 
              whileFocus="focus"
              variants={inputFocusVariants}
              type="text" 
              placeholder="NIC" 
              value={nic} 
              onChange={(e) => setNic(e.target.value)} 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            />
            <div className="w-full">
              <label htmlFor="dob" className="block text-gray-700 mb-1">Date of Birth</label>
              <motion.input 
                whileFocus="focus"
                variants={inputFocusVariants}
                id="dob" 
                type="date" 
                value={dob} 
                onChange={(e) => setDob(e.target.value)} 
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required 
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.select 
              whileFocus="focus"
              variants={inputFocusVariants}
              value={gender} 
              onChange={(e) => setGender(e.target.value)} 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </motion.select>
            <div className="w-full">
              <label htmlFor="appointmentDate" className="block text-gray-700 mb-1">Appointment Date</label>
              <motion.input 
                whileFocus="focus"
                variants={inputFocusVariants}
                id="appointmentDate" 
                type="date" 
                value={appointmentDate} 
                onChange={(e) => setAppointmentDate(e.target.value)} 
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required 
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.select 
              whileFocus="focus"
              variants={inputFocusVariants}
              value={department} 
              onChange={(e) => { setDepartment(e.target.value); setDoctorFirstName(""); setDoctorLastName(""); }} 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required
            >
              <option value="">Select Department</option>
              {departmentsArray.map((depart, index) => (
                <option value={depart} key={index}>{depart}</option>
              ))}
            </motion.select>
            <motion.select 
              whileFocus="focus"
              variants={inputFocusVariants}
              value={`${doctorFirstName} ${doctorLastName}`} 
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setDoctorFirstName(firstName);
                setDoctorLastName(lastName);
              }} 
              disabled={!department} 
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!department ? "bg-gray-100 cursor-not-allowed" : ""}`} 
              required
            >
              <option value="">Select Doctor</option>
              {doctors.filter((doctor) => doctor.doctorDepartment === department).map((doctor, index) => (
                <option value={`${doctor.firstName} ${doctor.lastName}`} key={index}>{doctor.firstName} {doctor.lastName}</option>
              ))}
            </motion.select>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.textarea 
              whileFocus="focus"
              variants={inputFocusVariants}
              rows="10" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              placeholder="Address" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2"
          >
            <label htmlFor="visited" className="text-gray-600">Have you visited before?</label>
            <motion.input 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              id="visited" 
              type="checkbox" 
              checked={hasVisited} 
              onChange={(e) => setHasVisited(e.target.checked)} 
            />
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="text-center"
          >
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Get Appointment
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default AppointmentForm;