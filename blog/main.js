// nav background
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0)
})

// Obtener el botón y el modal
var botonLeerMas = document.getElementById("leer-mas-btn");
var modal = document.getElementById("mi-modal");

// Cuando se haga clic en el botón, mostrar el modal
botonLeerMas.onclick = function() {
    modal.style.display = "block";
}

// Cuando se haga clic en el botón de cerrar, ocultar el modal
var spanCerrar = document.getElementsByClassName("close")[0];
spanCerrar.onclick = function() {
    modal.style.display = "none";
}

// También puedes cerrar el modal si el usuario hace clic fuera de él
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


//Filter
$(document).ready(function () {
    $(".filter-item").click(function () {
        const value = $(this).attr("data-filter");
        if (value == "all"){
            $(".post-box").show("1000")
        } else{
            $(".post-box")
                .not("." + value)
                .hide(1000);
            $(".post-box")
            .filter("." + value)
            .show("1000")
        }
    });
    $(".filter-item").click(function () {
        $(this).addClass("active-filter").siblings().removeClass("active-filter")
    });
});