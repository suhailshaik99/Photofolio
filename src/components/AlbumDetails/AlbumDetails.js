import { ToastContainer, toast } from "react-toastify";
import { db } from "../../firebase-config";
import "react-toastify/dist/ReactToastify.css";
import styles from "./AlbumDetails.module.css";
import ImageModal from "../ImageModal/ImageModal";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function AlbumDetails({ setCurrentPage, currentAlbum }) {
  const [title, setTitle] = useState("");
  const [imageId, setImageId] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [albumData, setAlbumData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  function handleSearchClick() {
    setShowSearch((prevState) => !prevState);
  }

  function handleShowFormClick() {
    setShowForm((prevState) => !prevState);
  }

  function handleBackClick() {
    setAlbumData({});
    setCurrentPage("albums");
  }

  function handleAddImageForm(e) {
    e.preventDefault();
    const document = {
      id: crypto.randomUUID(),
      title,
      URL: imageURL,
    };
    const docRef = doc(db, "Albums", currentAlbum);
    updateDoc(docRef, {
      images: arrayUnion(document),
    }).then(() => {
      toast.success("Image added successfully!", { position: "top-right" });
      setTitle("");
      setImageURL("");
    });
    setShowForm((prev) => !prev);
  }

  async function handleEdit(imageTitle, imageUrl, imageId) {
    setShowUpdateForm((prev) => !prev);
    setTitle(imageTitle);
    setImageURL(imageUrl);
    setImageId(imageId);
  }

  async function handleDelete(imageId) {
    if (!currentAlbum) return;
    const docRef = doc(db, "Albums", currentAlbum);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const albumData = docSnap.data();
      const updatedImages = albumData.images.filter(
        (img) => img.id !== imageId
      );
      await updateDoc(docRef, {
        images: updatedImages,
      });
      toast.success("Image deleted successfully!", { position: "top-right" });
    }
  }

  function handleClear(e) {
    e.preventDefault();
    setTitle("");
    setImageURL("");
  }

  const filteredImages = searchQuery
    ? albumData.images.filter((image) =>
        image.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : albumData;

  useEffect(
    function () {
      if (!currentAlbum) return;
      const docRef = doc(db, "Albums", currentAlbum);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setAlbumData(docSnap.data());
        }
      });

      return () => unsubscribe();
    },
    [currentAlbum]
  );
  // console.log(filteredImages);
  return (
    <>
      <ToastContainer />
      {showForm && (
        <AddImageForm
          albumData={albumData}
          title={title}
          setTitle={setTitle}
          imageURL={imageURL}
          setImageURL={setImageURL}
          handleAddImageForm={handleAddImageForm}
          handleClear={handleClear}
        />
      )}
      {showUpdateForm && (
        <UpdateForm
          title={title}
          imageUrl={imageURL}
          setTitle={setTitle}
          setImageUrl={setImageURL}
          currentAlbum={currentAlbum}
          imageId={imageId}
          setShowUpdateForm={setShowUpdateForm}
        />
      )}
      {albumData?.images && (
        <>
          <main>
            <div className={styles.backButtonDiv}>
              <img
                src="/back-button-img.png"
                alt="back-button-image"
                onClick={handleBackClick}
              />
            </div>
            <div className={styles.selectedAlbumName}>
              Images in {albumData.albumName}
            </div>
            {showSearch && (
              <div>
                <input
                  type="search"
                  className={styles.searchInputDivInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
            <div className={styles.searchIconDiv} onClick={handleSearchClick}>
              <img
                src={
                  showSearch ? "/close-button-img.png" : "/search-icon-img.png"
                }
                alt="search-icon-image"
              />
            </div>
            <div>
              <button
                onClick={handleShowFormClick}
                className={
                  showForm ? styles.cancel : styles.addImageButtonButton
                }
              >
                {showForm ? "Cancel" : "Add Image"}
              </button>
            </div>
          </main>
          <div className={styles.imagesDiv}>
            {filteredImages.length > 0
              ? filteredImages.map((image, index) => (
                  <div className={styles.imageDiv} key={image.id}>
                    <div className={styles.imageButtons}>
                      <img
                        src="/edit-img.png"
                        alt="edit icon"
                        onClick={() =>
                          handleEdit(image.title, image.URL, image.id)
                        }
                      />
                      <img
                        src="/trash-bin-img.png"
                        alt="delete icon"
                        onClick={() => handleDelete(image.id)}
                      />
                    </div>
                    <div className={styles.childImages}>
                      <img
                        src={image.URL}
                        alt="image-placeholder"
                        className={styles.image}
                        onClick={() => setSelectedImageIndex(index)}
                      />
                    </div>
                    <p className={styles.imageTitle}>{image.title}</p>
                  </div>
                ))
              : albumData.images.map((image, index) => (
                  <div className={styles.imageDiv} key={image.id}>
                    <div className={styles.imageButtons}>
                      <img
                        src="/edit-img.png"
                        alt="edit icon"
                        onClick={() =>
                          handleEdit(image.title, image.URL, image.id)
                        }
                      />
                      <img
                        src="/trash-bin-img.png"
                        alt="delete icon"
                        onClick={() => handleDelete(image.id)}
                      />
                    </div>
                    <div className={styles.childImages}>
                      <img
                        src={image.URL}
                        alt="image-placeholder"
                        className={styles.image}
                        onClick={() => setSelectedImageIndex(index)}
                      />
                    </div>
                    <p className={styles.imageTitle}>{image.title}</p>
                  </div>
                ))}
            {selectedImageIndex !== null && (
              <ImageModal
                image={albumData.images[selectedImageIndex]}
                onClose={() => setSelectedImageIndex(null)}
                onNext={() =>
                  setSelectedImageIndex((prevIndex) =>
                    prevIndex + 1 < albumData.images.length ? prevIndex + 1 : 0
                  )
                }
                onPrev={() =>
                  setSelectedImageIndex((prevIndex) =>
                    prevIndex - 1 >= 0
                      ? prevIndex - 1
                      : albumData.images.length - 1
                  )
                }
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

function AddImageForm({
  albumData,
  title,
  setTitle,
  imageURL,
  setImageURL,
  handleAddImageForm,
  handleClear,
}) {
  return (
    <section className={styles.addImageFormDiv}>
      <div>
        <h1>Add images to {albumData.albumName}</h1>
        <form onSubmit={(e) => handleAddImageForm(e)}>
          <div className={styles.inputElements}>
            <input
              required
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              required
              type="text"
              value={imageURL}
              placeholder="Image URL"
              onChange={(e) => setImageURL(e.target.value)}
            />
          </div>

          <div className={styles.addImageFormDivButtons}>
            <button className={styles.clear} onClick={(e) => handleClear(e)}>
              Clear
            </button>
            <button className={styles.add}>Add</button>
          </div>
        </form>
      </div>
    </section>
  );
}

function UpdateForm({
  title,
  imageUrl,
  setTitle,
  setImageUrl,
  currentAlbum,
  imageId,
  setShowUpdateForm,
}) {
  async function handleUpdateImageForm(e) {
    e.preventDefault();
    if (!currentAlbum) return;
    const docRef = doc(db, "Albums", currentAlbum);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const albumData = docSnap.data();

      const updatedImages = albumData.images.map((img) =>
        img.id === imageId ? { ...img, title, URL: imageUrl } : img
      );

      await updateDoc(docRef, {
        images: updatedImages,
      });

      toast.success("Image updated successfully!", { position: "top-right" });

      // Reset form
      setTitle("");
      setImageUrl("");
      setShowUpdateForm((prev) => !prev);
    }
  }

  function handleClear(e) {
    e.preventDefault();
    setTitle("");
    setImageUrl("");
  }
  return (
    <section className={styles.addImageFormDiv}>
      <div>
        <h1>Update Image {title}</h1>
        <button
          className={styles.closeButton}
          onClick={() => setShowUpdateForm((prev) => !prev)}
        >
          X
        </button>
        <form onSubmit={(e) => handleUpdateImageForm(e)}>
          <div className={styles.inputElements}>
            <input
              required
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              required
              type="text"
              value={imageUrl}
              placeholder="Image URL"
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className={styles.addImageFormDivButtons}>
            <button className={styles.clear} onClick={(e) => handleClear(e)}>
              Clear
            </button>
            <button className={styles.add}>Update</button>
          </div>
        </form>
      </div>
    </section>
  );
}
