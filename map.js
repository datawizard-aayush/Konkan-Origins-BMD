document.addEventListener('DOMContentLoaded', () => {
  const mapElement = document.getElementById('hero-map');
  if (!mapElement) return;

  // Initialize map centered roughly on the Konkan region
  const map = L.map('hero-map', {
    zoomControl: false,
    scrollWheelZoom: false, // Prevent accidental scrolling while reading hero
  }).setView([15.8, 73.7], 7);

  // Add custom map tiles (CARTO Voyager for a clean, light look)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  // Define custom icon using HTML for a premium look
  const customIcon = L.divIcon({
    className: 'custom-map-marker',
    html: `<div style="background-color: #1A4D2E; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  const locations = [
    { coords: [16.3773, 73.3762], name: 'Devgad', product: 'Alphonso Mango' },
    { coords: [16.9902, 73.3120], name: 'Ratnagiri', product: 'Alphonso Mango' },
    { coords: [15.8617, 73.6300], name: 'Vengurla', product: 'Cashews' },
    { coords: [16.0667, 73.4667], name: 'Malvan', product: 'Kokum' },
    { coords: [14.6195, 74.8354], name: 'Sirsi', product: 'Banana Chips' },
    { coords: [15.5905, 73.8436], name: 'Moira', product: 'Banana Chips' }
  ];

  locations.forEach(loc => {
    const marker = L.marker(loc.coords, { icon: customIcon }).addTo(map);
    
    // Bind tooltip with name and product
    marker.bindTooltip(
      `<div class="map-tooltip">
        <strong>${loc.name}</strong><br/>
        <span>${loc.product}</span>
      </div>`, 
      {
        direction: 'top',
        className: 'custom-leaflet-tooltip',
        offset: [0, -10]
      }
    );
  });
});
