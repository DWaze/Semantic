<template>
  <b-container fluid class="h-100">
    <b-row fluid class="h-100">
      <b-col>
        <b-container class="h-100">
          <b-row>
            <b-col>
              <div id="search_bar">
                <md-autocomplete
                  v-model="selectedCity"
                  :md-options="cities"
                  md-layout="box"
                  md-dense
                >
                  <label>Cities</label>
                </md-autocomplete>
              </div>
              <md-button class="md-raised md-primary" v-on:click="onSearch"
                >Search</md-button
              >
            </b-col>
          </b-row>
          <b-row class="h-100"> <div id="mapid"></div></b-row>
        </b-container>
      </b-col>
      <b-col fluid class="h-100"></b-col>
    </b-row>
  </b-container>
</template>

<script>
import L from "leaflet";
import axios from "axios";
import { parseTriples } from "../methods/parseTriples";

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
      circle: null,
      popup: null,
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
    parseTriples,
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
          parseTriples(response.data.results.bindings, this.mymap);
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

#search_bar {
  float: left;
  width: 60%;
}
</style>
