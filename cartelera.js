fetch("cartelera.xml")
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");
  
    const peliculas = xml.getElementsByTagName("pelicula");

    const contenedor = document.getElementById("peliculas");
    const info = document.getElementById("info");

    for (let i = 0; i < peliculas.length; i++) {
          
      const titulos = peliculas[i].getElementsByTagName("titulo")
      const titulo = titulos[0]?.textContent || "Título no disponible";

  

      const trailerNode = peliculas[i].getElementsByTagName("trailer")[0];
      const trailer = trailerNode ? trailerNode.textContent : "";
      const direccion = peliculas[i].getElementsByTagName("direccion")[0]?.textContent || "Dirección no disponible";
      const duracion = peliculas[i].getElementsByTagName("duracion")[0]?.textContent || "Duración no disponible";
      const nacionalidad = peliculas[i].getElementsByTagName("nacionalidad")[0]?.textContent || "Nacionalidad no disponible";
      const actores = peliculas[i].getElementsByTagName("actores")[0]?.textContent || "Actores no disponibles";
      const genero = peliculas[i].getElementsByTagName("genero")[0]?.textContent || "Género no disponible";
      const sinopsis = peliculas[i].getElementsByTagName("sinopsis")[0]?.textContent || "Sinopsis no disponible";
      const imagenNode = peliculas[i].getElementsByTagName("imagen")[0];
      const imagen = imagenNode ? imagenNode.textContent : "";

      const img = document.createElement("img");
      img.src = imagen || "default-image.jpg";  // Usar una imagen por defecto si no se especifica
      img.alt = titulo;

      img.addEventListener("click", () => {
        info.innerHTML = `
          <h2>${titulo}</h2>
          <p><strong>Dirección:</strong> ${direccion}</p>
          <p><strong>Duración:</strong> ${duracion}</p>
          <p><strong>Nacionalidad:</strong> ${nacionalidad}</p>
          <p><strong>Actores:</strong> ${actores}</p>
          <p><strong>Género:</strong> ${genero}</p>
          <p><strong>Sinopsis:</strong> ${sinopsis}</p>
          ${trailer ? `<iframe width="100%" height="200" src="${trailer}" frameborder="0" allowfullscreen></iframe>` : ""}
        `;
      });

      contenedor.appendChild(img);
    }
  })
  .catch(error => console.error("Error al cargar XML:", error));









