import { RadioCard } from "../../(component)/(styled)/inputs";

// Todo: render addresses, and add / update
export default function Addresses({ addresses }) {
  return (
    <div>
      {addresses.map((address) => (
        <Address {...address} />
      ))}

      <form action="/checkout/complete" method="GET" onchange="handleChange(event)" onsubmit="pay(event)">
        <input type="hidden" name="payment_intent" value="" />
        <section class="checkout box">
          <h2 class="checkout h">Shipping Information</h2>
          <h3 class="box h">Saved Addresses</h3>
          <div class="saved-addresses-wrapper">
            <label class="saved-address">
              <span></span>
              <input type="radio" name="address" />
            </label>
          </div>
          <h3 class="box h">Personal Information</h3>
          <div class="box row personal">
            <div class="input-field">
              <label for="full-name">Full Name</label>
              <input type="text" name="fullName" min="5" max="40" required id="full-name" />
            </div>
            <div class="input-field">
              <label for="email">Email</label>
              <input type="email" name="email" required id="email" />
            </div>
            <div class="input-field">
              <label for="phone">Phone Number</label>
              <input type="tel" name="phone" id="phone" placeholder="+1234567890" />
            </div>
          </div>
          <h3 class="box h">Address</h3>
          <div class="box row country">
            <div class="input-field">
              <label for="country">Country</label>
              <select name="country" required id="country">
                $
                {countries.render(
                  (key, value) => `
        <option value="${key}" ${key === user.country && "selected"}>${value[0]}</option>
        `
                )}
              </select>
            </div>
            <div class="input-field">
              <label for="state">State</label>
              <input type="text" name="state" max="85" />
            </div>
            <div class="input-field">
              <label for="city">City</label>
              <input type="city" name="city" min="2" max="85" required id="city" />
            </div>
          </div>
          <div class="box row street">
            <div class="input-field">
              <label for="postal-code">Zip Code</label>
              <input type="text" name="postalCode" min="4" max="10" required id="postal-code" />
            </div>
            <div class="input-field">
              <label for="street">Street</label>
              <input type="text" name="street" min="2" max="150" required id="street" />
            </div>
            <div class="input-field">
              <label for="house-number">House Number</label>
              <input type="text" name="houseNumber" id="house-number" />
            </div>
            <div class="input-field">
              <label for="addition">Addition (Optional)</label>
              <input type="text" name="addition" id="addition" />
            </div>
          </div>
        </section>

        <section class="checkout box payment">
          <h2 class="checkout h">Payment Methods</h2>
          <div class="box row">
            <label class="input-field method">
              <span>Card</span>
              <div class="card-logos">
                <img src="/image/visa-card-logo.png" alt="Visa card logo" class="card" />
                <img src="/image/master-card-logo.png" alt="Master card logo" class="card" />
                <img src="/image/maestro-card-logo.png" alt="Maestro card logo" class="card" />
                <img src="/image/american-express-logo.png" alt="American express logo" class="card" />
              </div>
              <input type="radio" name="paymentMethod" value="card" />
            </label>
            <label class="input-field method">
              <span>Ideal</span>
              <img src="/image/ideal-logo.png" alt="ideal logo.png" />
              <input type="radio" name="paymentMethod" value="idealBank" />
            </label>
            <label class="input-field method">
              <span>PayPal</span>
              <img src="/image/paypal-logo.png" alt="PayPal logo" class="paypal" />
              <input type="radio" name="paymentMethod" value="paypal" />
            </label>
          </div>
          <div id="payment-info-wrapper">
            <div>
              <label for="bank-holder">Bank Holder</label>
              <input type="text" name="bankHolder" id="bank-holder" placeholder="J Kelvin" />
            </div>
            <div id="payment-info"></div>
          </div>
          <div id="paypal-payment">PayPal</div>
          <div id="card-errors" role="alert"></div>
          <div class="submit-btn-wrapper">
            <button type="submit" class="submit btn" disabled>
              Pay
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}

export function Address({ firstName, lastName, line1, line2, city, country, onCheck }) {
  return (
    <RadioCard
      tag="address"
      name="address"
      title="Saved Address"
      onCheck={onCheck}
      required
      cls="p-3 w-auto md:w-1/2">
      <h6 className="font-medium">
        {firstName} {lastName}
      </h6>
      <p>
        {line1} {line2 || ""},<br />
        {city}, {country}
      </p>
    </RadioCard>
  );
}
