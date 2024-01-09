'use client';
import DeleteButton from '@/components/DeleteButton';
import Tabs from '@/components/Tabs';
import { UseProfile } from '@/components/UseProfile';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function CategoriesPage() {
  const { loading: profileLoading, data: profileData } = UseProfile();
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  if (profileLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-bars loading-md"></span>
      </div>
    );
  }

  if (!profileData.admin) {
    return 'Not an admin';
  }

  function fetchCategories() {
    fetch('/api/categories').then((res) =>
      res.json().then((categories) => {
        setCategories(categories);
      })
    );
  }

  async function handleCategorySubmit(e) {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editingCategory) {
        data._id = editingCategory._id;
      }
      const response = await fetch('/api/categories', {
        method: editingCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setCategoryName('');
      fetchCategories();
      setEditingCategory(null);
      if (response.ok) {
        resolve();
      } else reject();
    });
    await toast.promise(creationPromise, {
      loading: editingCategory
        ? 'Updating category...'
        : 'Creating your new category...',
      success: editingCategory ? 'Category updated' : 'Category created',
      error: 'Error.Creating new category fail.',
    });
  }

  async function handleDeleteCategory(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/categories?_id=' + _id, {
        method: 'DELETE',
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: 'Deleting category...',
      success: 'Category deleted successfully!',
      error: 'Failed to delete category!',
    });
    fetchCategories();
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <Tabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex items-end gap-2">
          <div className="grow">
            <label htmlFor="category-name">
              {editingCategory ? 'Update category' : 'New category name'}{' '}
              {editingCategory && (
                <>
                  <b>{editingCategory.name}</b>
                </>
              )}
            </label>
            <input
              id="category-name"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border" type="submit">
              {editingCategory ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingCategory(null);
                setCategoryName('');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Expiating category</h2>
        {categories.length > 0 &&
          categories.map((c) => (
            <div
              key={c._id}
              className="flex gap-1 items-center rounded-xl p-2 px-4 mb-1 bg-gray-100"
            >
              <div className="grow" key={c.id}>
                {c.name}
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCategory(c);
                    setCategoryName(c.name);
                  }}
                >
                  Edit
                </button>
                <DeleteButton
                  label={'Delete'}
                  onDelete={() => handleDeleteCategory(c._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
