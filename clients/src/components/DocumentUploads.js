import React, { useState } from 'react';
import axios from 'axios'; // You need to install axios as a dependency

const DocumentUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        // Replace 'your-upload-api-endpoint' with your actual API endpoint for uploading documents
        const response = await axios.post('your-upload-api-endpoint', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          alert('Document uploaded successfully.');
          // Optionally, you can update the document list after a successful upload.
        }
      } catch (error) {
        console.error('Error uploading document:', error);
        alert('Error uploading document. Please try again.');
      }
    } else {
      alert('Please select a document to upload.');
    }
  };

  return (
    <div>
      <h2>Document Upload</h2>
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default DocumentUpload;
