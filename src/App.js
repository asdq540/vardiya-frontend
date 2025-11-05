import React, { useState } from "react";

export default function VardiyaForm() {
  const [formData, setFormData] = useState({
    tarih: "",
    vardiya: "",
    hat: "",
    aciklamalar: Array.from({ length: 10 }, () => ({
      aciklama: "",
      personel: "",
      foto: "",
    })),
  });

  const handleChange = (index, field, value) => {
    const newAciklamalar = [...formData.aciklamalar];
    newAciklamalar[index][field] = value;
    setFormData({ ...formData, aciklamalar: newAciklamalar });
  };

  const handleFileChange = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      handleChange(index, "foto", base64String);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://vardiya-backend.onrender.com/api/kaydet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.mesaj || data.hata);
    } catch (err) {
      alert("Bir hata oluştu: " + err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-xl font-semibold mb-4">Vardiya Kayıt Formu</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <input
            type="date"
            value={formData.tarih}
            onChange={(e) => setFormData({ ...formData, tarih: e.target.value })}
            className="border p-2 rounded w-1/3"
            required
          />
          <select
            value={formData.vardiya}
            onChange={(e) => setFormData({ ...formData, vardiya: e.target.value })}
            className="border p-2 rounded w-1/3"
            required
          >
            <option value="">Vardiya Seç</option>
            <option value="1">1. Vardiya</option>
            <option value="2">2. Vardiya</option>
            <option value="3">3. Vardiya</option>
            <option value="4">4. Vardiya</option>
          </select>
          <select
            value={formData.hat}
            onChange={(e) => setFormData({ ...formData, hat: e.target.value })}
            className="border p-2 rounded w-1/3"
            required
          >
            <option value="">Hat Seç</option>
            <option value="R1">R1</option>
            <option value="R2">R2</option>
            <option value="R3">R3</option>
          </select>
        </div>

        <h2 className="font-semibold mt-4 mb-2">Açıklamalar, Personeller ve Fotoğraflar</h2>

        {formData.aciklamalar.map((row, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 mb-2 items-center">
            <input
              type="text"
              placeholder={`Açıklama ${i + 1}`}
              value={row.aciklama}
              onChange={(e) => handleChange(i, "aciklama", e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="İlgili Personel"
              value={row.personel}
              onChange={(e) => handleChange(i, "personel", e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(i, e.target.files[0])}
              className="p-2 border rounded"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded w-full hover:bg-blue-700 transition"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
}
