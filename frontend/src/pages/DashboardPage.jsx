import {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import BrandForm from '../components/BrandForm'
import BrandTable from '../components/BrandTable'
import styles from './DashboardPage.module.scss'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

export default function DashboardPage() {
    const [brands, setBrands] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [logoUrl, setLogoUrl] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [pendingDelete, setPendingDelete] = useState(null)
    const [deleteCountdown, setDeleteCountdown] = useState(0)

    const deleteTimers = useRef({})
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        fetchBrands()
    }, [])

    const fetchBrands = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/brands`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            setBrands(res.data)
        } catch (err) {
            toast.error('Ошибка загрузки брендов')
            console.error(err)
        }
    }

    const createBrand = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/brands`, {
                name, description, logoUrl
            }, {
                headers: {Authorization: `Bearer ${token}`}
            })

            resetForm()
            fetchBrands()
            toast.success('Бренд успешно создан')
        } catch (err) {
            toast.error('Ошибка создания бренда')
            console.error(err)
        }
    }

    const updateBrand = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/brands/${editingId}`, {
                name, description, logoUrl
            }, {
                headers: {Authorization: `Bearer ${token}`}
            })

            resetForm()
            fetchBrands()
            toast.success('Изменения сохранены')
        } catch (err) {
            toast.error('Ошибка обновления бренда')
            console.error(err)
        }
    }

    const resetForm = () => {
        setEditingId(null)
        setName('')
        setDescription('')
        setLogoUrl('')
    }

    const startEditing = (brand) => {
        setEditingId(brand._id)
        setName(brand.name)
        setDescription(brand.description || '')
        setLogoUrl(brand.logoUrl || '')
    }

    const scheduleDelete = (id) => {
        setPendingDelete(id)
        setDeleteCountdown(5)

        toast.info('Удаление через 5 секунд. Можно отменить.')

        deleteTimers.current[id] = {
            countdown: setInterval(() => {
                setDeleteCountdown((prev) => prev - 1)
            }, 1000),
            delete: setTimeout(async () => {
                clearInterval(deleteTimers.current[id].countdown)
                try {
                    await axios.delete(`${import.meta.env.VITE_API_URL}/brands/${id}`, {
                        headers: {Authorization: `Bearer ${token}`}
                    })
                    fetchBrands()
                    toast.success('Бренд удалён')
                } catch (err) {
                    toast.error('Ошибка при удалении')
                    console.error(err)
                } finally {
                    setPendingDelete(null)
                    delete deleteTimers.current[id]
                }
            }, 5000)
        }
    }

    const cancelDelete = (id) => {
        clearTimeout(deleteTimers.current[id]?.delete)
        clearInterval(deleteTimers.current[id]?.countdown)
        delete deleteTimers.current[id]
        setPendingDelete(null)
        setDeleteCountdown(0)
        toast.warn('Удаление отменено')
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        toast.success('Вы вышли из системы')
        navigate('/login')
    }

    return (
        <div className={styles['dashboard__container']}>
            <div className={styles['dashboard__header']}>
                <h1 className="dashboard__title">📦 Бренды</h1>
                <button onClick={handleLogout} className={styles['dashboard__logout']}>
                    Выйти из админ панели
                </button>
            </div>
            <BrandForm
                name={name}
                description={description}
                logoUrl={logoUrl}
                setName={setName}
                setDescription={setDescription}
                setLogoUrl={setLogoUrl}
                onSubmit={editingId ? updateBrand : createBrand}
                editing={!!editingId}
            />

            <BrandTable
                brands={brands}
                onEdit={startEditing}
                onDelete={scheduleDelete}
                onCancel={cancelDelete}
                pendingDelete={pendingDelete}
                deleteCountdown={deleteCountdown}
            />
        </div>
    )
}
