<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vardiya Formu</title>
  <style>
    body { font-family: Arial; background-color: #f4f4f4; padding: 30px; }
    form { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 550px; margin: auto; }
    input, select, button { width: 100%; margin-top: 10px; padding: 10px; border-radius: 6px; border: 1px solid #ccc; font-size: 16px; }
    button { background: #007bff; color: white; cursor: pointer; }
    button:hover { background: #0056b3; }
    #aciklamaListesi div { margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; border-radius: 8px; background: #fafafa; position: relative; }
    img.preview { margin-top: 8px; max-width: 150px; border-radius: 8px; border: 1px solid #ccc; display: block; }
  </style>
</head>
<body>

  <form id="vardiyaForm">
    <h2>📋 Vardiya Kayıt Formu</h2>
    <label>Tarih:</label>
    <input type="date" name="tarih" required>
    <label>Vardiya:</label>
    <select name="vardiya" required>
      <option value="">Seçiniz</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>
    <label>Hat:</label>
    <select name="hat" required>
      <option value="">Seçiniz</option>
      <option value="R1">R1</option>
      <option value="R2">R2</option>
      <option value="R3">R3</option>
    </select>

    <h3>Açıklamalar:</h3>
    <div id="aciklamaListesi">
      <div class="satir">
        <input type="text" placeholder="Açıklama" name="aciklama0">
        <input type="text" placeholder="Personel" name="personel0">
        <input type="file" accept="image/*" name="foto0" onchange="onFotoSec(event, 0)">
        <img id="preview0" class="preview" style="display:none;">
      </div>
    </div>

    <button type="button" onclick="yeniSatir()">+ Yeni Satır Ekle</button>
    <button type="submit">Kaydet</button>
  </form>

  <script>
    let index = 1;
    const fotoVerileri = {}; // Base64 resimleri saklamak için

    function yeniSatir() {
      const div = document.createElement("div");
      div.className = "satir";
      div.innerHTML = `
        <input type="text" placeholder="Açıklama" name="aciklama${index}">
        <input type="text" placeholder="Personel" name="personel${index}">
        <input type="file" accept="image/*" name="foto${index}" onchange="onFotoSec(event, ${index})">
        <img id="preview${index}" class="preview" style="display:none;">
      `;
      document.getElementById("aciklamaListesi").appendChild(div);
      index++;
    }

    function onFotoSec(e, i) {
      const file = e.target.files[0];
      if (!file) return;

      // Küçük resim uyarısı
      if (file.size > 1024 * 1024) {
        alert("Lütfen 1 MB altı bir fotoğraf seçin.");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        fotoVerileri[i] = reader.result; // base64 string

        const img = document.getElementById(`preview${i}`);
        img.src = reader.result;
        img.style.display = "block"; // preview görünür
      };
      reader.readAsDataURL(file);
    }

    document.getElementById("vardiyaForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const tarih = formData.get("tarih");
      const vardiya = formData.get("vardiya");
      const hat = formData.get("hat");

      const aciklamalar = [];
      for (let i = 0; i < index; i++) {
        const aciklama = formData.get(`aciklama${i}`);
        const personel = formData.get(`personel${i}`);
        const foto = fotoVerileri[i] || "";
        if (aciklama || personel || foto) {
          aciklamalar.push({ aciklama, personel, foto });
        }
      }

      const payload = { tarih, vardiya, hat, aciklamalar };

      try {
        const response = await fetch("https://vardiya-backend.onrender.com/api/kaydet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        alert(result.mesaj || result.hata || "Bilinmeyen hata!");
      } catch (err) {
        alert("Sunucuya bağlanılamadı: " + err.message);
      }
    });
  </script>

</body>
</html>
