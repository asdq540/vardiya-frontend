import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import "./index.css";

const aciklamaSecenekleri = [
  "4 yollu izolasyon açık",
  "4 yollu izolasyon eksik",
  "4 yollu izolasyon yanık",
  "4 yollu izolasyon yanlış",
  "4 Yollu Kaçak",
  "4 Yollu vidası eksik",
  "4 yollu vidası oturmamış",
  "Alt şase izolasyon eksik",
  "Alt şase vida eksik",
  "Alt şase vidası oturmamış",
  "Alt şase yamuk",
  "Anakart içinden vida çıktı",
  "Anakart işaretleme yok",
  "Anakart izolasyon eksik",
  "Anakart kablo klips eksik",
  "anakart kabloları takılmamış",
  "Anakart kapak eksik",
  "Anakart Nüvesi Yok",
  "Anakart oturmamış",
  "Anakart Sensör Soketi Kırık",
  "Anakart tapası eksik",
  "Anakart Topraklama Vidası Yok",
  "Anakart Vidası Eksik",
  "Anakart vidası oturmamış",
  "Anakart Yanlış Geldi",
  "ara bölme folyo yok",
  "ara bölme izolasyon eksik",
  "ara bölme izolasyon yarım",
  "Ara bölme izolasyon yırtık",
  "Ara bölme oturmamış",
  "Ara bölme sacı eksik",
  "Ara bölme tırnak kırık",
  "Ara bölme vida oturmamış",
  "Ara bölme vidası eksik",
  "Ara bölme vidası yanlış",
  "Bakır boru çatlak",
  "Braket Vidaları Gevşek",
  "Braket vidası atılmamış",
  "Denge Ağırlığı Eksik",
  "Devre Şema Yanlış Takılmış",
  "Devre şeması eksik",
  "Dikkat Etiketi Eksik",
  "Exp Gri Sünger İzolasyon Yanık",
  "Exp.  Takılmamış",
  "Exp. İzolasyon açık",
  "Exp. İzolasyon eksik",
  "Exp. izolasyon Yanlış Takılmış",
  "Exp. Kablosu klips yok",
  "Exp. Kablosu oturmamış",
  "Exp. Kablosu soket kırık",
  "Exp. Kablosu Takılmamış",
  "Exp. Kablosu yanık",
  "Exp. Motor klips eksik",
  "Exp. Motor oturmamış",
  "Exp. Motoru takılmamış",
  "Exp. Vidası atılmamış",
  "Exp.Motoru Yanlış Takılmış",
  "Fan braket vidası eksik",
  "Fan braket vidası yarım",
  "Fan braketi vidası eksik",
  "Fan destek sacı izolasyon eksik",
  "Fan destek sacı oturmamış",
  "Fan destek sacı pres hatalı",
  "Fan destek sacı vidası eksik",
  "fan kablo",
  "Fan kablosu kırık",
  "Fan kablosu klips eksik",
  "Fan Kablosu Oturmamış",
  "Fan Kablosu Takılmamış",
  "Fan Kablosu Tırnağı Kırık",
  "Fan Kırık",
  "Fan motoru vidası eksik",
  "Fan motoru vidası oturmamış",
  "Fan sacı işaretleri yok",
  "Fan sacı klips eksik",
  "Fan sacı vidası eksik",
  "Fan Sacı Vidası Yanlış",
  "Fan somunu eksik",
  "Fan somunu oturmamış",
  "Fan takılmamış",
  "Fikstür açık",
  "Finler yanık",
  "Folyo eksik",
  "Gömlek açık",
  "Gömlek Düğmesi Eksik",
  "Gömlek yanlış",
  "Gömlek Yırtık",
  "Hava sensörü anakarta takılı değil",
  "hava Sensörü eksik",
  "hava Sensörü kırık",
  "Hava sensörü oturmamış",
  "Hps Kablosu oturmamış",
  "Hps Kablosu Takılmamış",
  "Izgara Enjeksiyon Hatası",
  "Izgara kırık",
  "Izgara oturmamış",
  "Izgara vidası eksik",
  "Izgara vidası oturmamış",
  "Izgara vidası yalama",
  "Izgara vidası yanlış",
  "İç Gömlek Takılmamış",
  "Kaynak izolasyon eksik",
  "Keçe eksik",
  "Keçe yanlış",
  "kılcal boru klipsi takılmamış",
  "Klemens vidası eksik",
  "Klimanın içinde vida var",
  "Komp kablosu soket kırık",
  "Komp. Çıkış Sensörü Takılmamış",
  "Komp. İzolasyon yanık",
  "Komp. İzolasyonu Eksik",
  "Komp. Kablosu klips eksik",
  "Komp. Kablosu Nüve Kırık",
  "Komp. Kablosu oturmamış",
  "Komp. kablosu takılmamış",
  "Komp. Kapağı eksik",
  "Komp. Kapağı oturmamış",
  "Komp. Lastiği Eksik",
  "Komp. Oturmamış",
  "Komp. Somun eksik",
  "Komp. Somun oturmamış",
  "Komp. Somunu işaretsiz",
  "Kondenser Borusu ezik",
  "Kondenser finler hasarlı",
  "Kondenser izolasyon açık",
  "Kondenser izolasyon eksik",
  "Kondenser Kaçak",
  "Kondenser Klips Eksik",
  "Kondenser Klips yanlış montaj",
  "Kondenser Sensör Yuvası Ezik",
  "Kondenser sensör yuvası yok",
  "Kondenser Vidası Eksik",
  "Koruma teli eksik",
  "Koruma teli oturmamış",
  "Koruma teli vidası eksik",
  "Marka etiketi eksik",
  "Marka etiketi hatalı montaj",
  "Marka etiketi yanlış",
  "Marka etiketi yok",
  "Ön Panel Boya Hatalı",
  "Ön Panel Çizik",
  "Ön panel darbeli",
  "Ön panel izolasyon eksik",
  "Ön panel oturmamış",
  "Ön panel vida sıkılmamış",
  "Ön panel vidası eksik",
  "Ön panel yalama",
  "Ön panel yanlış",
  "Reaktör kablosu takılmamış",
  "Reaktör kablosu yanlış takılmış",
  "Reaktör vidası eksik",
  "Rekorlar oturmamış",
  "Rekorlar sıkılmamış",
  "Sağ Panel Boya Hatalı",
  "Sağ Panel Çizik",
  "Sağ Panel Darbeli",
  "Sağ Panel Eksik",
  "Sağ Panel İzolasyon Eksik",
  "Sağ panel oturmamış",
  "Sağ Panel Plastik Aparatı Eksik",
  "Sağ panel uyarı etiketi eksik",
  "Sağ panel vidası eksik",
  "Sağ panel vidası yarım",
  "Sağ Panel Yalama",
  "Selanoid bobin oturmamış",
  "Selanoid bobin takılmamış",
  "Selanoid bobin Vidası Atılmamış",
  "selanoid bobin yanlış",
  "Sensör Demiri Oturmamış",
  "Sensör Demiri Takılmamış",
  "Sensör Demiri Yok",
  "Sensör Kablo Tırnağı Kırık",
  "Sensör kablosu ezik",
  "Sensör kablosu klips yok",
  "Sensör kablosu oturmamış",
  "Sensör kablosu takılmamış",
  "Sensör klipsi takılmamış",
  "Sensör Soketi Çıkık",
  "sensör yayı yok",
  "Sensör yuvası eksik",
  "Sensör yuvası kaynak yapılmamış",
  "Sensör yuvası takılmamış",
  "Sol direk çizik",
  "Sol direk oturmamış",
  "Sol direk vida eksik",
  "Sol direk vidası yanlış atılmış",
  "Sol dirsek boya hatalı",
  "Sol panel boya hatalı",
  "Sol Panel Çizik",
  "Sol panel darbeli",
  "Sol panel eksik",
  "Sol Panel İzolasyon Eksik",
  "Sol panel oturmamış",
  "Sol panel tutamaç eksik",
  "Sol panel tutamaç kırık",
  "Sol panel tutamaç oturmamış",
  "Sol Panel Tutamaç vidası yarım",
  "Sol panel tutamaç vidası yok",
  "Sol Panel Vida Eksik",
  "Sol panel vidaları yanlış",
  "Sol Panel Vidası yarım",
  "Stop valve oturmamış",
  "Susturucu İzolasyon Eksik",
  "Sünger izolasyon klips yok",
  "Termik kablosu kırık",
  "Termik kablosu klips yok",
  "termik kablosu oturmamış",
  "Termik Kablosu Takılmamış",
  "Termik tırnağı oturmamış",
  "Tutamaç ters takılmış",
  "Uyarı etiketi eksik",
  "Üst kapak boya hatalı",
  "Üst Kapak Boya Hatası",
  "Üst Kapak Çizik",
  "Üst Kapak Darbeli",
  "Üst kapak izolasyon dışarda",
  "Üst kapak izolasyon eksik",
  "üst kapak vidası eksik",
  "üst kapak vidası oturmamış",
  "Üst kapak vidası yanlış",
  "Üst keçe eksik",
  "Vana braketi vidası oturmamış",
  "Vana Braketi yalama",
  "Vana braketi yanlış",
  "Vana Vidası Eksik",
  "vana vidası yarım"
];

