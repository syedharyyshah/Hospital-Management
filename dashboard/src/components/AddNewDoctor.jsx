import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddNewDoctor = () => {
  const { isAuthenticated } = useContext(Context);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nic: '',
    dob: '',
    gender: '',
    password: '',
    doctorDepartment: '',
  });

  const [errors, setErrors] = useState({});
  const [docAvatar, setDocAvatar] = useState(null);
  const [docAvatarPreview, setDocAvatarPreview] = useState('');

  const departments = [
    'Pediatrics', 'Orthopedics', 'Cardiology', 'Neurology',
    'Oncology', 'Radiology', 'Physical Therapy', 'Dermatology', 'ENT',
  ];

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,15}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.nic.trim()) newErrors.nic = 'NIC is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with letters and numbers';
    }
    if (!formData.doctorDepartment) newErrors.doctorDepartment = 'Department is required';
    if (!docAvatar) newErrors.avatar = 'Doctor avatar is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setErrors(prev => ({
        ...prev,
        avatar: 'Please select an image file'
      }));
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        avatar: 'Image size should be less than 2MB'
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
      setErrors(prev => ({
        ...prev,
        avatar: undefined
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.warning('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      formDataToSend.append('docAvatar', docAvatar);

      const { data } = await axios.post(
        'http://localhost:4000/api/v1/user/doctor/addnew',
        formDataToSend,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      toast.success(data.message);
      navigate('/doctors');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Failed to register doctor';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <div className="text-center mb-8">
          <img 
            src="/logo.png" 
            alt="Clinic Logo" 
            className="mx-auto h-16 w-auto"
          />
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
            Register New Doctor
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Please fill in all required details to add a new doctor to the system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={docAvatarPreview || '/docHolder.webp'}
                alt="Doctor Preview"
                className="h-32 w-32 rounded-full border-4 border-white shadow-md object-cover cursor-pointer"
                onClick={() => document.getElementById('avatar').click()}
              />
              {errors.avatar && (
                <p className="mt-1 text-sm text-red-600 text-center">{errors.avatar}</p>
              )}
            </div>
            <label className="mt-4 cursor-pointer">
              <span className="sr-only">Choose profile photo</span>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="block w-full text-sm text-gray-500 cursor-pointer
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100 file:cursor-pointer"
              />
            </label>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${errors.firstName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} sm:text-sm`}
              />
              {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${errors.lastName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} sm:text-sm`}
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} sm:text-sm`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} sm:text-sm`}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="nic" className="block text-sm font-medium text-gray-700">
                National ID (NIC) *
              </label>
              <input
                id="nic"
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${errors.nic ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} sm:text-sm`}
              />
              {errors.nic && <p className="mt-1 text-sm text-red-600">{errors.nic}</p>}
            </div>

            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                Date of Birth *
              </label>
              <input
                id="dob"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className={`mt-1 block w-full rounded-md shadow-sm ${errors.dob ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} sm:text-sm`}
              />
              {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender *
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${errors.gender ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} sm:text-sm`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} sm:text-sm`}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              <p className="mt-1 text-xs text-gray-500">
                Minimum 8 characters with at least one letter and one number
              </p>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="doctorDepartment" className="block text-sm font-medium text-gray-700">
                Department *
              </label>
              <select
                id="doctorDepartment"
                name="doctorDepartment"
                value={formData.doctorDepartment}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${errors.doctorDepartment ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} sm:text-sm`}
              >
                <option value="">Select Department</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.doctorDepartment && <p className="mt-1 text-sm text-red-600">{errors.doctorDepartment}</p>}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : 'Register Doctor'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewDoctor;