# responsive-image component

Komponent zwracający gotowy, responsywny znacznik img w zależności od podanych wymagań (razem z pocięciem obrazu źródłowego).

### Przykład użycia

```javascript
responsive_image({ image_path, resolutions, quality, sizes_attr, alt });
```

### Argumenty

-   **image_path:** string, ścieżka do obrazu, dla którego chcemy wygenerować znacznik,

-   **out_path** string, miejsce w którym mają zostać zapisane wyrenderowane pliki,

-   **resolutions:** tablica np. [200, 300] - rozmiary dla których obraz ma być pocięty,

-   **quality:** number, jakość obrazu w przedziale od 0 - 100,

-   **sizes_attr:** string, atrybut sizes znacznika,

-   **alt_tag:** string, tag alt znacznika
