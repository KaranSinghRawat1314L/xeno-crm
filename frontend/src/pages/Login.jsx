import React from 'react';

const Login = () => {

  const loginWithGoogle = () => {
    window.location.href = "https://xeno-crm-2mi6.vercel.app/auth/google";
  }
  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-slate-800">Sign in to Xeno CRM</h1>
        <button
          onClick={loginWithGoogle}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
