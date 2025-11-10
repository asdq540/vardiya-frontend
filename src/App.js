import React, { useState } from "react";
import "./index.css";

function App() {
  const [formData, setFormData] = useState({
    tarih: "",
    vardiya: "",
    hat: "",
  });
  const [aciklamalar, setAciklamalar] = useState([
    { aciklama: "", personel: "", foto: "" },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAciklamaChange = (index, field, value) => {
    const yeni = [...aciklamalar];
    yeni[index][field] = value;
    setAciklamalar(yeni);
  };

  const handleFotoSec = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      alert("Lütfen 1 MB altı bir fotoğraf seçin.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const yeni = [...aciklamalar];
      yeni[index].foto = reader.result;
      setAciklamalar(yeni);
    };
    reader.readAsDataURL(file);
  };

  const yeniSatir = () => {
    setAciklamalar([...aciklamalar, { aciklama: "", personel: "", foto: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, aciklamalar };

    try {
      const response = await fetch("https://vardiya-backend.onrender.com/api/kaydet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      alert(result.mesaj || result.hata || "Bilinmeyen hata!");
    } catch (err) {
      alert("Sunucuya bağlanılamadı: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold text-blue-600 text-center mb-6">
          📋 Vardiya Kayıt Formu
        </h2>

        <label className="font-medium text-gray-700">Tarih:</label>
        <input
          type="date"
          name="tarih"
          value={formData.tarih}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-lg mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <label className="font-medium text-gray-700">Vardiya:</label>
        <select
          name="vardiya"
          value={formData.vardiya}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-lg mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="">Seçiniz</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>

        <label className="font-medium text-gray-700">Hat:</label>
        <select
          name="hat"
          value={formData.hat}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="">Seçiniz</option>
          <option value="R1">R1</option>
          <option value="R2">R2</option>
          <option value="R3">R3</option>
        </select>

        <h3 className="text-lg font-semibold text-blue-500 mb-4">Açıklamalar:</h3>

        {aciklamalar.map((item, i) => (
          <div
            key={i}
            className="bg-gray-50 border border-gray-200 p-4 rounded-xl mb-4 shadow-sm"
          >
            <input
              type="text"
              placeholder="Açıklama"
              value={item.aciklama}
              onChange={(e) => handleAciklamaChange(i, "aciklama", e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md mb-2 focus:ring-2 focus:ring-blue-300 outline-none"
            />
            <input
              type="text"
              placeholder="Personel"
              value={item.personel}
              onChange={(e) => handleAciklamaChange(i, "personel", e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md mb-2 focus:ring-2 focus:ring-blue-300 outline-none"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFotoSec(i, e)}
              className="w-full mb-2"
            />
            {item.foto && (
              <img
                src={item.foto}
                alt="Önizleme"
                className="mt-2 rounded-lg shadow-md max-w-[150px]"
              />
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={yeniSatir}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg w-full mt-2"
        >
          + Yeni Satır Ekle
        </button>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg w-full mt-4"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
}

export default App;
