import axios from 'axios';

const verifyEmail = async (uid, token) => {
  try {
    const response = await axios.post('/api/verify-email/', {
      uid: uid,
      token: token,
    });

    if (response.status === 200) {
      console.log('Email verified successfully');
      // Redirect to login or homepage, or show a success message
      window.location.href = '/login'; // Example redirection
    } else {
      console.error('Error verifying email:', response.data.error);
      // Show an error message to the user
      alert('Activation link is invalid!');
    }
  } catch (error) {
    console.error('Error verifying email:', error);
    // Show an error message to the user
    alert('An error occurred while verifying your email.');
  }
};

// Assuming you extract the uid and token from the URL when the link is clicked
const urlParams = new URLSearchParams(window.location.search);
const uid = urlParams.get('uid');
const token = urlParams.get('token');

// Call the function to verify the email
verifyEmail(uid, token);
