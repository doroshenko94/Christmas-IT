// Функция для создания снежинок
function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.innerHTML = "❅";
  snowflake.style.left = Math.random() * 100 + "vw";
  snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";
  snowflake.style.opacity = Math.random();

  document.getElementById("snow").appendChild(snowflake);

  snowflake.addEventListener("animationiteration", () => {
    snowflake.remove();
  });
}

// Создание снежинок
setInterval(createSnowflake, 100);
