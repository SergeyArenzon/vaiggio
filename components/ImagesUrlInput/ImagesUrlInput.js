export default function ImagesUrlInput({ setImageUrls, imageUrls }) {
  const addUrlHandler = () => {
    const newImageUrls = [...imageUrls];
    newImageUrls.push("");
    setImageUrls(newImageUrls);
  };

  const deleteHandler = (index) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
  };

  const urlTypingHandler = (event, index) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = event.target.value;
    setImageUrls(newImageUrls);
  };

  const currentUrls = imageUrls.map((url, index) => {
    console.log(url);
    return (
      <li key={url + index}>
        <input
          type="text"
          onChange={(event) => urlTypingHandler(event, index)}
          placeholder={url}
        ></input>
        <button onClick={() => deleteHandler(index)}>Delete</button>
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
