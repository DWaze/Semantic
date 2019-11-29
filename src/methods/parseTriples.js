import L from "leaflet";

function parseTriples(data, mymap) {
  var latitude =
    "https://www.emse.fr/~zimmermann/Teaching/SemWeb/bicycle_stations.owl#latitude";
  var longitude =
    "https://www.emse.fr/~zimmermann/Teaching/SemWeb/bicycle_stations.owl#longitude";
  var status =
    "https://www.emse.fr/~zimmermann/Teaching/SemWeb/bicycle_stations.owl#status";
  var availableBikes =
    "https://www.emse.fr/~zimmermann/Teaching/SemWeb/bicycle_stations.owl#available_bikes";
  var availableBikeStands =
    "https://www.emse.fr/~zimmermann/Teaching/SemWeb/bicycle_stations.owl#available_bike_stands";
  var id =
    "<https://www.emse.fr/~zimmermann/Teaching/SemWeb/bicycle_stations.owl#status>";

  if (data.length > 0) {
    var list_triples = data;
    let triple;
    for (triple in list_triples) {
      if (list_triples[triple].predicate.value === latitude) {
        var lat = parseFloat(list_triples[triple].object.value);
      }
      if (list_triples[triple].predicate.value === longitude) {
        var long = parseFloat(list_triples[triple].object.value);
      }
      if (list_triples[triple].predicate.value === status) {
        var info_status = list_triples[triple].object.value;
      }
      if (list_triples[triple].predicate.value === availableBikes) {
        var info_availableBikes = list_triples[triple].object.value;
      }
      if (list_triples[triple].predicate.value === availableBikeStands) {
        var info_availableBikeStands = list_triples[triple].object.value;
      }
    }
    mymap.panTo(new L.LatLng(lat, long));
    var marker = L.marker([lat, long]).addTo(mymap);
    marker.bindPopup(
      `
        <strong>Status:</strong> ${info_status}
        <br />
        <strong>Available Bikes:</strong> ${info_availableBikes}
        <br />
        <strong>Available Bike Stands:</strong> ${info_availableBikeStands}
        <br />
        <a onclick="Vue.router.push( { name: 'about', params: { ${id}})">Get details about this station</a>
      `
    );
  }
}

export { parseTriples };
