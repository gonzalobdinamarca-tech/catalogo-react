import { useState } from "react";
import productsData from "./products.json";
import ProductCard from "./ProductCard";

export default function App() {
  const [data, setData] = useState(productsData);

  const updateProduct = (id, field, value) => {
    const updated = data.products.map((p) =>
      p.id === id ? { ...p, [field]: value.split(",").map((s) => s.trim()) } : p
    );
    setData({ ...data, products: updated });
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventario-actualizado.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 bg-[#fdfaf5] min-h-screen">
      <header className="text-center mb-6">
        <img
          src="https://via.placeholder.com/250x100?text=Bazar+Retro"
          alt="Bazar Retro"
          className="mx-auto mb-2"
        />
        <h1 className="text-3xl font-bold text-[#5a4632]">
          Bazar Retro - Editor de Catálogo
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.products.map((product) => (
          <div key={product.id} className="p-4 bg-[#fff9f3] rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>

            <label className="block mb-2">
              <span className="text-sm">Imágenes (URLs separadas por coma):</span>
              <input
                type="text"
                defaultValue={product.images.join(", ")}
                onBlur={(e) => updateProduct(product.id, "images", e.target.value)}
                className="w-full border p-2 rounded mt-1"
              />
            </label>

            <label className="block mb-2">
              <span className="text-sm">Videos (URLs separadas por coma):</span>
              <input
                type="text"
                defaultValue={product.videos.join(", ")}
                onBlur={(e) => updateProduct(product.id, "videos", e.target.value)}
                className="w-full border p-2 rounded mt-1"
              />
            </label>

            <div className="mt-4">
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={downloadJSON}
          className="bg-[#7c5c3b] text-white px-4 py-2 rounded-lg hover:bg-[#5a4632]"
        >
          Descargar JSON actualizado
        </button>
      </div>
    </div>
  );
}
