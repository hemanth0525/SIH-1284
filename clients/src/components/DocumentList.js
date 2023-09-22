import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You need to install axios as a dependency

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Replace 'your-document-list-api-endpoint' with your actual API endpoint for fetching document list
    axios.get('your-document-list-api-endpoint')
      .then((response) => {
        if (response.status === 200) {
          setDocuments(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching document list:', error);
      });
  }, []);

  return (
    <div>
      <h2>Document List</h2>
      <ul>
        {documents.map((document, index) => (
          <li key={index}>
            <a href={document.url} target="_blank" rel="noopener noreferrer">
              {document.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
