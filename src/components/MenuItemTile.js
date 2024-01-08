import Image from 'next/image';

export default function MenuItemTile({
  onAddToCart,

  ...item
}) {
  const { image, name, description, basePrice, sizes, extraIngredients } = item;
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center group hover:bg-white transition-all hover:shadow-md hover:shadow-black/25">
      <div className="h-48 flex justify-center items-center">
        <Image src={image} alt={name} width={300} height={300} />
      </div>

      <div className="h-20 overflow-hidden">
        <h4 className="font-semibold text-xl">{name}</h4>
        <p className="text-gray-800 text-sm line-clamp-2">{description}</p>
      </div>
      <button
        type="button"
        className="bg-red-500 text-white px-8 py-2 rounded-full mt-2"
        onClick={onAddToCart}
      >
        <span>Add to card (from ${basePrice})</span>
      </button>
    </div>
  );
}
