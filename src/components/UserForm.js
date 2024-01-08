'use client';
import EditableImage from '@/components/EditableImage';
import { useState, useEffect } from 'react';
import { UseProfile } from './UseProfile';
import AddressInputs from './AddressInputs';
export default function UserForm({ user, onSave }) {
  console.log(user);
  const [image, setImage] = useState(user?.image || '');
  const [userName, setUsername] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.street || '');
  const [zipCode, setZipCode] = useState(user?.zipCode || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');
  const [isAdmin, setIsAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = UseProfile();

  useEffect(() => {
    if (user) {
      setImage(user.image || '');
      setUsername(user.name || '');
      setPhone(user.phone || '');
      setStreet(user.street || '');
      setZipCode(user.zipCode || '');
      setCity(user.city || '');
      setCountry(user.country || '');
      setIsAdmin(user.admin || false);
    }
  }, [user]);

  const setters = {
    phone: setPhone,
    street: setStreet,
    zipCode: setZipCode,
    city: setCity,
    country: setCountry,
  };

  function handleAddressChange(propName, value) {
    const setter = setters[propName];
    if (setter) {
      setter(value);
    }
  }

  const handleAdminChange = (e) => {
    setIsAdmin(e.target.checked);
    console.log(isAdmin);
  };

  return (
    <div className="md:flex gap-4">
      <div>
        <div className="p-2 rounded-lg relative">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(e) =>
          onSave(e, {
            name: userName,
            image,
            phone,
            street,
            zipCode,
            city,
            country,
            admin: isAdmin,
          })
        }
      >
        <label htmlFor="name">First and last name</label>
        <input
          id="name"
          type="text"
          placeholder="First and last name"
          value={userName || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input type="email" disabled={true} value={user?.email || ''} />
        <AddressInputs
          addressProps={{ phone, street, zipCode, city, country }}
          setAddressProps={handleAddressChange}
        />
        {loggedInUserData && loggedInUserData.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="admin"
            >
              <input
                id="admin"
                type="checkbox"
                value={'1'}
                checked={isAdmin}
                onChange={handleAdminChange}
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
