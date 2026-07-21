import React, { useState } from "react";
import AuthPage from "./components/AuthPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h2 style={{ textAlign: "center" }}>Dashboard</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <AuthPage setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;