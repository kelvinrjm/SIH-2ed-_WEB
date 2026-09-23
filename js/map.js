/**
 * SL: Geospatial Land Intelligence Platform
 * SIH26013 - Automated Integration and Intelligent Harmonization of Multi-source Geospatial Data
 * Module: GIS & Leaflet Map Engine
 */

window.SL_MAP = (function() {
  'use strict';

  let officerMap = null;
  let userMap = null;
  let measureMode = null; // 'distance' | 'area' | null
  let measurePoints = [];
  let measureLine = null;
  let measurePolygon = null;

  // Layer groups for Officer GIS
  const layers = {
    baseStreet: null,
    baseSat: null,
    baseLight: null,
    parcels: null,
    buildings: null,
    gnss: null,
    utilities: null,
    conflicts: null,
    droneOri: null
  };

  const DEFAULT_CENTER = [9.9238, 78.1205]; // Madurai Urban Sector (Ward 12 & 13)
  const DEFAULT_ZOOM = 16;

  function init() {
    initOfficerMap();
    initUserMap();
  }

  function initOfficerMap() {
    const container = document.getElementById('officer-gis-map');
    if (!container || officerMap) return;

    officerMap = L.map('officer-gis-map', {
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: false
    });

    // Base Tile Layers
    layers.baseStreet = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; OpenStreetMap | SLI GIS Platform'
    });

    layers.baseSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: '&copy; Esri & Maxar | SLI Drone ORI Integration'
    });

    layers.baseLight = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: '&copy; CARTO | SLI Cadastre'
    });

    layers.baseStreet.addTo(officerMap);

    // Feature Layers
    loadParcelsLayer(officerMap);
    loadBuildingsLayer(officerMap);
    loadGnssLayer(officerMap);
    loadUtilitiesLayer(officerMap);

    // Map Click Handler for Measurement or Clear
    officerMap.on('click', handleMapClick);

    bindOfficerMapControls();
  }

  function initUserMap() {
    const container = document.getElementById('user-map');
    if (!container || userMap) return;

    userMap = L.map('user-map', {
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap | SLI Land Portal'
    }).addTo(userMap);

    // Add parcels to user map
    const parcelsGeo = window.SL_STORAGE.getParcels();
    if (parcelsGeo) {
      L.geoJSON(parcelsGeo, {
        style: feature => getParcelStyle(feature.properties),
        onEachFeature: (feature, layer) => {
          const p = feature.properties;
          layer.bindPopup(`
            <div class="sl-map-popup">
              <div class="sl-map-popup-header">
                <h4>${p.id}</h4>
                <span class="sl-badge sl-badge-${p.status === 'Officer Verified' ? 'verified' : (p.status === 'Conflict Detected' ? 'conflict' : 'info')}">${p.status}</span>
              </div>
              <div class="sl-map-popup-body">
                <div><strong>Survey No:</strong> ${p.surveyNumber}</div>
                <div><strong>Area:</strong> ${p.area} sq.m</div>
                <div><strong>Land Use:</strong> ${p.landUse}</div>
                <div><strong>Confidence:</strong> ${p.confidence}%</div>
              </div>
              <button class="sl-btn sl-btn-primary sl-btn-sm" style="width: 100%;" onclick="window.SL_PARCELS.openParcelModal('${p.id}')">
                VIEW FULL DETAILS
              </button>
            </div>
          `);
        }
      }).addTo(userMap);
    }
  }

  function getParcelStyle(props) {
    let color = '#2563eb'; // blue default
    let fillColor = '#3b82f6';
    let fillOpacity = 0.25;

    if (props.status === 'Officer Verified') {
      color = '#059669';
      fillColor = '#10b981';
      fillOpacity = 0.35;
    } else if (props.status === 'Conflict Detected') {
      color = '#dc2626';
      fillColor = '#ef4444';
      fillOpacity = 0.4;
    } else if (props.status === 'Ground Truth Required') {
      color = '#d97706';
      fillColor = '#f59e0b';
      fillOpacity = 0.35;
    }

    return {
      color: color,
      weight: 2,
      opacity: 0.9,
      fillColor: fillColor,
      fillOpacity: fillOpacity,
      dashArray: props.status === 'Conflict Detected' ? '4, 4' : null
    };
  }

  function loadParcelsLayer(targetMap) {
    const geo = window.SL_STORAGE.getParcels();
    if (!geo) return;

    if (layers.parcels) targetMap.removeLayer(layers.parcels);

    layers.parcels = L.geoJSON(geo, {
      style: feature => getParcelStyle(feature.properties),
      onEachFeature: (feature, layer) => {
        const p = feature.properties;
        layer.on('click', () => {
          window.SL_PARCELS.openParcelIntelligence(p.id);
        });
        layer.bindTooltip(`<strong>${p.id}</strong><br>Survey: ${p.surveyNumber}<br>${p.area} sq.m`, {
          sticky: true,
          className: 'sl-map-tooltip'
        });
      }
    }).addTo(targetMap);
  }

  function loadBuildingsLayer(targetMap) {
    const geo = window.SL_DEMO.buildingsGeoJSON;
    if (!geo) return;

    layers.buildings = L.geoJSON(geo, {
      style: {
        color: '#334155',
        weight: 1.5,
        fillColor: '#475569',
        fillOpacity: 0.55
      },
      onEachFeature: (feature, layer) => {
        const b = feature.properties;
        layer.bindTooltip(`Building ${b.id}<br>${b.type} (${b.floors} Flr)`, { sticky: true });
      }
    }).addTo(targetMap);
  }

  function loadGnssLayer(targetMap) {
    const stations = window.SL_DEMO.gnssStations;
    const markers = [];

    stations.forEach(st => {
      const marker = L.circleMarker([st.lat, st.lng], {
        radius: 7,
        fillColor: '#10b981',
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
      }).bindPopup(`
        <div class="sl-map-popup">
          <div class="sl-map-popup-header">
            <h4>${st.id}</h4>
            <span class="sl-badge sl-badge-verified">RTK Online</span>
          </div>
          <div class="sl-map-popup-body">
            <div><strong>Station:</strong> ${st.name}</div>
            <div><strong>Accuracy:</strong> ${st.accuracy}</div>
            <div><strong>Elevation:</strong> ${st.elevation} m</div>
            <div><strong>Status:</strong> ${st.status}</div>
          </div>
        </div>
      `);
      markers.push(marker);
    });

    layers.gnss = L.featureGroup(markers).addTo(targetMap);
  }

  function loadUtilitiesLayer(targetMap) {
    // Utility line demo
    const lines = [
      L.polyline([[9.9248, 78.1170], [9.9249, 78.1215], [9.9251, 78.1245]], {
        color: '#0284c7',
        weight: 3,
        dashArray: '5, 5'
      }).bindTooltip('Municipal Water Main (300mm DI Pipeline)'),
      L.polyline([[9.9238, 78.1169], [9.9240, 78.1218], [9.9242, 78.1244]], {
        color: '#d97706',
        weight: 2.5,
        dashArray: '3, 6'
      }).bindTooltip('TANGEDCO 11kV Underground Power Cable')
    ];

    layers.utilities = L.featureGroup(lines);
  }

  function bindOfficerMapControls() {
    // Zoom controls
    const zoomInBtn = document.getElementById('btn-map-zoomin');
    const zoomOutBtn = document.getElementById('btn-map-zoomout');
    if (zoomInBtn) zoomInBtn.addEventListener('click', () => officerMap.zoomIn());
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => officerMap.zoomOut());

    // Geolocation / My Location
    const locBtn = document.getElementById('btn-map-location');
    if (locBtn) {
      locBtn.addEventListener('click', () => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            pos => {
              const lat = pos.coords.latitude;
              const lng = pos.coords.longitude;
              officerMap.setView([lat, lng], 17);
              L.circleMarker([lat, lng], { radius: 8, fillColor: '#2563eb', color: '#fff', weight: 2, fillOpacity: 0.9 })
                .addTo(officerMap)
                .bindPopup('Your Current Location').openPopup();
              window.SL_APP.showToast('Located via GPS Geolocation', 'info');
            },
            err => {
              // Fallback to Demo Location
              officerMap.setView(DEFAULT_CENTER, 17);
              window.SL_APP.showToast('GPS permission not granted. Centering on Madurai Demo Location.', 'info');
            }
          );
        } else {
          officerMap.setView(DEFAULT_CENTER, 17);
        }
      });
    }

    // Toggle Layer Panel
    const layerToggleBtn = document.getElementById('btn-toggle-layers');
    const layerPanel = document.getElementById('gis-layer-panel');
    if (layerToggleBtn && layerPanel) {
      layerToggleBtn.addEventListener('click', () => {
        layerPanel.classList.toggle('collapsed');
      });
    }

    // Basemap Radios
    document.querySelectorAll('input[name="basemap-radio"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const val = e.target.value;
        officerMap.removeLayer(layers.baseStreet);
        officerMap.removeLayer(layers.baseSat);
        officerMap.removeLayer(layers.baseLight);

        if (val === 'street') layers.baseStreet.addTo(officerMap);
        else if (val === 'satellite') layers.baseSat.addTo(officerMap);
        else if (val === 'light') layers.baseLight.addTo(officerMap);
      });
    });

    // Layer Checkbox Toggles
    const toggleLayer = (id, layerGroup) => {
      const cb = document.getElementById(id);
      if (cb) {
        cb.addEventListener('change', (e) => {
          if (e.target.checked) {
            officerMap.addLayer(layerGroup);
          } else {
            officerMap.removeLayer(layerGroup);
          }
        });
      }
    };

    toggleLayer('layer-cb-cadastral', layers.parcels);
    toggleLayer('layer-cb-buildings', layers.buildings);
    toggleLayer('layer-cb-gnss', layers.gnss);
    toggleLayer('layer-cb-utilities', layers.utilities);

    // Opacity Slider
    const opacitySlider = document.getElementById('cadastral-opacity-slider');
    if (opacitySlider) {
      opacitySlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        if (layers.parcels) {
          layers.parcels.setStyle({ fillOpacity: val * 0.4, opacity: val });
        }
      });
    }

    // Measurement Tool
    const measureDistBtn = document.getElementById('btn-measure-dist');
    const measureAreaBtn = document.getElementById('btn-measure-area');

    if (measureDistBtn) {
      measureDistBtn.addEventListener('click', () => {
        clearMeasurement();
        if (measureMode === 'distance') {
          measureMode = null;
          measureDistBtn.classList.remove('active');
          window.SL_APP.showToast('Measurement tool deactivated.', 'info');
        } else {
          measureMode = 'distance';
          measureDistBtn.classList.add('active');
          if (measureAreaBtn) measureAreaBtn.classList.remove('active');
          window.SL_APP.showToast('Distance Measure Mode: Click points on map to measure path distance.', 'info');
        }
      });
    }

    if (measureAreaBtn) {
      measureAreaBtn.addEventListener('click', () => {
        clearMeasurement();
        if (measureMode === 'area') {
          measureMode = null;
          measureAreaBtn.classList.remove('active');
          window.SL_APP.showToast('Measurement tool deactivated.', 'info');
        } else {
          measureMode = 'area';
          measureAreaBtn.classList.add('active');
          if (measureDistBtn) measureDistBtn.classList.remove('active');
          window.SL_APP.showToast('Area Measure Mode: Click 3+ points to calculate polygon area.', 'info');
        }
      });
    }

    // Fullscreen Toggle
    const fullscreenBtn = document.getElementById('btn-map-fullscreen');
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        const container = document.querySelector('.gis-workspace-container');
        if (!document.fullscreenElement) {
          container.requestFullscreen().catch(err => console.warn(err));
        } else {
          document.exitFullscreen().catch(err => console.warn(err));
        }
      });
    }
  }

  function handleMapClick(e) {
    if (!measureMode) return;

    measurePoints.push(e.latlng);

    if (measureMode === 'distance') {
      if (!measureLine) {
        measureLine = L.polyline(measurePoints, { color: '#dc2626', weight: 3, dashArray: '4,4' }).addTo(officerMap);
      } else {
        measureLine.setLatLngs(measurePoints);
      }

      // Calculate distance
      let totalDist = 0;
      for (let i = 0; i < measurePoints.length - 1; i++) {
        totalDist += measurePoints[i].distanceTo(measurePoints[i + 1]);
      }
      window.SL_APP.showToast(`Path Distance: ${totalDist.toFixed(1)} meters (${(totalDist / 1000).toFixed(2)} km)`, 'info');
    } else if (measureMode === 'area') {
      if (measurePoints.length >= 3) {
        if (!measurePolygon) {
          measurePolygon = L.polygon(measurePoints, { color: '#059669', fillColor: '#10b981', fillOpacity: 0.3 }).addTo(officerMap);
        } else {
          measurePolygon.setLatLngs(measurePoints);
        }
        // Approximate planar area calculation
        const approxArea = calculatePolygonArea(measurePoints);
        window.SL_APP.showToast(`Enclosed Area: ${approxArea.toFixed(1)} sq.m (${(approxArea / 4046.86).toFixed(3)} acres)`, 'success');
      }
    }
  }

  function calculatePolygonArea(latlngs) {
    let area = 0;
    const n = latlngs.length;
    if (n < 3) return 0;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const xi = latlngs[i].lng * 111320 * Math.cos(latlngs[i].lat * Math.PI / 180);
      const yi = latlngs[i].lat * 110540;
      const xj = latlngs[j].lng * 111320 * Math.cos(latlngs[j].lat * Math.PI / 180);
      const yj = latlngs[j].lat * 110540;
      area += (xi * yj) - (xj * yi);
    }
    return Math.abs(area / 2);
  }

  function clearMeasurement() {
    measurePoints = [];
    if (measureLine && officerMap) {
      officerMap.removeLayer(measureLine);
      measureLine = null;
    }
    if (measurePolygon && officerMap) {
      officerMap.removeLayer(measurePolygon);
      measurePolygon = null;
    }
  }

  function zoomToParcel(parcelId) {
    const geo = window.SL_STORAGE.getParcels();
    if (!geo || !officerMap) return;
    const feat = geo.features.find(f => f.properties.id === parcelId || f.properties.surveyNumber === parcelId);
    if (feat) {
      const coords = feat.geometry.coordinates[0];
      const bounds = L.latLngBounds(coords.map(c => [c[1], c[0]]));
      officerMap.fitBounds(bounds, { padding: [80, 80], maxZoom: 18 });
      window.SL_PARCELS.openParcelIntelligence(feat.properties.id);
    }
  }

  function refreshLayers() {
    if (officerMap) loadParcelsLayer(officerMap);
    if (userMap) initUserMap();
  }

  function invalidateOfficerMap() {
    if (officerMap) officerMap.invalidateSize();
  }

  function invalidateUserMap() {
    if (userMap) userMap.invalidateSize();
  }

  return {
    init,
    zoomToParcel,
    refreshLayers,
    invalidateOfficerMap,
    invalidateUserMap,
    clearMeasurement
  };
})();
