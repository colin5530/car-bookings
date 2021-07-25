import { currencyCodeSymbols } from '../utils/index.js';

const VehicleCard = (vehicle) => {      
  const card = `
    <div class='vehicle-card'>
      <div class='vehicle-title'>${vehicle.name}</div>
      <div class='vehicle-content-container'>
        <img class='vehicle-image' src=${vehicle.pictureURL} alt=${vehicle.name} />
        <div class='vehicle-content'>
          <div class='vehicle-details-container'>
            <div class='vehicle-details'>
              <div class='vehicle-attribute'><span class='vehicle-attribute-title'>Fuel Type:</span><span>${vehicle.fuelType}</span></div>
              <div class='vehicle-attribute'><span class='vehicle-attribute-title'>Transmission:</span><span>${vehicle.transmission}</span></div>
              <div class='vehicle-attribute'><span class='vehicle-attribute-title'>Doors:</span><span>${vehicle.doorCount}</span></div>
              <div class='vehicle-attribute'><span class='vehicle-attribute-title'>Passengers:</span><span>${vehicle.passengerQuantity}</span></div>
              <div class='vehicle-attribute'><span class='vehicle-attribute-title'>Baggage QTY:</span><span>${vehicle.baggageQuantity}</span></div>
              <div class='vehicle-attribute'><span class='vehicle-attribute-title'>Air Conditioning:</span><span>${vehicle.airConditioning}</span></div>
              <div class='vehicle-attribute'><span class='vehicle-attribute-title'>Drive Type:</span><span>${vehicle.driveType}</span></div>
            </div>
            <div class='vehicle-vendor-details'>
              <div class='vehicle-attribute'><span class='vehicle-attribute-title'>Vendor:</span><span>${vehicle.vendor.name}</span></div>
              <div class='vehicle-attribute'><span class='vehicle-attribute-title'>Code:</span><span>${vehicle.vendor.code}</span></div>
              <div class='vehicle-attribute'><span class='vehicle-attribute-title'>Code:</span><span>${vehicle.code}</span></div>
              <div class='vehicle-attribute'><span class='vehicle-attribute-title'>Code Context:</span><span>${vehicle.codeContext}</span></div>
            </div>
          </div>
          <div class='vehicle-availability-container'>
            <div class='vehicle-availability ${vehicle.status === 'Available' ? 'available' : 'unavailable'}'>
              ${vehicle.status}
            </div>
            <div class='vehicle-pricing'>
              <div class='vehicle-rate-price'><span class='vehicle-rate-price-title'>Rate:</span> ${currencyCodeSymbols[vehicle.currencyCode]}${vehicle.rate}</div>
              <div class='vehicle-total-price'><span class='vehicle-total-price-title'>Estimated Total:</span> ${currencyCodeSymbols[vehicle.currencyCode]}${vehicle.estimatedTotal}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const cardElement = document.createElement('div');
  cardElement.id = 'vehicle-card-parent';
  cardElement.name = `${vehicle.id}`
  cardElement.innerHTML = card;
  return cardElement;
}

export default VehicleCard;