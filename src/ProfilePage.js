import { currencyCodeSymbols } from '../utils/index.js';

const ProfilePage = (vehicle) => {
  const content = document.createElement('div');
  content.innerHTML = `
    <div class='profile-page'>
      <img src=${vehicle.pictureURL} alt='car' class='profile-image' />
      <div class='profile-name'>${vehicle.name}</div>
      <div class='profile-details'>
        <div class='profile-attribute'><span class='profile-attribute-title'>Fuel Type:</span><span>${vehicle.fuelType}</span></div>
        <div class='profile-attribute'><span class='profile-attribute-title'>Transmission:</span><span>${vehicle.transmission}</span></div>
        <div class='profile-attribute'><span class='profile-attribute-title'>Doors:</span><span>${vehicle.doorCount}</span></div>
        <div class='profile-attribute'><span class='profile-attribute-title'>Passengers:</span><span>${vehicle.passengerQuantity}</span></div>
        <div class='profile-attribute'><span class='profile-attribute-title'>Baggage QTY:</span><span>${vehicle.baggageQuantity}</span></div>
        <div class='profile-attribute'><span class='profile-attribute-title'>Air Conditioning:</span><span>${vehicle.airConditioning}</span></div>
        <div class='profile-attribute'><span class='profile-attribute-title'>Drive Type:</span><span>${vehicle.driveType}</span></div>
        <div class='profile-attribute'><span class='profile-attribute-title'>Vendor:</span><span>${vehicle.vendor.name}</span></div>
        <div class='profile-attribute'><span class='profile-attribute-title'>Code:</span><span>${vehicle.vendor.code}</span></div>
        <div class='profile-attribute'><span class='profile-attribute-title'>Code:</span><span>${vehicle.code}</span></div>
        <div class='profile-attribute'><span class='profile-attribute-title'>Code Context:</span><span>${vehicle.codeContext}</span></div>
      </div>
      <div class='profile-footer'>
        <div class='profile-availability ${vehicle.status === 'Available' ? 'available' : 'unavailable'}'>
          ${vehicle.status}
        </div>
        <div class='profile-pricing'>
          <div class='profile-rate-price'><span class='profile-rate-price-title'>Rate:</span> ${currencyCodeSymbols[vehicle.currencyCode]}${vehicle.rate}</div>
          <div class='profile-total-price'><span class='profile-total-price-title'>Estimated Total:</span> ${currencyCodeSymbols[vehicle.currencyCode]}${vehicle.estimatedTotal}</div>
        </div>
      </div>
    </div>
  `

  return content;
}

export default ProfilePage;