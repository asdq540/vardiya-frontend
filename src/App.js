<form id="vardiyaForm" enctype="multipart/form-data">
  <input type="date" name="tarih" required>
  <select name="vardiya">
    <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
  </select>
  <select name="hat">
    <option value="R1">R1</option><option value="R2">R2</option><option value="R3">R3</option>
  </select>

  <div id="aciklamaListesi">
    <div>
      <input type="text" placeholder="Açıklama" name="aciklama0">
      <input type="text" placeholder="Personel" name="personel0">
      <input type="file" name="foto0" accept="image/*">
    </div>
  </div>
  <button type="button" onclick="yeniSatir()">+ Ekle</button>
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

  const formData = new FormData(e.target);

  const aciklamalar = [];
  for (let i = 0; i < index; i++) {
    const aciklama = formData.get(`aciklama${i}`);
    const personel = formData.get(`personel${i}`);
    if (aciklama || personel) aciklamalar.push({ aciklama, personel });
  }
  formData.append("aciklamalar", JSON.stringify(aciklamalar));

  const res = await fetch("https://vardiya-backend.onrender.com/api/kaydet", {
    method: "POST",
    body: formData
  });
  const data = await res.json();
  alert(data.mesaj || data.hata);
});
</script>
