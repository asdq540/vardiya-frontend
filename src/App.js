import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import "./index.css";

function App() {
  const [formData, setFormData] = useState({ tarih: "", vardiya: "", hat: "" });
  const [aciklamalar, setAciklamalar] = useState([
    { id: Date.now(), aciklama: "", personel: "", adet: 1, foto: null, preview: "" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAciklamaChange = (id, field, value) => {
    setAciklamalar(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleFotoSec = async (id, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const options = { maxSizeMB: 1, maxWidthOrHeight: 300, useWebWorker: true };
    const compressedFile = await imageCompression(file, options);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAciklamalar(prev =>
        prev.map(it =>
          it.id === id ? { ...it, preview: reader.result, foto: file } : it
        )
      );
    };
    reader.readAsDataURL(compressedFile);
  };

  const yeniSatir = () => {
    const newRow = { id: Date.now() + Math.random(), aciklama: "", personel: "", adet: 1, foto: null, preview: "" };
    setAciklamalar(prev => [...prev, newRow]);
  };

  const satirSil = (id) => {
    setAciklamalar(prev => prev.filter(it => it.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const aciklamalarPayload = await Promise.all(
      aciklamalar.map(async (item) => {
        let fotoBase64 = "";
        if (item.foto) {
          const reader = new FileReader();
          fotoBase64 = await new Promise(resolve => {
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(item.foto);
          });
        }
        return { ...item, foto: fotoBase64, adet: Number(item.adet) };
      })
    );

    const payload = { ...formData, aciklamalar: aciklamalarPayload };

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

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-blue-600 text-center mb-6">📋 Vardiya Kayıt Formu</h2>

        <div className="flex flex-col gap-4 mb-4">
          <label className="font-medium">Tarih:</label>
          <input type="date" name="tarih" value={formData.tarih} onChange={handleChange} required className="border rounded-lg p-2 w-full" />

          <label className="font-medium">Vardiya:</label>
          <select name="vardiya" value={formData.vardiya} onChange={handleChange} required className="border rounded-lg p-2 w-full">
            <option value="">Seçiniz</option>
            <option value="1">1</option><option value="2">2</option>
            <option value="3">3</option><option value="4">4</option>
          </select>

          <label className="font-medium">Hat:</label>
          <select name="hat" value={formData.hat} onChange={handleChange} required className="border rounded-lg p-2 w-full">
            <option value="">Seçiniz</option>
            <option value="R1">R1</option><option value="R2">R2</option><option value="R3">R3</option>
          </select>
        </div>

        <h3 className="text-lg font-semibold text-blue-500 mb-4">Açıklamalar:</h3>

        <div className="flex flex-col gap-4">
          {aciklamalar.map((item) => (
            <div key={item.id} className="bg-gray-50 border p-4 rounded-xl flex flex-col gap-3">
              <input
                type="text"
                placeholder="Açıklama"
                value={item.aciklama}
                onChange={(e) => handleAciklamaChange(item.id, "aciklama", e.target.value)}
                className="border rounded-lg p-2 w-full"
              />
              <input
                type="text"
                placeholder="Personel"
                value={item.personel}
                onChange={(e) => handleAciklamaChange(item.id, "personel", e.target.value)}
                className="border rounded-lg p-2 w-full"
              />
              <input
                type="number"
                min="1"
                placeholder="Adet"
                value={item.adet}
                onChange={(e) => handleAciklamaChange(item.id, "adet", e.target.value)}
                className="border rounded-lg p-2 w-full"
              />
              <input type="file" accept="image/*" onChange={(e) => handleFotoSec(item.id, e)} className="w-full" />
              {item.preview && <img src={item.preview} alt="Önizleme" className="max-w-xs mt-2 rounded-lg" />}
              <button type="button" onClick={() => satirSil(item.id)} className="self-start bg-red-500 text-white px-3 py-1 rounded-lg mt-2">
                Satırı Sil
              </button>
            </div>
          ))}
        </div>

        <button type="button" onClick={yeniSatir} className="bg-orange-500 text-white px-4 py-2 rounded-lg w-full mt-4">
          + Yeni Satır Ekle
        </button>

        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full mt-4">
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </form>
    </div>
  );
}

export default App;
