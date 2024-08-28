import { useEffect, useState } from 'react'


interface User {
    unique_id: string;
    name: string;
    email: string;
    src?: string;
    role: 'USER' | 'ADMIN';
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        const res = await fetch('/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        if (res.ok) {
          const userData = await res.json()
          setUser(userData)
        } else {
          console.error('Failed to fetch user profile')
        }
      }
    }
    fetchUser()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <p>Email: {user.email}</p>
          <p>Profile Image: <img src={user.src || '/default-profile.png'} alt="Profile" /></p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
