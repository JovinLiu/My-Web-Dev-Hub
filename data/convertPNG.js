import React from "react";

function convertJpegToPng(jpegBase64) {
  const img = new Image();
  img.src = jpegBase64;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  return canvas.toDataURL("image/png");
}

function App() {
  const jpegBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD...";
  const pngBase64 = convertJpegToPng(jpegBase64);

  return (
    <div>
      <img src={pngBase64} alt="Converted PNG" />
    </div>
  );
}

export default App;

//点击上传按钮创建FormData
if (updateUserBtn) {
  updateUserBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);

    updateUser("settings", form);
  });
}


const
base64 = base64_URL. replace(/^data: image\/\w+;base64,/, "");
const path = '${imagePath}${Date. now()}${index}.png*;
fs writeFile(path, base64, 'base64', function (err) {
if
(err) {
console. log (err);
} else {
console. log（'写入成功！'，path）；
}
}) ;

