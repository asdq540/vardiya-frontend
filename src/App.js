<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vardiya Formu</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 30px;
    }
    form {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      max-width: 500px;
      margin: auto;
    }
    input, select, button {
      width: 100%;
      margin-top: 10px;
      padding: 10px;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 16px;
    }
    button {
      background: #007bff;
      color: white;
      cursor: pointer;
    }
    button:hover {
      background: #0056b3;
    }
    #aciklamaListesi div {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>

  <form id="vardiyaForm">
    <h2>Vardiya Kayıt Formu</h2>

    <label>Tarih:</label>
    <input type="date" name="tarih" required>

    <label>Vardiya:</label>
    <select name="vardiya">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>

    <label>Hat:</label>
    <select name="hat">
      <option value="R1">R1</option>
      <option value="R2">R2</option>
      <option value="R3">R3</option>
    </select>

    <label>Açıklamalar:</label>
    <div id="aciklamaListesi">
      <div>
        <input type="text" placeholder="Açıklama" name="aciklama0">
        <input type="text" placeholder="Personel" name="personel0">
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
      `;
      document.getElementById("aciklamaListesi").appendChild(div);
      index++;
    }

    document.getElementById("vardiyaForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      const aciklamalar = [];
      for (let i = 0; i < index; i++) {
        const aciklama = formData.get(`aciklama${i}`);
        const personel = formData.get(`personel${i}`);
        if (aciklama || personel) aciklamalar.push({ aciklama, personel });
      }

      formData.append("aciklamalar", JSON.stringify(aciklamalar));

      const response = await fetch("https://vardiya-backend.onrender.com/api/kaydet", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      alert(result.mesaj || result.hata || "Bilinmeyen hata!");
    });
  </script>

</body>
</html>
