import { initializeApp } from 'firebase/app';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';

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

// Firestore ve Storage'i al
const storage = getStorage(app);
const db = getFirestore(app);

const NewsForm = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [newsItems, setNewsItems] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (file && title && content) {
      try {
        // Depolama referansını oluştur
        const storageRef = ref(storage, `uploads/${file.name}`);
        
        // Dosyayı yükle
        await uploadBytes(storageRef, file);

        // Dosyanın indirme URL'sini al
        const url = await getDownloadURL(storageRef);
        
        // Firestore'a haber ekle
        const docRef = await addDoc(collection(db, 'news'), {
          title,
          content,
          imageUrl: url
        });

        console.log('Haber başarıyla eklendi:', docRef.id);

        // Haberler listesine ekle
        setNewsItems(prevItems => [...prevItems, { title, content, imageUrl: url }]);

        // Formu sıfırla
        setTitle('');
        setContent('');
        setFile(null);
      } catch (error) {
        console.error('Haber eklenirken hata oluştu:', error);
      }
    } else {
      console.error('Lütfen tüm alanları doldurun.');
    }
  };

  // Sayfa yüklendiğinde Firestore'dan haberleri al
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'news'));
        const newsList = querySnapshot.docs.map(doc => doc.data());
        setNewsItems(newsList);
      } catch (error) {
        console.error('Haberler alınırken hata oluştu:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input 
          type="text" 
          placeholder="Haber Başlığı" 
          value={title} 
          onChange={handleTitleChange} 
        />
        <textarea 
          placeholder="Haber İçeriği" 
          value={content} 
          onChange={handleContentChange} 
        />
        <button type="submit">Yükle</button>
      </form>
      <div>
        <h3>Yüklenen Haberler:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {newsItems.map((item, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
              <h4>{item.title}</h4>
              <p>{item.content}</p>
              <img src={item.imageUrl} alt={`Uploaded news ${index}`} style={{ width: '100px', height: 'auto' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsForm;