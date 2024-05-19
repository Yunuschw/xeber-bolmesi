// src/components/NewsList.js
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const newsCollection = await firestore.collection('news').orderBy('createdAt', 'desc').get();
      setNews(newsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h2>News List</h2>
      {news.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
          <img src={item.imageUrl} alt={item.title} style={{ width: '100px' }} />
        </div>
      ))}
    </div>
  );
};

export default NewsList;
