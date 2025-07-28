import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from './LoginPage.module.scss'

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                username,
                password
            })

            localStorage.setItem('token', res.data.token)
            toast.success('Успешный вход 👋')
            navigate('/dashboard')
        } catch (err) {
            console.error('❌ Login error:', err.response?.data || err.message)
            toast.error('Ошибка входа: неверные данные')
        }
    }


    return (
        <div className={styles.login__container}>
            <h2 className={styles.login__title}>Login</h2>
            <form onSubmit={handleSubmit} className={styles.login__form}>
                <input
                    className={styles.login__input}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    autoComplete="username"
                />
                <input
                    className={styles.login__input}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="current-password"
                />
                <button type="submit" className={styles.login__button}>
                    Login
                </button>
            </form>
        </div>
    )
}
