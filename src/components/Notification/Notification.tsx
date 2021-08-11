import React from 'react';
import styles from './Notification.module.scss';

interface Props {
    message: string;
}

export const Notification: React.FC<Props> = ({ message }) => {
    return (
        <div className={styles.notification}>
            <p>{message}</p>
        </div>
    );
};
