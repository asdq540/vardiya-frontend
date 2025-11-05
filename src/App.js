import React, { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    tarih: "",
    vardiya: "1",
    hat: "R1",
    aciklamalar: Array(10).fill(""),
    personel: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAciklamaChange = (index, value) => {
    const yeniAciklamalar = [...formData.aciklamalar];
    yeniAciklamalar[index] = value;
    setFormData({ ...formData, aciklamalar: yeniAciklamalar });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://vardiya-backend.onrender.com/api/kaydet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.mesaj || data.hata);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Vardiya Kayıt Formu</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Tarih */}
        <div>
          <label className="block font-semibold">Tarih</label>
          <input
            type="date"
            name="tarih"
            value={formData.tarih}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Vardiya Seçimi */}
        <div>
          <label className="block font-semibold">Vardiya</label>
          <select
            name="vardiya"
            value={formData.vardiya}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="1">1. Vardiya</option>
            <option value="2">2. Vardiya</option>
            <option value="3">3. Vardiya</option>
            <option value="4">4. Vardiya</option>
          </select>
        </div>

        {/* Hat Seçimi */}
        <div>
          <label className="block font-semibold">Hat No</label>
          <select
            name="hat"
            value={formData.hat}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="R1">R1</option>
            <option value="R2">R2</option>
            <option value="R3">R3</option>
          </select>
        </div>

        {/* Açıklamalar */}
        <div>
          <label className="block font-semibold mb-2">Açıklamalar (10 adet)</label>
          {formData.aciklamalar.map((aciklama, index) => (
            <input
              key={index}
              type="text"
              value={aciklama}
              onChange={(e) => handleAciklamaChange(index, e.target.value)}
              className="border p-2 rounded w-full mb-2"
              placeholder={`Açıklama ${index + 1}`}
            />
          ))}
        </div>

        {/* Personel */}
        <div>
          <label className="block font-semibold">İlgili Personel</label>
          <input
            type="text"
            name="personel"
            value={formData.personel}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Gönder Butonu */}
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

export default Form;
