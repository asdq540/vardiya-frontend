import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    tarih: "",
    vardiya: "",
    hat: "",
    aciklama: "",
    personel: "",
  });
  const [mesaj, setMesaj] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/kaydet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      setMesaj("✅ " + data.mesaj);
      setFormData({ tarih: "", vardiya: "", hat: "", aciklama: "", personel: "" });
    } else {
      setMesaj("❌ " + data.hata);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl p-8 rounded-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Vardiya Kayıt Formu</h2>
        <label className="block mb-1 font-medium">Tarih</label>
        <input type="date" name="tarih" value={formData.tarih} onChange={handleChange} className="border p-2 rounded w-full mb-4" required />
        <label className="block mb-1 font-medium">Vardiya</label>
        <select name="vardiya" value={formData.vardiya} onChange={handleChange} className="border p-2 rounded w-full mb-4" required>
          <option value="">Seçiniz</option>
          <option value="Gündüz">Gündüz</option>
          <option value="Gece">Gece</option>
        </select>
        <label className="block mb-1 font-medium">Hat</label>
        <input type="text" name="hat" value={formData.hat} onChange={handleChange} placeholder="Hat adı veya numarası" className="border p-2 rounded w-full mb-4" required />
        <label className="block mb-1 font-medium">Açıklama</label>
        <textarea name="aciklama" value={formData.aciklama} onChange={handleChange} placeholder="Kısa açıklama..." className="border p-2 rounded w-full mb-4" rows="3" required></textarea>
        <label className="block mb-1 font-medium">İlgili Personel</label>
        <input type="text" name="personel" value={formData.personel} onChange={handleChange} placeholder="Ad Soyad" className="border p-2 rounded w-full mb-4" required />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded w-full hover:bg-blue-700 transition">Kaydet</button>
        {mesaj && <p className="mt-4 text-center text-gray-700 font-medium">{mesaj}</p>}
      </form>
    </div>
  );
}
