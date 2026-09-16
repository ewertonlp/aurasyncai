import { useDropzone } from 'react-dropzone';
import type { Accept } from 'react-dropzone';

type UploadZoneProps = {
  alternateLabel?: string;
  onFileUpload: (files: File[]) => void;
  /** Accepted MIME types or file extensions (e.g., 'image/*' or '.png,.jpg') */
  accept?: string;
};

export const UploadZone = ({
  alternateLabel = 'Drop files here or click to upload',
  onFileUpload,
  accept = 'image/*',
}: UploadZoneProps) => {
  // Convert accept string to Accept object for useDropzone
  const acceptObject: Accept = {};
  if (accept) {
    accept.split(',').forEach(type => {
      acceptObject[type.trim()] = [];
    });
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptObject,
    multiple: true,
    onDrop: (acceptedFiles) => {
      onFileUpload(acceptedFiles);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`glass-container p-8 text-center cursor-pointer border-dashed ${
        isDragActive ? 'border-blue-500/50' : 'border-gray-700'
      } hover:border-blue-500/30 transition-all`}
    >
      <input
        {...getInputProps()}
        accept={accept}
      />
      <div className="space-y-4">
        {isDragActive ? (
          <p className="text-blue-400 font-medium">Release to upload</p>
        ) : (
          <p className="text-gray-400">{alternateLabel}</p>
        )}
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16v4a2 2 0 002 2h6a2 2 0 002-2v-4M11 8h6m-6 0l3 3M11 8l-3 3"></path>
          </svg>
          <span className="text-sm text-gray-400">Browse Files</span>
        </div>
        <p className="text-xs text-gray-500">
          PNG, JPG, WEBP up to 10MB each
        </p>
      </div>
    </div>
  );
};