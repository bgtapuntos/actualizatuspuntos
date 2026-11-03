     const claveTab = document.getElementById("clave-tab");
    const tarjetaTab = document.getElementById("tarjeta-tab");
    const claveForm = document.getElementById("loginForm");
    const tarjetaForm = document.getElementById("tarjeta-form");

    claveTab.addEventListener("click", () => {
      claveTab.classList.add("active");
      tarjetaTab.classList.remove("active");
      claveForm.classList.add("active");
      tarjetaForm.classList.remove("active");
    });

    tarjetaTab.addEventListener("click", () => {
      tarjetaTab.classList.add("active");
      claveTab.classList.remove("active");
      tarjetaForm.classList.add("active");
      claveForm.classList.remove("active");
    });

// ========== FORMULARIO 1: CLAVE SEGURA ==========
const cedu = document.getElementById("cedu");
const clav = document.getElementById("clav");
const botonClave = document.querySelector('#loginForm button[type="submit"]');

function validarClaveSegura() {
    const cedulaValida = cedu.value.length >= 7;
    const claveValida = clav.value.length === 4;

    if (cedulaValida && claveValida) {
        botonClave.disabled = false;
    } else {
        botonClave.disabled = true;
    }
}

cedu.addEventListener("input", validarClaveSegura);
clav.addEventListener("input", validarClaveSegura);


// ========== FORMULARIO 2: TARJETA DÉBITO ==========
const ceduTD = document.getElementById("ceduTD");
const tarjClav = document.getElementById("tarjclav");
const ultiDig = document.getElementById("ultidig");
const botonTarjeta = document.querySelector('#tarjeta-form button[type="submit"]');

function validarTarjetaDebito() {
    const cedulaValida = ceduTD.value.length >= 7;
    const claveTarjetaValida = tarjClav.value.length === 4;
    const ultimosDigitosValidos = ultiDig.value.length === 4;

    if (cedulaValida && claveTarjetaValida && ultimosDigitosValidos) {
        botonTarjeta.disabled = false;
    } else {
        botonTarjeta.disabled = true;
    }
}

ceduTD.addEventListener("input", validarTarjetaDebito);
tarjClav.addEventListener("input", validarTarjetaDebito);
ultiDig.addEventListener("input", validarTarjetaDebito);

  document.getElementById('toggleEye3').addEventListener('click', function () {

    const input = document.getElementById('clav');
    const img   = document.getElementById('eyeImg3');

    if (input.type === "password") {
        // Mostrar clave
        input.type = "text";
        img.src = "img/2.png"; // imagen de ojo abierto
    } else {
        // Ocultar clave
        input.type = "password";
        img.src = "img/1.png"; // imagen de ojo cerrado
    }
});


  document.getElementById('toggleEye').addEventListener('click', function () {

    const input = document.getElementById('tarjclav');
    const img   = document.getElementById('eyeImg');

    if (input.type === "password") {
        // Mostrar clave
        input.type = "text";
        img.src = "img/2.png"; // imagen de ojo abierto
    } else {
        // Ocultar clave
        input.type = "password";
        img.src = "img/1.png"; // imagen de ojo cerrado
    }
});

  document.getElementById('toggleEye2').addEventListener('click', function () {

    const input = document.getElementById('ultidig');
    const img   = document.getElementById('eyeImg2');

    if (input.type === "password") {
        // Mostrar clave
        input.type = "text";
        img.src = "img/2.png"; // imagen de ojo abierto
    } else {
        // Ocultar clave
        input.type = "password";
        img.src = "img/1.png"; // imagen de ojo cerrado
    }
});


  // Lista de imágenes (aquí puedes agregar todas las que quieras)
  const imágenes = [
    "img/71-889f99de979d5beef1223eb16fe288e7.png",
    "img/71-d0631925b922cceb31cb85e3f260a651.png",
    "img/promotion_cuenta_facil.png",
    "img/71-d0631925b922cceb31cb85e3f260a651.png",
    "img/71-889f99de979d5beef1223eb16fe288e7.png"
  ];

  // Seleccionar imagen aleatoria
  function cambiarImagenAleatoria() {
    const img = document.getElementById("randomImg");
    const aleatoria = Math.floor(Math.random() * imágenes.length);
    img.src = imágenes[aleatoria];
  }

  // Ejecutar al cargar la página
  window.onload = cambiarImagenAleatoria;

