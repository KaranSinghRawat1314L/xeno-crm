export default function Header() {
  const logout = () => {
    window.location.href = "http://localhost:5000/auth/logout";
  };

  return (
    <header className="flex items-center justify-between bg-white shadow-md px-8 py-4 border-b border-slate-200 sticky top-0 z-10">
      <div className="font-semibold text-lg text-slate-700">Welcome to Xeno CRM</div>
      <button
        onClick={logout}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Logout
      </button>
    </header>
  );
}
