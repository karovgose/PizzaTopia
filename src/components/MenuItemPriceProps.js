'use client';
import { Trash2Icon, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}) {
  const [isOpen, setIsOpen] = useState(false);
  function addSize() {
    setProps((oldSize) => {
      return [...oldSize, { name: '', price: 0 }];
    });
  }

  function editSize(e, i, prop) {
    const newValue = e.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[i][prop] = newValue;
      return newSizes;
    });
  }

  function removeSize(i) {
    setProps((prev) => prev.filter((value, index) => index !== i));
  }
  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        type="button"
        className="inline-flex border-0 justify-start"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {isOpen && <ChevronUp />}
        {!isOpen && <ChevronDown />}
        <span>{name}</span> <span>({props?.length})</span>
      </button>
      <div className={isOpen ? 'block' : 'hidden'}>
        {' '}
        {props?.length > 0 &&
          props.map((size, i) => (
            <div key={i} className="flex items-end gap-2">
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={size.name}
                  onChange={(e) => editSize(e, i, 'name')}
                />
              </div>
              <div>
                <label>Extra price:</label>
                <input
                  type="text"
                  placeholder="Extra price"
                  value={size.price}
                  onChange={(e) => editSize(e, i, 'price')}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="bg-white mb-2"
                  onClick={() => removeSize(i)}
                >
                  <Trash2Icon />
                </button>
              </div>
            </div>
          ))}
      </div>

      <button type="button" className="bg-white" onClick={addSize}>
        <Plus />
        <span>{addLabel}</span>
      </button>
    </div>
  );
}
