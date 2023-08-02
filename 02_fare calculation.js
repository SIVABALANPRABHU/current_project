function initialize() {
    var pickupInput = document.getElementById('pickup_location');
    var dropoffInput = document.getElementById('dropoff_location');
  
    var options = {
        types: ['geocode'],
        componentRestrictions: { country: 'IN' } // Restrict auto fill to India
    };
  
    var pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput, options);
    var dropoffAutocomplete = new google.maps.places.Autocomplete(dropoffInput, options);
  }
  
  function calculatePrice() {
    var kmChargeSedan = 14;
    var kmChargeMUV = 19;
    var driverCharge = 500;
    var waitingCharge = 200;
    var roofLuggageCharge = 500;
  
    var pickupLocation = document.getElementById('pickup_location').value;
    var dropoffLocation = document.getElementById('dropoff_location').value;
    var carType = document.querySelector('input[name="car_type"]:checked').value;
    var addLuggage = document.getElementById('add_luggage').checked;
    var addwaitingCharge = document.getElementById('addwaitingCharge').checked;
  
    // Use Google Maps Distance Matrix API to calculate distance and time
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [pickupLocation],
            destinations: [dropoffLocation],
            travelMode: 'DRIVING'
        },
        function(response, status) {
            if (status === 'OK') {
                var distance = response.rows[0].elements[0].distance.value / 1000; // Distance in km
                var duration = response.rows[0].elements[0].duration.text; // Duration in text
  
                var price = driverCharge + (carType === 'sedan' ? kmChargeSedan : kmChargeMUV) * distance;
  
                if (addLuggage) {
                    price += roofLuggageCharge;
                }
                if (addwaitingCharge){
                price += waitingCharge;
                }
  
                document.getElementById('estimated_distance').textContent = distance.toFixed(2) + ' km';
                document.getElementById('estimated_time').textContent = duration;
                document.getElementById('estimated_price').textContent = 'Rs. ' + price.toFixed(2);
            } else {
                alert('Error: Unable to calculate distance and time.');
            }
        }
    );
  }