// src/components/NewsForm.js
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyB0DHA0Nsf5Aw_2iMpjaQzTvRn4dJxCOck",
  authDomain: "txtimg-36359.firebaseapp.com",
  projectId: "txtimg-36359",
  storageBucket: "txtimg-36359.appspot.com",
  messagingSenderId: "189050958678",
  appId: "1:189050958678:web:967180c5f9fd73a30b5cf7"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Storage'i al
const storage = getStorage(app);

const NewsForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (file) {
      try {
        // Depolama referansını oluştur
        const storageRef = ref(storage, `uploads/${file.name}`);
        
        // Dosyayı yükle
        await uploadBytes(storageRef, file);
        console.log('Dosya başarıyla yüklendi!');
      } catch (error) {
        console.error('Dosya yüklenirken hata oluştu:', error);
      }
    } else {
      console.error('Dosya seçilmedi.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Yükle</button>
    </form>
  );
};

export default NewsForm;
