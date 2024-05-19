import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
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
  const [uploadedFiles, setUploadedFiles] = useState([]);

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

        // Dosyanın indirme URL'sini al
        const url = await getDownloadURL(storageRef);
        
        // Yüklenen dosyayı listeye ekle
        setUploadedFiles(prevFiles => [...prevFiles, { url }]);

        console.log('Dosya başarıyla yüklendi ve URL alındı:', url);
      } catch (error) {
        console.error('Dosya yüklenirken hata oluştu:', error);
      }
    } else {
      console.error('Dosya seçilmedi.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Yükle</button>
      </form>
      <div>
        <h3>Yüklenen Dosyalar:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {uploadedFiles.map((file, index) => (
            <img key={index} src={file.url} alt={`Uploaded file ${index}`} style={{ width: '100px', height: 'auto' }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsForm;