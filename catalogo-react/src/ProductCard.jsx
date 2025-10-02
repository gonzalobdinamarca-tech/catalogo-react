export default function ProductCard({ product }) {
  return (
    <div className="border rounded-2xl p-4 bg-white shadow-md">
      {product.images.length > 0 ? (
        <img
          src={product.images[0]}
          alt={product.name}
          className="rounded-lg mb-2 w-full h-40 object-cover"
        />
      ) : (
        <div className="w-full h-40 flex items-center justify-center bg-gray-200 rounded-lg mb-2">
          <span className="text-gray-500">Sin imagen</span>
        </div>
      )}
      <h4 className="text-lg font-semibold">{product.name}</h4>
      <p className="text-sm text-gray-600">Precio: ${product.price}</p>
      {product.videos.length > 0 && (
        <iframe
          className="mt-2 w-full h-40 rounded-lg"
          src={product.videos[0]}
          title="video"
          allowFullScreen
        />
      )}
    </div>
  );
}
