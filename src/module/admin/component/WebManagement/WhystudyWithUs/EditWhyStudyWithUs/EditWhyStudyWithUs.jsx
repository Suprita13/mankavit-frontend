import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Container,
  Title,
  Label,
  Input,
  TextArea,
  DropZone,
  DropZoneText,
  ImageIcon,
  PreviewImage,
  UploadButton,
  ErrorMessage
} from './EditWhyStudyWithUs.styles';

import uploadIcon from '../../../../../../assets/upload.png';
import { getWhyById, updateWhyById } from '../../../../../../api/whyApi';
import { uploadFileToAzureStorage } from '../../../../../../utils/azureStorageService';

import { toast, ToastContainer } from 'react-toastify';  // <-- import toast & ToastContainer
import 'react-toastify/dist/ReactToastify.css';

const EditWhyStudyWithUs = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageFile: null,
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchWhy = async () => {
      try {
        const resp = await getWhyById(id);
        const doc = resp.data ?? resp;
        setFormData({
          title: doc.title || '',
          description: doc.description || '',
          imageFile: null,
        });
        setPreviewUrl(doc.image || '');
      } catch (err) {
        console.error('Error loading item:', err);
        setError('Failed to load the item.');
        toast.error('Failed to load the item.');
      }
    };

    fetchWhy();
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      const msg = 'Please upload a valid image file.';
      setError(msg);
      toast.warning(msg);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      const msg = 'Image size should be less than 5MB.';
      setError(msg);
      toast.warning(msg);
      return;
    }

    setError('');
    setFormData(prev => ({ ...prev, imageFile: file }));

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.description.trim()) {
      const msg = 'Title and Description are required.';
      setError(msg);
      toast.warning(msg);
      return;
    }

    setLoading(true);
    try {
      let imageUrl = previewUrl;

      if (formData.imageFile) {
        const uploadResult = await uploadFileToAzureStorage(
          formData.imageFile,
          'why'
        );

        imageUrl =
          uploadResult?.url ??
          uploadResult?.fileUrl ??
          uploadResult?.filePath ??
          uploadResult?.blobUrl ??
          (typeof uploadResult === 'string' ? uploadResult : null);

        if (!imageUrl) {
          throw new Error(
            `Unexpected upload response format: ${JSON.stringify(
              uploadResult
            )}`
          );
        }
      }

      await updateWhyById(id, {
        title: formData.title,
        description: formData.description,
        image: imageUrl,
      });

      toast.success('Updated successfully!');
      setTimeout(() => navigate('/admin/web-management/why-study-with-us'), 1000);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Something went wrong, please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
           <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Title>Edit Why Study With Us</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Label>Title *</Label>
      <Input
        name="title"
        value={formData.title}
        onChange={(e) => {
          const filteredData = e.target.value.replace(/[^a-zA-Z\s]/g, '');
          setFormData((prev) => ({ ...prev, title: filteredData }));
        }}
        placeholder="Enter title"
      />

      <Label>Description *</Label>
      <TextArea
        name="description"
        value={formData.description}
        onChange={(e) => {
          const filteredData = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
          setFormData((prev) => ({ ...prev, description: filteredData }));
        }}
        rows={5}
        placeholder="Enter description"
      />

      <Label>Image *</Label>
      <DropZone hasImage={!!previewUrl}>
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <label htmlFor="upload-image" style={{ cursor: 'pointer' }}>
          {previewUrl ? (
            <PreviewImage src={previewUrl} alt="Preview" />
          ) : (
            <>
              <ImageIcon>
                <img src={uploadIcon} alt="Upload" width={50} />
              </ImageIcon>
              <DropZoneText>
                Drag & drop image here, or click to select
              </DropZoneText>
            </>
          )}
        </label>
      </DropZone>

      <UploadButton onClick={handleSubmit} disabled={loading}>
        {loading ? 'Updating…' : 'Update'}
      </UploadButton>
    </Container>
  );
};

export default EditWhyStudyWithUs;
