'use client';
import EditableImage from '@/components/EditableImage';
import { useEffect, useState } from 'react';
import MenuItemPriceProps from './MenuItemPriceProps';

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredients, setExtraIngredients] = useState(
    menuItem?.extraIngredients || []
  );
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(menuItem?.category || '');
  useEffect(() => {
    fetch('/api/categories').then((response) =>
      response.json().then((categories) => {
        setCategories(categories);
      })
    );
  }, []);

  return (
    <form
      className="mt-8 max-w-md mx-auto"
      onSubmit={(e) =>
        onSubmit(e, {
          image,
          name,
          description,
          category,
          basePrice,
          sizes,
          extraIngredients,
        })
      }
    >
      <div
        className="md:grid items-start gap-4"
        style={{ gridTemplateColumns: '.3fr .7fr' }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label htmlFor="item-name">Item name</label>
          <input
            id="item-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          <label htmlFor="price">Base price</label>
          <input
            id="price"
            type="text"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
          />
          <MenuItemPriceProps
            name={'Sizes'}
            addLabel={'Add sizes'}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={'Extra ingredients'}
            addLabel={'Add ingredients prices'}
            props={extraIngredients}
            setProps={setExtraIngredients}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
