import React, { useState } from "react";

export default function KayitFormu() {
  const [tarih, setTarih] = useState("");
  const [vardiya, setVardiya] = useState("");
  const [hat, setHat] = useState("");
  const [aciklamalar, setAciklamalar] = useState([
    { aciklama: "", personel: "", foto: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [mesaj, setMesaj] = useState("");

  // 📸 Fotoğrafı base64 string'e çevir
  const handleFotoSec = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...aciklamalar];
      updated[index].foto = reader.result; // data:image/jpeg;base64,...
      setAciklamalar(updated);
    };
    reader.readAsDataURL(file);
  };

  // 💾 Form gönder
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMesaj("");

    const payload = { tarih, vardiya, hat, aciklamalar };

    try {
      const res = await fetch("https://senin-api-urlin.vercel.app/api/kaydet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) setMesaj(`✅ ${data.mesaj}`);
      else setMesaj(`❌ ${data.hata || "Bilinmeyen hata"}`);
    } catch (err) {
      setMesaj("❌ Sunucuya bağlanılamadı: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h2>📋 Üretim Formu</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Tarih:
          <input type="date" value={tarih} onChange={(e) => setTarih(e.target.value)} required />
        </label>
        <br />
        <label>
          Vardiya:
          <input value={vardiya} onChange={(e) => setVardiya(e.target.value)} required />
        </label>
        <br />
        <label>
          Hat:
          <input value={hat} onChange={(e) => setHat(e.target.value)} required />
        </label>
        <hr />

        {aciklamalar.map((item, index) => (
          <div key={index} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
            <label>
              Açıklama:
              <input
                value={item.aciklama}
                onChange={(e) => {
                  const updated = [...aciklamalar];
                  updated[index].aciklama = e.target.value;
                  setAciklamalar(updated);
                }}
              />
            </label>
            <br />
            <label>
              Personel:
              <input
                value={item.personel}
                onChange={(e) => {
                  const updated = [...aciklamalar];
                  updated[index].personel = e.target.value;
                  setAciklamalar(updated);
                }}
              />
            </label>
            <br />
            <label>
              Fotoğraf:
              <input type="file" accept="image/*" onChange={(e) => handleFotoSec(e, index)} />
            </label>
            {item.foto && (
              <div style={{ marginTop: 10 }}>
                <img src={item.foto} alt="önizleme" width="150" />
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => setAciklamalar([...aciklamalar, { aciklama: "", personel: "", foto: "" }])}
        >
          + Yeni Satır Ekle
        </button>

        <br />
        <button type="submit" disabled={loading} style={{ marginTop: 20 }}>
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </form>

      {mesaj && <p style={{ marginTop: 20 }}>{mesaj}</p>}
    </div>
  );
}
