import styles from './BrandForm.module.scss'

export default function BrandForm({
                                      name,
                                      description,
                                      logoUrl,
                                      setName,
                                      setDescription,
                                      setLogoUrl,
                                      onSubmit,
                                      editing
                                  }) {
    return (
        <form onSubmit={onSubmit} className={styles['dashboard__form']}>
            <input
                className={styles['dashboard__form-input']}
                placeholder="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className={styles['dashboard__form-input']}
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                className={styles['dashboard__form-input']}
                placeholder="Ссылка на лого"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
            />
            <button type="submit" className={styles['dashboard__form-button']}>
                {editing ? 'Сохранить' : 'Добавить бренд'}
            </button>
        </form>
    )
}