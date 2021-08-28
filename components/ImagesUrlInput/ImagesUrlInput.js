import { useRef } from "react";

export default function ImagesUrlInput({ setImageUrls, imageUrls }) {

  const inputRef = useRef();


  const addUrlHandler = () => {
    const newImageUrls = [...imageUrls];
    newImageUrls.push("");
    setImageUrls(newImageUrls);
  };
  const saveHandler = (index) => {
    let newImageUrls = [...imageUrls];
    newImageUrls[index] = inputRef.current.value;
    setImageUrls(newImageUrls);
  };

  const deleteHandler = (index) => {
    console.log(imageUrls);
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
  };

  const currentUrls = imageUrls.map((url, index) => {
    return (
      <li key={url + index}>
        {url === "" ? <input type="text" placeholder={url} ref={inputRef}></input> : <span>{url}</span>}
        <button onClick={() => deleteHandler(index)}>Delete</button>
        {url === "" && <button onClick={() => saveHandler(index)}>Save</button>}
      </li>
    );
  });

  console.log(imageUrls);
  return (
    <div>
      <ul>{currentUrls}</ul>
      { imageUrls[imageUrls.length - 1] !== "" && <button onClick={addUrlHandler}>Add</button>}
    </div>
  );
}
