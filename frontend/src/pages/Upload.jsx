import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import {
  HiUpload,
  HiDocument,
  HiTrash,
  HiEye,
  HiCheckCircle,
  HiExclamationCircle,
  HiCloudUpload,
  HiDocumentText,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import Button from '../components/common/Button';
import UploadCard from '../components/cards/UploadCard';
import { uploadContract, getContracts } from '../services/api';

const Upload = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedContracts, setUploadedContracts] = useState([]);

  useEffect(() => {
    fetchUploadedContracts();
  }, []);

  const fetchUploadedContracts = async () => {
    try {
      const response = await getContracts();
      setUploadedContracts(response.data.contracts || []);
    } catch (error) {
      console.error('Failed to fetch contracts:', error);
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      name: file.name,
      size: file.size,
      status: 'pending',
      progress: 0,
      id: Date.now() + Math.random(),
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Auto-upload each file
    for (const fileObj of newFiles) {
      await handleUpload(fileObj);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    onDropRejected: (rejections) => {
      rejections.forEach((rejection) => {
        rejection.errors.forEach((error) => {
          toast.error(`${rejection.file.name}: ${error.message}`);
        });
      });
    },
  });

  const handleUpload = async (fileObj) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', fileObj.file);

    try {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileObj.id ? { ...f, status: 'uploading', progress: 0 } : f
        )
      );

      const response = await uploadContract(formData);
      
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileObj.id ? { ...f, status: 'uploaded', progress: 100 } : f
        )
      );

      toast.success(`${fileObj.name} uploaded successfully!`);
      fetchUploadedContracts();
    } catch (error) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileObj.id ? { ...f, status: 'error', progress: 0 } : f
        )
      );
      toast.error(`Failed to upload ${fileObj.name}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (fileObj) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileObj.id));
    toast.success('File removed');
  };

  const handleView = (contract) => {
    navigate('/viewer', { state: { contract } });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Upload Contract</h1>
          <p className="text-secondary-400">
            Upload your contract documents for AI-powered analysis
          </p>
        </div>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`dropzone mb-8 ${
            isDragActive ? 'active border-primary-500 bg-primary-500/5' : ''
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center py-8">
            <div
              className={`p-4 rounded-2xl mb-4 transition-all duration-300 ${
                isDragActive
                  ? 'bg-primary-500/20 text-primary-400 scale-110'
                  : 'bg-secondary-800/50 text-secondary-400'
              }`}
            >
              <HiCloudUpload className="h-12 w-12" />
            </div>
            {isDragActive ? (
              <p className="text-lg font-medium text-primary-400">Drop your files here...</p>
            ) : (
              <>
                <p className="text-lg font-medium text-white mb-2">
                  Drag & drop your contract here
                </p>
                <p className="text-sm text-secondary-400 mb-4">or click to browse files</p>
                <Button variant="primary" size="sm" icon={HiUpload}>
                  Choose Files
                </Button>
              </>
            )}
            <p className="text-xs text-secondary-500 mt-4">
              Supported formats: PDF, DOC, DOCX (Max 50MB)
            </p>
          </div>
        </div>

        {/* Upload Progress */}
        {files.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">
              Uploading Files ({files.length})
            </h2>
            <div className="space-y-3">
              {files.map((fileObj) => (
                <UploadCard
                  key={fileObj.id}
                  file={fileObj}
                  onDelete={handleDelete}
                  onView={handleView}
                  index={files.indexOf(fileObj)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Uploaded Contracts */}
        {uploadedContracts.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">
              Uploaded Contracts ({uploadedContracts.length})
            </h2>
            <div className="space-y-3">
              {uploadedContracts.map((contract, index) => (
                <div
                  key={contract.id || index}
                  className="group glass-card rounded-xl p-4 hover:bg-white/[0.08] transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                        <HiDocumentText className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {contract.name || `Contract_${index + 1}.pdf`}
                      </p>
                      <p className="text-xs text-secondary-400 mt-0.5">
                        {contract.created_at
                          ? new Date(contract.created_at).toLocaleDateString()
                          : 'Recently added'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(contract)}
                        className="p-2 rounded-lg bg-secondary-700/50 hover:bg-primary-500/20 text-secondary-300 hover:text-primary-400 transition-all"
                        title="View"
                      >
                        <HiEye className="h-4 w-4" />
                      </button>
                      <HiCheckCircle className="h-5 w-5 text-emerald-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {files.length === 0 && uploadedContracts.length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="inline-flex p-4 rounded-xl bg-secondary-700/50 text-secondary-400 mb-4">
              <HiDocumentText className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No contracts uploaded</h3>
            <p className="text-secondary-400">
              Upload your first contract to start the AI analysis
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
