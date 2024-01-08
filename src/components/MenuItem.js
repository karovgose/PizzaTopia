import Image from 'next/image';
import { useContext, useState } from 'react';
import { CartContext } from './AppContext';
import toast from 'react-hot-toast';
import MenuItemTile from './MenuItemTile';

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, sizes, extraIngredients } =
    menuItem;
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const { addToCart } = useContext(CartContext);
  const hasSizesOrExtras = sizes.length > 0 || extraIngredients.length > 0;

  function handleAddToCart() {
    if (hasSizesOrExtras && !showPopup) {
      setShowPopup(true);
      return;
    }
    if (showPopup) {
      addToCart(menuItem, selectedSize, selectedExtras);
    } else {
      addToCart(menuItem);
    }

    setShowPopup(false);
    toast.success('Added to cart!');
  }

  function handleAddExtraThink(e, extraThing) {
    const checked = e.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((extra) => extra.name !== extraThing.name);
      });
    }
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }
  return (
    <>
      {showPopup && (
        <div
          className="fixed top-0 left-0 right-0 bg-black/80 flex items-center justify-center "
          style={{ overflow: 'auto', maxHeight: '100vh' }}
          onClick={() => setShowPopup(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white my-8 p-4 rounded-lg max-w-md overflow-auto"
            style={{ maxHeight: 'calc(100vh - 80px)' }}
          >
            <Image
              src={image}
              alt={name}
              width={300}
              height={300}
              className="mx-auto"
            />
            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
            <p className="text-center text-gray-500 text-sm">{description}</p>
            {sizes.length > 0 && (
              <div className="rounded-md py-2">
                <h3 className="text-center text-gray-800">Pick your size</h3>
                {sizes.map((size) => (
                  <label
                    key={size._id}
                    className="flex items-center gap-1 p-4 border rounded-md mb-1"
                  >
                    <input
                      type="radio"
                      name="size"
                      onChange={() => {
                        setSelectedSize(size);
                      }}
                      checked={selectedSize?.name === size.name}
                    />{' '}
                    {size.name} ${basePrice + size.price}
                  </label>
                ))}
              </div>
            )}
            {extraIngredients.length > 0 && (
              <div className="rounded-md py-2">
                <h3 className="text-center text-gray-800">
                  Add extra ingredients:
                </h3>
                {extraIngredients.map((extraThing) => (
                  <label
                    key={extraThing._id}
                    className="flex items-center gap-1 p-4 border rounded-md mb-1"
                  >
                    <input
                      type="checkbox"
                      name={extraThing.name}
                      onChange={(e) => handleAddExtraThink(e, extraThing)}
                    />{' '}
                    {extraThing.name} +${extraThing.price}
                  </label>
                ))}
              </div>
            )}
            <button
              className="bg-red-500 text-white sticky bottom-2"
              type="button"
              onClick={handleAddToCart}
            >
              Add to cart ${selectedPrice}
            </button>
            <button className="mt-2" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <MenuItemTile
        onAddToCart={handleAddToCart}
        {...menuItem}
        hasSizesOrExtras={hasSizesOrExtras}
      />
    </>
  );
}
