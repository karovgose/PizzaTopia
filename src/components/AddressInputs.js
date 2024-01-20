'use client';

export default function AddressInputs({
  addressProps,
  setAddressProps,
  disabled = false,
}) {
  const { phone, street, zipCode, city, country } = addressProps;

  return (
    <>
      {' '}
      <label htmlFor="phone">Phone number</label>
      <input
        disabled={disabled}
        id="phone"
        type="tel"
        placeholder="Phone number"
        value={phone || ''}
        onChange={(e) => {
          setAddressProps('phone', e.target.value);
        }}
      />
      <label htmlFor="address">Address</label>
      <input
        disabled={disabled}
        id="address"
        type="text"
        placeholder="Street address"
        value={street || ''}
        onChange={(e) => setAddressProps('street', e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="zip_code">Zip code</label>
          <input
            disabled={disabled}
            id="zip_code"
            type="text"
            placeholder="Zip code"
            value={zipCode || ''}
            onChange={(e) => setAddressProps('zipCode', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            disabled={disabled}
            id="city"
            type="text"
            placeholder="City"
            value={city || ''}
            onChange={(e) => setAddressProps('city', e.target.value)}
          />
        </div>
      </div>
      <label htmlFor="country">Country</label>
      <input
        disabled={disabled}
        id="country"
        type="text"
        placeholder="Country"
        value={country || ''}
        onChange={(e) => setAddressProps('country', e.target.value)}
      />
    </>
  );
}
