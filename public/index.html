<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vardiya Formu</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
      padding: 40px;
    }

    form {
      background: #fff;
      padding: 30px;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      max-width: 600px;
      margin: auto;
      transition: transform 0.3s ease;
    }
    form:hover {
      transform: translateY(-5px);
    }

    h2 {
      text-align: center;
      color: #4a90e2;
      margin-bottom: 25px;
      font-size: 26px;
    }

    label {
      font-weight: 600;
      margin-top: 10px;
      display: block;
      color: #333;
    }

    input, select {
      width: 100%;
      margin-top: 8px;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 16px;
      transition: border 0.3s ease;
    }
    input:focus, select:focus {
      border-color: #4a90e2;
      outline: none;
    }

    button {
      width: 48%;
      margin-top: 15px;
      padding: 12px;
      border-radius: 10px;
      border: none;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    button#yeniSatir {
      background: #ff7f50;
      color: #fff;
      margin-right: 4%;
    }
    button#yeniSatir:hover {
      background: #ff5722;
    }

    button#kaydet {
      background: #4a90e2;
      color: #fff;
    }
    button#kaydet:hover {
      background: #357abd;
    }

    #aciklamaListesi div.satir {
      margin-bottom: 20px;
      padding: 15px;
      border-radius: 12px;
      background: #f7f9fc;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 8px rgba(0,0,0,0.03);
      position: relative;
    }

    img.preview {
      margin-top: 10px;
      max-width: 150px;
      border-radius: 12px;
      border: 1px solid #ddd;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      display: block;
    }

    @media (max-width: 600px) {
      button { width: 100%; margin: 10px 0 0 0; }
    }
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

    <h3 style="color:#4a90e2; margin-top:20px;">Açıklamalar:</h3>
    <div id="aciklamaListesi">
      <div class="satir">
        <input type="text" placeholder="Açıklama" name="aciklama0">
        <input type="text" placeholder="Personel" name="personel0">
        <input type="file" accept="image/*" name="foto0" onchange="onFotoSec(event, 0)">
        <img id="preview0" class="preview" style="display:none;">
      </div>
    </div>

    <button type="button" id="yeniSatir" onclick="yeniSatir()">+ Yeni Satır Ekle</button>
    <button type="submit" id="kaydet">Kaydet</button>
  </form>

  <script>
    let index = 1;
    const fotoVerileri = {};

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

      if (file.size > 1024 * 1024) {
        alert("Lütfen 1 MB altı bir fotoğraf seçin.");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        fotoVerileri[i] = reader.result;
        const img = document.getElementById(`preview${i}`);
        img.src = reader.result;
        img.style.display = "block";
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
