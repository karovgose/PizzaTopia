'use client';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function EditableImage({ link, setLink }) {
  async function fileChange(e) {
    const files = e?.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set('file', files[0]);

      const uploadingPromise = new Promise(async (resolve, reject) => {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: data,
        });
        const srcImg = await response.json();
        setLink(srcImg);
        if (response.ok) resolve();
        else reject();
      });
      await toast.promise(uploadingPromise, {
        loading: 'Uploading....',
        success: 'Upload complete!',
        error: 'Upload complete! fail!',
      });
    }
  }
  return (
    <>
      {' '}
      {link && (
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={link}
          layout="responsive"
          width={96}
          height={96}
          alt={'avatar'}
        />
      )}
      {!link && (
        <div className="bg-gray-200 p-4 text-center text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={fileChange} />
        <span className="border border-gray-300 rounded-lg p-2 block text-center cursor-pointer">
          Change image
        </span>
      </label>
    </>
  );
}
