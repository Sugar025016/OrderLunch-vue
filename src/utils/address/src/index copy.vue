<!-- <template>
  <div>
    <input v-model="address" placeholder="Enter address" />
    <button @click="geocodeAddress">Geocode</button>
    <div id="map" style="height: 800px"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

declare const L: any
const address = ref('台南')
let map: any

onMounted(() => {
  map = L.map('map').setView([0, 0], 2)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  }).addTo(map)
})
address.value = '台南市永康區復國二路46號'

const geocodeAddress = async () => {
  console.log('address', address.value)
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${address.value}&format=json`,
  )
  const data = await response.json()

  if (data.length > 0) {
    const { lat, lon } = data[0]
    map.setView([lat, lon], 13)
    L.marker([lat, lon]).addTo(map).bindPopup(address.value).openPopup()
  } else {
    alert('Address not found!')
  }
}
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 1000px;
}
.a {
  background-color: rgb(0, 255, 179);
  width: 100%;
  height: 1000px;
}
</style>

<!-- <template>
  <div>
    <div id="map" style="height: 400px;"></div>
  </div>
</template>

<script setup lang="ts">

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { ref, onMounted } from 'vue';


// const map = L.map('map').setView([0, 0], 2);

let map;
onMounted(() => {
  map = L.map('map').setView([0, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  }).addTo(map);
});


const coordinates = [
  [37.7749, -122.4194], // San Francisco
  [34.0522, -118.2437], // Los Angeles
  [40.7128, -74.0060],  // New York
];

const polyline = L.polyline(coordinates, { color: 'red' }).addTo(map);
map.fitBounds(polyline.getBounds());

</script>

<style>
#map {
  width: 100%;
}
.a {
  background-color: rgb(0, 255, 179);
  width: 100%;
  height: 1000px;
}
</style> -->

<!-- <template>
  <div>
    <div id="map" style="height: 400px;"></div>
  </div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ref, onMounted } from 'vue';

let map;

onMounted(async () => {
  map = L.map('map').setView([0, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  }).addTo(map);

  await initMap();
});

const coordinates = [
  [37.7749, -122.4194], // San Francisco
  [34.0522, -118.2437], // Los Angeles
  [40.7128, -74.0060],  // New York
];

const initMap = async () => {
  const polyline = L.polyline(coordinates, { color: 'red' }).addTo(map);
  map.fitBounds(polyline.getBounds());
};
</script>

<style>
#map {
  width: 100%;
}
</style> -->

<!-- <template>
  <div>
    <div id="map" style="height: 400px;"></div>
  </div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ref, onMounted } from 'vue';

let map;

onMounted(async () => {
  map = L.map('map').setView([0, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  }).addTo(map);

  await initMap();
});

const addresses = ['台南', '高雄']; // 兩個地址

const initMap = async () => {
  const coordinates = await getCoordinates(addresses);

  const polyline = L.polyline(coordinates, { color: 'red' }).addTo(map);
  map.fitBounds(polyline.getBounds());
};

const getCoordinates = async (addresses) => {
  const coordinates = [];

  for (const address of addresses) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
    const data = await response.json();

    if (data.length > 0) {
      const { lat, lon } = data[0];
      coordinates.push([lat, lon]);
    } else {
      alert(`Address not found: ${address}`);
    }
  }

  return coordinates;
};
</script>

<style>
#map {
  width: 100%;
}
</style> -->
-->
