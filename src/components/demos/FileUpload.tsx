"use client";

import { useCallback, useState } from "react";
import { Upload, FileSpreadsheet, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  loading?: boolean;
  disabled?: boolean;
  accept?: string;
}

export default function FileUpload({
  onFileSelect,
  loading = false,
  disabled = false,
  accept = ".csv",
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    if (!file.name.endsWith(".csv")) {
      setError("Please upload a CSV file");
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be under 10MB");
      return false;
    }
    setError(null);
    return true;
  };

  const handleFile = useCallback(
    (file: File) => {
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={cn(
          "relative rounded-xl border-2 border-dashed p-8 text-center transition-all",
          dragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50",
          (loading || disabled) && "opacity-50 pointer-events-none"
        )}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 cursor-pointer opacity-0"
          disabled={loading || disabled}
        />
        <div className="flex flex-col items-center gap-3">
          {loading ? (
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          ) : (
            <Upload className="h-10 w-10 text-muted" />
          )}
          <div>
            <p className="text-foreground font-medium">
              {disabled
                ? "Upload disabled — API not configured"
                : loading
                  ? "Sending to inference API..."
                  : "Drop CSV file here"}
            </p>
            <p className="text-sm text-muted mt-1">
              or click to browse (max 10MB)
            </p>
          </div>
        </div>
      </div>

      {selectedFile && !error && (
        <div className="flex items-center gap-3 rounded-lg bg-surface-elevated p-3">
          <FileSpreadsheet className="h-5 w-5 text-primary" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {selectedFile.name}
            </p>
            <p className="text-xs text-muted">
              {(selectedFile.size / 1024).toFixed(1)} KB
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-danger text-sm">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );
}
