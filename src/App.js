import React, { useState } from "react";
import "./index.css";

function App() {
  const [formData, setFormData] = useState({ tarih: "", vardiya: "", hat: "" });
  const [aciklamalar, setAciklamalar] = useState([
    { id: Date.now(), aciklama: "", personel: "", foto: "" }
  ]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAciklamaChange = (id, field, value) => {
    setAciklamalar(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleFotoSec = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      alert("Lütfen 1 MB altı bir fotoğraf seçin.");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setAciklamalar(prev => prev.map(it => it.id === id ? { ...it, foto: reader.result } : it));
    };
    reader.readAsDataURL(file);
  };

  const yeniSatir = () => {
    const newRow = { id: Date.now() + Math.random(), aciklama: "", personel: "", foto: "" };
    setAciklamalar(prev => [...prev, newRow]);
    // odaklama veya scroll eklenebilir
  };

  const satirSil = (id) => {
    setAciklamalar(prev => prev.filter(it => it.id !== id));
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
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-blue-600 text-center mb-6">📋 Vardiya Kayıt Formu</h2>

        <label>Tarih:</label>
        <input type="date" name="tarih" value={formData.tarih} onChange={handleChange} required />

        <label>Vardiya:</label>
        <select name="vardiya" value={formData.vardiya} onChange={handleChange} required>
          <option value="">Seçiniz</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
        </select>

        <label>Hat:</label>
        <select name="hat" value={formData.hat} onChange={handleChange} required>
          <option value="">Seçiniz</option><option value="R1">R1</option><option value="R2">R2</option><option value="R3">R3</option>
        </select>

        <h3 className="text-lg font-semibold text-blue-500 mb-4">Açıklamalar:</h3>

        {aciklamalar.map((item) => (
          <div key={item.id} className="bg-gray-50 border p-4 rounded-xl mb-4">
            <input
              type="text"
              placeholder="Açıklama"
              value={item.aciklama}
              onChange={(e) => handleAciklamaChange(item.id, "aciklama", e.target.value)}
            />
            <input
              type="text"
              placeholder="Personel"
              value={item.personel}
              onChange={(e) => handleAciklamaChange(item.id, "personel", e.target.value)}
            />
            <input type="file" accept="image/*" onChange={(e) => handleFotoSec(item.id, e)} />
            {item.foto && <img src={item.foto} alt="Önizleme" style={{ maxWidth: 150, marginTop: 8 }} />}
            <div style={{ marginTop: 8 }}>
              <button type="button" onClick={() => satirSil(item.id)} style={{ marginRight: 8 }}>
                Satırı Sil
              </button>
            </div>
          </div>
        ))}

        {/* ÖNEMLİ: type="button" olmalı, aksi halde form submit olur */}
        <button type="button" onClick={yeniSatir} className="bg-orange-500 text-white px-4 py-2 rounded-lg w-full mt-2">
          + Yeni Satır Ekle
        </button>

        <button type="submit" className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full mt-4">
          Kaydet
        </button>
      </form>
    </div>
  );
}

export default App;
