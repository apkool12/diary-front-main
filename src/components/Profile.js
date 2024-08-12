import React, { useState } from 'react';

function Profile() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
    </div>
  );
}

export default Profile;
