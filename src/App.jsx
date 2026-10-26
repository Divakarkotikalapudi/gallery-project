
import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getImages() {
      setLoading(true);

      try {
        const response = await fetch(
          `https://picsum.photos/v2/list?page=${page}&limit=10`
        );

        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.log("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, [page]);

  return (
    <div className="app">
      <h1>Image Gallery</h1>

      {loading ? (
        <h2>Loading images...</h2>
      ) : (
        <div className="gallery">
          {images.map((image) => (
            <div className="card" key={image.id}>
              <img
                src={`https://picsum.photos/id/${image.id}/400/250`}
                alt={image.author}
              />
              <h3>{image.author}</h3>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
