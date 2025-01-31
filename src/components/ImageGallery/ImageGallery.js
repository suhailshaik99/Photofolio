import React, { useState } from "react";
import ImageModal from "../ImageModal/ImageModal";
import styles from "../ImageModal/ImageModal.module.css";

const ImageGallery = ({ images, selectedIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(null);

  const closeModal = () => {
    setCurrentIndex(null);
  };

  const showNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < images.length ? prevIndex + 1 : 0
    );
  };

  const showPrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : images.length - 1
    );
  };
  return (
    <div className={styles.gallery}>
      {currentIndex !== null && (
        <ImageModal
          image={images[currentIndex]}
          onClose={closeModal}
          onNext={showNextImage}
          onPrev={showPrevImage}
        />
      )}
    </div>
  );
};

export default ImageGallery;