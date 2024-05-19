// src/components/NewsForm.js
import React, { useState } from 'react';
import { firestore, ref, storage } from '../firebase';
const NewsForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storageRef = ref(storage, 'images/' + image.name);
    const fileRef = storageRef.child(image.name);
    await fileRef.put(image);
    const imageUrl = await fileRef.getDownloadURL();
    

    await firestore.collection('news').add({
      title,
      content,
      imageUrl,
      createdAt: new Date()
    });

    setTitle('');
    setContent('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewsForm;
