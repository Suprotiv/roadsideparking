import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios' 


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(()=>{
        const storedUser = localStorage.getItem('user')
        setUser(JSON.parse(storedUser))
    },[])

    const Login = async (username, password) => {
        try {
          const response = await axios.post(`${API_URL}/api/auth/login`, { username, password })
          const { token, username: responseUsername } = response.data
          const user = { username: responseUsername}
          setUser(user)
          localStorage.setItem('user', JSON.stringify(user))
          return true
        } catch (error) {
          console.error('Login error:', error)
          return false
        }
      }

      return (
        <AuthContext.Provider value={{ user, signIn, signUp, signOut, updateHighScore }}>
          {children}
        </AuthContext.Provider>
      )
}