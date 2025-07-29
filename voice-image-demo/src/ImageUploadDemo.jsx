import React, { useState } from 'react';
import { Upload, Camera, Check, X } from 'lucide-react';

const ImageUploadDemo = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Please select an image smaller than 5MB');
        return;
      }
      
      setSelectedImage(file);
      setUploadComplete(false);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!selectedImage) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handleRemove = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setUploadProgress(0);
    setUploadComplete(false);
    document.getElementById('imageInput').value = '';
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '24px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    padding: '32px',
    maxWidth: '450px',
    width: '100%'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '32px'
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: '8px'
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '8px',
    margin: 0
  };

  const subtitleStyle = {
    color: '#666',
    fontSize: '16px',
    margin: 0
  };

  const uploadAreaStyle = {
    marginBottom: '24px'
  };

  const dropzoneStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '250px',
    border: '2px dashed #d1d5db',
    borderRadius: '16px',
    cursor: 'pointer',
    backgroundColor: '#f9fafb',
    transition: 'all 0.3s ease',
    textAlign: 'center'
  };

  const dropzoneHoverStyle = {
    ...dropzoneStyle,
    backgroundColor: '#f3f4f6',
    borderColor: '#3b82f6'
  };

  const imagePreviewContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '250px',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: '#f3f4f6'
  };

  const imagePreviewStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  const removeButtonStyle = {
    position: 'absolute',
    top: '12px',
    right: '12px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    transition: 'background-color 0.3s ease'
  };

  const successIndicatorStyle = {
    position: 'absolute',
    top: '12px',
    left: '12px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
  };

  const fileInfoStyle = {
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const progressContainerStyle = {
    marginBottom: '24px'
  };

  const progressHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px'
  };

  const progressBarBackgroundStyle = {
    width: '100%',
    backgroundColor: '#e5e7eb',
    borderRadius: '8px',
    height: '8px'
  };

  const progressBarStyle = {
    backgroundColor: '#3b82f6',
    height: '8px',
    borderRadius: '8px',
    transition: 'width 0.3s ease',
    width: `${uploadProgress}%`
  };

  const successMessageStyle = {
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#ecfdf5',
    border: '1px solid #bbf7d0',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center'
  };

  const buttonStyle = {
    width: '100%',
    padding: '16px 24px',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '12px',
    boxSizing: 'border-box'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    color: 'white'
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#9ca3af',
    color: 'white',
    cursor: 'not-allowed'
  };

  const successButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f3f4f6',
    color: '#666',
    fontWeight: '500'
  };

  const tipStyle = {
    marginTop: '24px',
    padding: '16px',
    backgroundColor: '#eff6ff',
    borderRadius: '12px'
  };

  const tipTextStyle = {
    fontSize: '14px',
    color: '#1e40af',
    margin: 0
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={logoStyle}>🪜 SkillLadder</div>
          <h1 style={titleStyle}>Upload Your Photo</h1>
          <p style={subtitleStyle}>Add a profile picture to build trust with employers</p>
        </div>

        {/* Upload Area */}
        <div style={uploadAreaStyle}>
          {!imagePreview ? (
            <label 
              htmlFor="imageInput"
              style={dropzoneStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, dropzoneHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, dropzoneStyle)}
            >
              <div>
                <Upload size={48} color="#9ca3af" style={{ marginBottom: '16px' }} />
                <p style={{ marginBottom: '8px', fontSize: '18px', fontWeight: '500', color: '#666' }}>
                  <span style={{ fontWeight: '600' }}>Click to upload</span>
                </p>
                <p style={{ fontSize: '14px', color: '#9ca3af' }}>PNG, JPG up to 5MB</p>
              </div>
              <input 
                id="imageInput" 
                type="file" 
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageSelect}
              />
            </label>
          ) : (
            <div style={imagePreviewContainerStyle}>
              <img 
                src={imagePreview} 
                alt="Preview" 
                style={imagePreviewStyle}
              />
              
              {/* Remove button */}
              <button
                onClick={handleRemove}
                style={removeButtonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
              >
                <X size={16} />
              </button>
              
              {/* Upload complete indicator */}
              {uploadComplete && (
                <div style={successIndicatorStyle}>
                  <Check size={16} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* File Info */}
        {selectedImage && (
          <div style={fileInfoStyle}>
            <div>
              <p style={{ fontWeight: '500', color: '#333', margin: 0, marginBottom: '4px' }}>
                {selectedImage.name}
              </p>
              <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
                {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Camera size={32} color="#3b82f6" />
          </div>
        )}

        {/* Progress Bar */}
        {isUploading && (
          <div style={progressContainerStyle}>
            <div style={progressHeaderStyle}>
              <span>Uploading...</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <div style={progressBarBackgroundStyle}>
              <div style={progressBarStyle}></div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {uploadComplete && (
          <div style={successMessageStyle}>
            <Check size={20} color="#065f46" style={{ marginRight: '8px' }} />
            <p style={{ color: '#065f46', fontWeight: '500', margin: 0 }}>
              Photo uploaded successfully!
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ width: '100%' }}>
          {selectedImage && !uploadComplete && (
            <button
              onClick={handleUpload}
              disabled={isUploading}
              style={isUploading ? disabledButtonStyle : primaryButtonStyle}
              onMouseEnter={(e) => {
                if (!isUploading) {
                  e.target.style.background = 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isUploading) {
                  e.target.style.background = 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {isUploading ? 'Uploading...' : '📸 Upload Photo'}
            </button>
          )}
          
          {uploadComplete && (
            <button
              style={successButtonStyle}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 16px rgba(16, 185, 129, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              ✅ Continue to Profile
            </button>
          )}
          
          {!selectedImage && (
            <label 
              htmlFor="imageInput"
              style={{
                ...primaryButtonStyle, 
                display: 'block', 
                textAlign: 'center', 
                textDecoration: 'none',
                boxSizing: 'border-box',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              📷 Choose Photo
            </label>
          )}
          
          <button 
            style={secondaryButtonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
          >
            Skip for now
          </button>
        </div>

        {/* Tips */}
        <div style={tipStyle}>
          <p style={tipTextStyle}>
            <span style={{ fontWeight: '600' }}>💡 Tip:</span> A clear photo increases your chances of getting hired by 3x!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadDemo;