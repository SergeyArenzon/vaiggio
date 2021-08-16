export default function ImagesUrlInput({ setImageUrls, imageUrls }) {



    const addUrlHandler = () => {
        const newImageUrls = [...imageUrls];
        newImageUrls.push("");
        setImageUrls(newImageUrls);

    }
  const currentUrls = imageUrls.map((url) => {
    return (
      <li>
        <input type="text" value={url}></input>
      </li>
    );
  });
  return (
    <div>
      <ul>{currentUrls}</ul>
      <button onClick={addUrlHandler}>Add</button>
    </div>
  );
}
