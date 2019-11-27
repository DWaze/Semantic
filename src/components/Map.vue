<template>
  <div id="root">
    <div>
      <div id="search_bar">
        <md-autocomplete
          v-model="selectedCity"
          :md-options="cities"
          md-layout="box"
          md-dense
        >
          <label>Cities</label>
          <md-button class="md-raised md-primary" v-on:click="onSearch"
            >Search</md-button
          >
        </md-autocomplete>
      </div>
    </div>
    <div id="mapid"></div>
  </div>
</template>

<script>
import L from "leaflet";
import axios from "axios";

export default {
  name: "Map",
  data: function() {
    return {
      cityQuery:
        "SELECT ?predicate ?object\n" +
        "WHERE {\n" +
        "<https://www.emse.fr/~zimmermann/Teaching/SemWeb/bicycle_stations.owl#mulhouseStation1> ?predicate ?object\n" +
        "}",
      mymap: null,
      marker: null,
      circle: null,
      popup: null,
      latitude:
        "https://www.emse.fr/~zimmermann/Teaching/SemWeb/bicycle_stations.owl#latitude",
      longitude:
        "https://www.emse.fr/~zimmermann/Teaching/SemWeb/bicycle_stations.owl#longitude",
      queryUrl: null,
      selectedCity: null,
      cities: ["Saint-Etienne", "Paris", "Lyon", "Bordeaux", "Nantes"]
    };
  },
  mounted() {
    this.mymap = L.map("mapid").setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: "your.mapbox.access.token"
    }).addTo(this.mymap);
    this.marker = L.marker([51.5, -0.09]).addTo(this.mymap);

    this.circle = L.circle([51.508, -0.11], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 500
    }).addTo(this.mymap);
    this.marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    this.circle.bindPopup("I am a circle.");
    // this.mymap.on("click", this.onMapClick);
  },
  methods: {
    // onMapClick: function(e) {
    //   this.popup = L.popup();
    //   this.popup
    //     .setLatLng(e.latlng)
    //     .setContent("You clicked the map at " + e.latlng.toString())
    //     .openOn(this.mymap);
    //   this.mymap.panTo(new L.LatLng(40.737, -73.923));
    // },
    onSearch: function() {
      const qs = require("querystring");

      let data = qs.stringify({
        query: this.cityQuery
      });
      console.log("Searching............");
      axios
        .post("http://localhost:3030/bicyclestations/query", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          if (response.data.results.bindings.length > 0) {
            var list_triples = response.data.results.bindings;
            let triple;
            for (triple in list_triples) {
              if (list_triples[triple].predicate.value === this.latitude) {
                var lat = parseFloat(list_triples[triple].object.value);
              }
              if (list_triples[triple].predicate.value === this.longitude) {
                var long = parseFloat(list_triples[triple].object.value);
              }
            }
            this.mymap.panTo(new L.LatLng(lat, long));
            this.marker = L.marker([lat, long]).addTo(this.mymap);
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#mapid {
  width: 100%;
  min-height: 100%;
}

#root {
  width: 100%;
  height: 100%;
}

#search_bar {
  float: left;
  width: 50%;
}
</style>
