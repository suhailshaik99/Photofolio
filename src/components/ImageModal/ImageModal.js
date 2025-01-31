import React from "react";
import styles from './ImageModal.module.css';

const ImageModal = ({ image, onClose, onNext, onPrev }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>✖</button>
        <button className={`${styles.navBtn} ${styles.left}`} onClick={onPrev}>⬅</button>
        <img src={image.URL} alt={image.title} className={styles.modalImage} />
        <button className={`${styles.navBtn} ${styles.right}`} onClick={onNext}>➡</button>
      </div>
    </div>
  );
};

export default ImageModal;