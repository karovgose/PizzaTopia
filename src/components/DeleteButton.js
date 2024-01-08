'use client';
import { useState } from 'react';

export default function DeleteButton({ label, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="flex items-center justify-center h-full fixed inset-0 bg-black/80">
        <div className="top-0 left-0 bg-white p-4 rounded-xl">
          <div>Are you sure that you want to delete ?</div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <button
              type="button"
              className="bg-red-500 text-white"
              onClick={onDelete}
            >
              Yes,&nbsp;delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button type="button" onClick={() => setShowConfirm(true)}>
      {label}
    </button>
  );
}
