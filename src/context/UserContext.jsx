import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load logged-in user safely
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid JSON in localStorage:", error);
        localStorage.removeItem("loggedInUser"); // clean it up
      }
    }
  }, []);

 const register = async (userData) => {
  try {
    const response = await fetch("https://education.jmbliss.com/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registration successful!");
    } else {
      // Laravel usually returns 422 for validation errors
      if (response.status === 422 && data.errors) {
        const messages = Object.values(data.errors)
          .flat()
          .join("\n");
        alert(messages);
      } else {
        alert(data.message || "Registration failed");
      }
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
  }
};


  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};
