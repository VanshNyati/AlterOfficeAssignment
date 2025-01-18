// src/pages/Login.js
import React from 'react';
import { auth, googleProvider } from '../services/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log('User Info:', result.user);
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between h-screen px-8 bg-pink-50">
            {/* Left Section */}
            <div className="flex flex-col items-start justify-center space-y-8 md:w-1/2">
                <h1 className="text-4xl font-extrabold text-purple-700">TaskBuddy</h1>
                <p className="text-gray-600 text-lg">
                    Streamline your workflow and track progress effortlessly with our all-in-one task management app.
                </p>
                <button
                    onClick={handleGoogleLogin}
                    className="bg-black text-white px-6 py-3 rounded flex items-center space-x-3 shadow-lg"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        alt="Google Logo"
                        className="h-6"
                    />
                    <span>Continue with Google</span>
                </button>
            </div>

            {/* Right Section */}
            <div className="hidden md:flex items-center justify-center md:w-1/2">
                <img
                    src="https://via.placeholder.com/600x400.png?text=Task+Management+Preview"
                    alt="TaskBuddy Branding"
                    className="max-w-full rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
};

export default Login;
