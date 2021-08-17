export default function ImagesUrlInput({ setImageUrls, imageUrls }) {

  const addUrlHandler = () => {
    const newImageUrls = [...imageUrls];
    newImageUrls.push("");
    setImageUrls(newImageUrls);
  };

  const deleteHandler = (index) => {
      const newImageUrls = [...imageUrls];
      newImageUrls.splice(index, 1);
      console.log(newImageUrls);
    setImageUrls(newImageUrls);
  };

  const urlTypingHandler = (event, index) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = event.target.value;
    setImageUrls(newImageUrls);
  }



  const currentUrls = imageUrls.map((url, index) => {
    return (
      <li key={index}>
        <input type="text" onChange={(event) => urlTypingHandler(event, index)} placeholder={index}></input>
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
