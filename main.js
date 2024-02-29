let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 4000);
}

fetch("https://my-json-server.typicode.com/nicobobb/fake-db/electronica")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Hubo un problema al obtener los datos");
        }
        return response.json();
    })
    .then((data) => {
        let productos = data;

        function mostrarProductos(productos) {
            let productsHTML = "";
            productos.forEach((producto) => {
                productsHTML += `
                    <div class="product__item">
                        <div class="product__imgContainer">
                            <img class="product__img" src="${producto.image}" alt="">
                        </div>
                        <p class="product__price">$ ${producto.price}</p>
                        <h3 class="product__name">${producto.name}</h3>
                    </div>
                `;
            });
            document.querySelector(".products__section").innerHTML =
                productsHTML;
        }

        function mostrarError() {
            const errorHTML = `
                <div class="error__search">
                    <img class="error__img" src="./assets/no-found.png" alt="">
                    <p class="error__title">Ups! Lo sentimos...</p>
                    <p class="error__text">No encontramos resultados para tu búsqueda.</p>
                </div>
            `;
            document.querySelector(".products__section").innerHTML = errorHTML;
        }

        mostrarProductos(productos);

        document
            .getElementById("searchItem")
            .addEventListener("keyup", function (event) {
                const searchTerm = event.target.value.toLowerCase();
                const productosFiltrados = productos.filter((producto) =>
                    producto.name.toLowerCase().includes(searchTerm)
                );
                if (productosFiltrados.length === 0) {
                    mostrarError();
                } else {
                    mostrarProductos(productosFiltrados);
                }
            });
    })
    .catch((error) => {
        console.error("Hubo un problema al obtener los datos:", error);
    });
