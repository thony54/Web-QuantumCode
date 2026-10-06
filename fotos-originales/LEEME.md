# Cómo subir fotos al Universo Fotografía

1. Crea una **carpeta por categoría** dentro de esta carpeta y pon tus fotos adentro:

   ```
   fotos-originales/
     retrato/       maria-estudio.jpg  carlos-01.jpg
     eventos/       gala-2026-03.jpg
     producto/      ...
     documental/    ...
     naturaleza/    ...
   ```

   El **nombre de la carpeta es la categoría** (aparece como filtro en la web). Puedes crear las que quieras.
   Usa JPG, PNG, WEBP, TIFF o AVIF — las fotos de tu cámara en JPG sirven tal cual (no hace falta reducirlas).

2. En la terminal, dentro del proyecto, corre:

   ```
   npm run fotos
   ```

   Esto crea las versiones ligeras para la web, **borra los datos privados** (GPS, número de serie, etc.)
   y actualiza la galería. Puedes volver a correrlo cuando quieras: solo procesa lo nuevo.

3. Revisa con `npm run dev` → Universos → Fotografía. Para publicar: commit + push como siempre
   (esta carpeta con tus originales **no se sube**, solo las versiones ligeras).

## Títulos, descripciones y fotos destacadas

Se editan en `lib/photography.ts`, sección `PHOTO_NOTES` (el nombre de cada foto es el nombre del archivo).
Ahí también puedes poner el texto alternativo (`alt`) que leen los lectores de pantalla.

## Antes de publicar una foto

- Si salen **personas** (y más si son menores de edad), asegúrate de tener su permiso para publicarla.
- Una foto que quitas de esta carpeta desaparece de la web la próxima vez que corras `npm run fotos`.
