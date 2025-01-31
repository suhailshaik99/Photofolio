import { db } from "../../firebase-config";
import { useEffect, useState } from "react";
import { collection, getDocs, } from "firebase/firestore";
import "./albums.css";

function Album({
  albumName,
  id,
  currentAlbum,
  setCurrentAlbum,
  setCurrentPage,
}) {

  function handleSetCurrentAlbum() {
    setCurrentAlbum(id);
    setCurrentPage("albumDetails");
  };

  return (
    <div className="album" onClick={handleSetCurrentAlbum}> 
      <div id="album-image-div">
        <img src="/album-logo.png" alt="album-image" />
      </div>
      <div id="album-name-div">{albumName}</div>
    </div>
  );
}

export default function Albums({
  newAlbum,
  currentAlbum,
  setCurrentAlbum,
  setCurrentPage,
}) {
  const [albums, setAlbums] = useState([]);

  useEffect(
    function () {
      async function getDocsFunction() {
        const querySnapshot = await getDocs(collection(db, "Albums"));
        const albumsArray = querySnapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setAlbums(albumsArray);
      }
      getDocsFunction();
    },
    [newAlbum]
  );

  return (
    <section>
      {albums.map((album) => (
        <Album
          albumName={album.albumName}
          key={album.id}
          id={album.id}
          currentAlbum={currentAlbum}
          setCurrentAlbum={setCurrentAlbum}
          setCurrentPage={setCurrentPage}
        />
      ))}
    </section>
  );
}