function App() {
  const [formData, setFormData] = useState({ tarih: "", vardiya: "", hat: "", kalitePersoneli: "" });
  const [aciklamalar, setAciklamalar] = useState([
    { id: Date.now(), aciklama: "", personel: "", adet: 1, foto: null, preview: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAciklamaChange = (id, field, value) => {
    setAciklamalar((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleFotoSec = async (id, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const options = { maxSizeMB: 0.5, maxWidthOrHeight: 200, useWebWorker: true };
    const compressedFile = await imageCompression(file, options);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAciklamalar((prev) =>
        prev.map((it) =>
          it.id === id ? { ...it, preview: reader.result, foto: file } : it
        )
      );
    };
    reader.readAsDataURL(compressedFile);
  };

  const yeniSatir = () => {
    const newRow = {
      id: Date.now() + Math.random(),
      aciklama: "",
      personel: "",
      adet: 1,
      foto: null,
      preview: "",
    };
    setAciklamalar((prev) => [...prev, newRow]);
  };

  const satirSil = (id) => {
    setAciklamalar((prev) => prev.filter((it) => it.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const aciklamalarPayload = await Promise.all(
      aciklamalar
        .flatMap((item) => {
          const adet = Number(item.adet) || 1;
          return Array(adet)
            .fill(null)
            .map(() => ({ ...item }));
        })
        .map(async (item) => {
          let fotoBase64 = "";
          if (item.foto) {
            const reader = new FileReader();
            fotoBase64 = await new Promise((resolve) => {
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(item.foto);
            });
          }
          return { ...item, foto: fotoBase64, adet: 1 };
        })
    );

    const payload = { ...formData, aciklamalar: aciklamalarPayload };

    try {
      const response = await fetch(
        "https://vardiya-backend.onrender.com/api/kaydet",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      alert(result.mesaj || result.hata || "Bilinmeyen hata!");
    } catch (err) {
      alert("Sunucuya bağlanılamadı: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
          📋 Hat Kalite Formu
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Tarih</label>
            <input
              type="date"
              name="tarih"
              value={formData.tarih}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-300 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Vardiya</label>
            <select
              name="vardiya"
              value={formData.vardiya}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-300 outline-none"
            >
              <option value="">Seçiniz</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
                <div>
  <label className="block text-gray-700 font-medium mb-1">Kalite Personeli</label>
  <input
    type="text"
    name="kalitePersoneli"
    value={formData.kalitePersoneli}
    onChange={handleChange}
    placeholder="Kalite personelinin adını giriniz"
    required
    className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-300 outline-none"
  />
</div>


          <div>
            <label className="block text-gray-700 font-medium mb-1">Hat</label>
            <select
              name="hat"
              value={formData.hat}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-300 outline-none"
            >
              <option value="">Seçiniz</option>
              <option value="R1">R1</option>
              <option value="R2">R2</option>
              <option value="R3">R3</option>
              <option value="AR1">AR1</option>
            </select>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-blue-600 mb-2 border-b pb-1">
          Açıklamalar
        </h3>

        <div className="space-y-4">
          {aciklamalar.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <input
                type="text"
                list={`aciklama-list-${item.id}`}
                placeholder="Açıklama"
                value={item.aciklama}
                onChange={(e) =>
                  handleAciklamaChange(item.id, "aciklama", e.target.value)
                }
                className="border border-gray-300 rounded-lg p-2 w-full mb-2 focus:ring-2 focus:ring-blue-300 outline-none"
              />
              <datalist id={`aciklama-list-${item.id}`}>
                {aciklamaSecenekleri.map((secenek, idx) => (
                  <option key={idx} value={secenek} />
                ))}
              </datalist>

              <input
                type="text"
                placeholder="Hatayı Yapan Personel"
                value={item.personel}
                onChange={(e) =>
                  handleAciklamaChange(item.id, "personel", e.target.value)
                }
                className="border border-gray-300 rounded-lg p-2 w-full mb-2 focus:ring-2 focus:ring-blue-300 outline-none"
              />

              <input
                type="number"
                min="1"
                placeholder="Adet"
                value={item.adet}
                onChange={(e) =>
                  handleAciklamaChange(item.id, "adet", e.target.value)
                }
                className="border border-gray-300 rounded-lg p-2 w-full mb-2 focus:ring-2 focus:ring-blue-300 outline-none"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFotoSec(item.id, e)}
                className="w-full mb-2 text-gray-600"
              />

              {item.preview && (
                <img
                  src={item.preview}
                  alt="Önizleme"
                  className="mt-2 rounded-lg shadow-sm max-h-40 border"
                />
              )}

              <button
                type="button"
                onClick={() => satirSil(item.id)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
              >
                Satırı Sil
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={yeniSatir}
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition"
        >
          + Yeni Satır Ekle
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-2 py-3 rounded-lg font-semibold flex justify-center items-center text-white transition ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </form>
    </div>
  );
}

export default App;
