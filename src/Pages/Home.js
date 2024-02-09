import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  const fetchUserData = (userId) => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`http://127.0.0.1:8000/api/user/${userId}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => {
        setUserData(result);
      })
      .catch(error => {
        console.error('There was an error!', error);
        // Handle errors here
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Home Page</h1>
      {userData ? (
        <>
          <p className="mb-2"><span className="font-semibold">Name:</span> {userData.name}</p>
          <p className="mb-2"><span className="font-semibold">Date of Birth:</span> {userData.dob}</p>
          <p className="mb-2"><span className="font-semibold">Email:</span> {userData.email}</p>
          <p className="mb-2"><span className="font-semibold">Phone Number:</span> {userData.phone_number}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  
}

export default Home;
