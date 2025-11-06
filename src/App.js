<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>Vardiya Formu</title>
</head>
<body>
  <h2>Vardiya Kayıt Formu</h2>

  <form id="vardiyaForm" enctype="multipart/form-data">
    <label>Tarih:</label>
    <input type="date" name="tarih" required><br><br>

    <label>Vardiya:</label>
    <select name="vardiya" required>
      <option value="">Seçiniz</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select><br><br>

    <label>Hat:</label>
    <select name="hat" required>
      <option value="">Seçiniz</option>
      <option value="R1">R1</option>
      <option value="R2">R2</option>
      <option value="R3">R3</option>
    </select><br><br>

    <div id="aciklamaListesi">
      <div>
        <input type="text" placeholder="Açıklama" name="aciklama0">
        <input type="text" placeholder="Personel" name="personel0">
        <input type="file" name="foto0" accept="image/*">
      </div>
    </div>

    <button type="button" onclick="yeniSatir()">+ Yeni Satır Ekle</button>
    <button type="submit">Kaydet</button>
  </form>

  <script>
    let index = 1;

    function yeniSatir() {
      const div = document.createElement("div");
      div.innerHTML = `
        <input type="text" placeholder="Açıklama" name="aciklama${index}">
        <input type="text" placeholder="Personel" name="personel${index}">
        <input type="file" name="foto${index}" accept="image/*">
      `;
      document.getElementById("aciklamaListesi").appendChild(div);
      index++;
    }

    document.getElementById("vardiyaForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);

      // 🔍 Debug (konsolda hangi alanlar gidiyor görelim)
      console.log("GÖNDERİLEN ALANLAR:");
      for (const [k, v] of formData.entries()) console.log(k, v);

      // Açıklamaları JSON olarak ekle
      const aciklamalar = [];
      for (let i = 0; i < index; i++) {
        const aciklama = formData.get(`aciklama${i}`);
        const personel = formData.get(`personel${i}`);
        if (aciklama || personel) aciklamalar.push({ aciklama, personel });
      }
      formData.append("aciklamalar", JSON.stringify(aciklamalar));

      try {
        const res = await fetch("https://vardiya-backend.onrender.com/api/kaydet", {
          method: "POST",
          body: formData
        });
        const data = await res.json();
        alert(data.mesaj || data.hata);
      } catch (err) {
        alert("Sunucu hatası: " + err.message);
      }
    });
  </script>
</body>
</html>
