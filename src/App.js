import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Albums from "./components/Albums/albums";
import AlbumForm from "./components/AlbumForm/AlbumForm";
function App() {
  const [newAlbum, setNewAlbum] = useState({});
  function handleNewAlbum(album) {
    setNewAlbum(album);
  }
  return (
    <div className="App">
      <Navbar />
      <AlbumForm handleNewAlbum={handleNewAlbum}/> 
      <Albums newAlbum={newAlbum}/>
    </div>
  );
}

export default App;
