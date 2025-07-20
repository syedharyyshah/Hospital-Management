import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../main';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context); 

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get("https://hospital-management-gkeb.vercel.app/api/v1/message/getall", {
          withCredentials: true,
        });
        setMessages(data.message); 
      } catch (error) {
        console.log("Error occurred while fetching messages", error);
      }
    };
    fetchMessages();
  }, []);
  

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Messages
        </h1>
        <div className="space-y-6">
          {messages && messages.length > 0 ? (
            messages.map((element) => (
              <div
                key={element._id} // Added key for React list rendering
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-semibold">First Name:</span>{' '}
                    {element.firstName}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Last Name:</span>{' '}
                    {element.lastName}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Email:</span>{' '}
                    <a
                      href={`mailto:${element.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {element.email}
                    </a>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Phone:</span>{' '}
                    <a
                      href={`tel:${element.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {element.phone}
                    </a>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Message:</span>{' '}
                    {element.message}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No messages found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Messages;