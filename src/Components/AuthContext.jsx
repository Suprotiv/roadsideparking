import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios' 

const API_URL='http://localhost:4000'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(()=>{
        const storedUser = localStorage.getItem('user')
        setUser(JSON.parse(storedUser))
    },[])

    const Login = async (email, password) => {
      try {
        const response = await axios.post(`${API_URL}/api/auth/login`, {
          email,
          password,
        });
        // Handle successful login by returning user data and token
        return { success: true, token: response.data.token, user: response.data.user };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Login error:", error.response?.data || error.message);
          throw new Error(error.response?.data?.message || "An error occurred during login");
        } else {
          console.error("Login error:", error);
          throw new Error("An unexpected error occurred during login");
        }
      }
    };
      const signUp = async (username, email, phoneNumber, password) => {
        try {
          const response = await axios.post(`${API_URL}/api/auth/signup`, {
            username,
            email,
            phoneNumber,
            password,
          });
          // Show a success message for checking email
          return { success: true, message: response.data.message };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("Signup error:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "An error occurred during signup");
          } else {
            console.error("Signup error:", error);
            throw new Error("An unexpected error occurred during signup");
          }
        }
      };
      


      return (
        <AuthContext.Provider value={{ user,signUp,Login}}>
          {children}
        </AuthContext.Provider>
      )
}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };