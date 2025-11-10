<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>ImgBB Test</title>
</head>
<body>

<h2>📤 ImgBB Test</h2>
<input type="file" id="fotoInput" accept="image/*">
<button onclick="uploadImage()">Yükle</button>
<p id="result"></p>

<script>
function uploadImage() {
  const file = document.getElementById("fotoInput").files[0];
  if (!file) return alert("Lütfen bir fotoğraf seçin.");

  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64Image = reader.result;

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({foto: base64Image, name: file.name})
      });

      const result = await response.json();
      if (result.url) {
        document.getElementById("result").innerHTML = `✅ Yüklendi: <a href="${result.url}" target="_blank">${result.url}</a>`;
      } else {
        document.getElementById("result").textContent = `❌ Hata: ${result.error}`;
      }
    } catch (err) {
      document.getElementById("result").textContent = "Sunucuya bağlanılamadı: " + err.message;
    }
  };

  reader.readAsDataURL(file);
}
</script>

</body>
</html>
