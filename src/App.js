import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Albums from "./components/Albums/Albums";
import AlbumForm from "./components/AlbumForm/AlbumForm";
import AlbumDetails from "./components/AlbumDetails/AlbumDetails";

function App() {
  const [newAlbum, setNewAlbum] = useState({});
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [currentPage, setCurrentPage] = useState("albums");
  function handleNewAlbum(album) {
    setNewAlbum(album);
  }
  return (
    <div className="App">
      <Navbar />
      {currentPage === "albums" && (
        <>
          <AlbumForm handleNewAlbum={handleNewAlbum} />
          <Albums
            newAlbum={newAlbum}
            currentAlbum={currentAlbum}
            setCurrentAlbum={setCurrentAlbum}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
      {currentPage === "albumDetails" && (
        <AlbumDetails setCurrentPage={setCurrentPage} currentAlbum={currentAlbum}/>
      )}
    </div>
  );
}

export default App;
