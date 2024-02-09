import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!name || !dob || !email || !phoneNumber) {
      setErrors({ message: 'All fields are required' });
      return;
    }

    // Date of birth validation
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      setErrors({ message: 'You must be at least 18 years old' });
      return;
    }

    // API endpoint
    const url = "http://127.0.0.1:8000/api/submit-form/";
    
    // Form data
    const formData = {
      name: name,
      dob: dob,
      email: email,
      phone_number: phoneNumber
    };

    // POST request options
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    };

    // Send POST request to the API
    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Redirect to home page with user ID as query parameter
        navigate(`/?userId=${data.id}`);
      })
      .catch(error => {
        console.error('There was an error!', error);
        // Handle errors here
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4">User Details</h1>
      {errors.message && <div className="text-red-500 mb-4">{errors.message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
          <input className="w-full p-2 border rounded-md" type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Enter your name" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="dob">Date of Birth</label>
          <input className="w-full p-2 border rounded-md" type="date" value={dob} onChange={(e) => setDob(e.target.value)} id="dob" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
          <input className="w-full p-2 border rounded-md" type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Enter your email" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="phoneNumber">Phone Number</label>
          <input className="w-full p-2 border rounded-md" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} id="phoneNumber" placeholder="Enter your phone number" />
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
