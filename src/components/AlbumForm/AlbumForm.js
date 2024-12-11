import { useState, useRef } from "react";
import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import "./AlbumForm.css";

function AddAlbumForm({ handleNewAlbum }) {
  const albumName = useRef();
  async function onClickAdd(e) {
    e.preventDefault();
    const album = {
      albumName: albumName.current.value,
      images: [],
    };
    const collectionRef = collection(db, "Albums");
    const docRef = await addDoc(collectionRef, album);
    handleNewAlbum(docRef);
    onClickClear(e);
  }

  function onClickClear(e) {
    e.preventDefault();
    albumName.current.value = "";
  }

  return (
    <div className="album-form">
      <h1>Create an album</h1>
      <form className="album-create-form" onSubmit={onClickAdd}>
        <input
          type="text"
          required
          placeholder="Album Name"
          id="input-album-name"
          ref={albumName}
        />
        <button id="clear-btn" type="button" onClick={onClickClear}>
          Clear
        </button>
        <button id="create-btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

function AlbumForm({ handleNewAlbum }) {
  const [showForm, setShowForm] = useState(false);

  function handleClick() {
    setShowForm((prevState) => !prevState);
  }

  return (
    <>
      {showForm && <AddAlbumForm handleNewAlbum={handleNewAlbum} />}
      <div className="album-details">
        <h1>Your Albums</h1>
        <button
          className={showForm ? "cancel-album-button" : "add-album-button"}
          type="submit"
          onClick={handleClick}
        >
          {showForm ? "cancel" : "Add album"}
        </button>
      </div>
    </>
  );
}
export default AlbumForm;
