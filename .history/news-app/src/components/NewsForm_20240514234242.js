// src/components/NewsForm.js
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
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
