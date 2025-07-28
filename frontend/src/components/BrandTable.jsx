import styles from './BrandTable.module.scss'

export default function BrandTable({
                                       brands,
                                       onEdit,
                                       onDelete,
                                       onCancel,
                                       pendingDelete,
                                       deleteCountdown
                                   }) {
    return (
        <table className={styles['dashboard__table']}>
            <thead>
            <tr>
                <th>Название</th>
                <th>Описание</th>
                <th>Лого</th>
                <th>Действия</th>
            </tr>
            </thead>
            <tbody>
            {brands.map((brand) => (
                <tr key={brand._id} style={{ opacity: pendingDelete === brand._id ? 0.5 : 1 }}>
                    <td>{brand.name}</td>
                    <td>{brand.description}</td>
                    <td>
                        {brand.logoUrl && <img src={brand.logoUrl} alt={brand.name} width={50} />}
                    </td>
                    <td className={styles['dashboard__table-actions']}>
                        {pendingDelete === brand._id ? (
                            <button
                                onClick={() => onCancel(brand._id)}
                                className={`${styles['dashboard__table-actions-button']} ${styles['dashboard__table-actions-button--cancel']}`}
                            >
                                Отменить удаление ({deleteCountdown})
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => onEdit(brand)}
                                    className={`${styles['dashboard__table-actions-button']} ${styles['dashboard__table-actions-button--edit']}`}
                                >
                                    Редактировать
                                </button>
                                <button
                                    onClick={() => onDelete(brand._id)}
                                    className={`${styles['dashboard__table-actions-button']} ${styles['dashboard__table-actions-button--delete']}`}
                                >
                                    Удалить
                                </button>
                            </>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
