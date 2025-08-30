async function fetchIPInfo() {
  try {
    const response = await fetch('https://ipinfo.io/json');
    const data = await response.json();

    if (data.loc) {
      const [lat, lng] = data.loc.split(',');

      document.getElementById('ip').textContent = data.ip;
      document.getElementById('city').textContent = data.city;
      document.getElementById('country').textContent = data.country;
      document.getElementById('isp').textContent = data.org;

      initMap(lat, lng);
    } else {
      console.error('Location data not available');
    }
  } catch (error) {
    console.error('Error fetching IP info:', error);
  }
}

function initMap(lat, lng) {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: parseFloat(lat), lng: parseFloat(lng) },
    zoom: 10
  });

  const marker = new google.maps.Marker({
    position: { lat: parseFloat(lat), lng: parseFloat(lng) },
    map: map,
    title: "Location"
  });
}

window.onload = fetchIPInfo;
