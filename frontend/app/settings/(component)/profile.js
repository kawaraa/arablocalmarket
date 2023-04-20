"use client";
import { useEffect, useState } from "react";
import { Button } from "../../(component)/(styled)/button";
import Modal from "../../(component)/(styled)/modal";
import { NameInputField } from "../../(component)/custom-inputs";
import AddressInputs from "../../(component)/address-inputs";

export default function Profile({ lang, firstName, lastName, address, handleUpdate, setMessage }) {
  const [adr, setAdr] = useState(address || {});
  const [addressForm, setAddressForm] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);

  const updateAddress = async (e) => {
    e.preventDefault();
    const address = {};
    setAddressLoading(true);
    new FormData(e.target).forEach((value, key) => key != "search" && (address[key] = value));
    await handleUpdate({ address });
    setAdr(address);
    setAddressLoading(false);
    setAddressForm(false);
  };

  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">Profile</h3>
      <div className="flex ">
        <NameInputField
          editable
          full
          first
          defaultValue={firstName || ""}
          onBlur={(e) => handleUpdate({ firstName: e.target.value })}
          cls="mr-2"
        />
        <NameInputField
          editable
          full
          defaultValue={lastName || ""}
          onBlur={(e) => handleUpdate({ lastName: e.target.value })}
          cls="1231"
        />
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2">Address</h3>

      {!adr?.line1 ? (
        <Button type="submit" icon="plus" onClick={() => setAddressForm(true)} cls=" mt-3 ">
          New address
        </Button>
      ) : (
        <address
          onClick={() => setAddressForm(true)}
          title="Click to edit your Address"
          aria-label="Click to edit your Address"
          className="card cd_hr p-3 w-full lg:w-1/2 rounded-md cursor-pointer">
          <p dir="ltr">
            {adr.line1} {adr.line2 || ""}
            <br />
            {adr.postalCode} {adr.city}
            <br /> {adr.province} {adr.country}
          </p>
        </address>
      )}

      <Modal
        tag="form"
        title="Create or update Addresses"
        okBtn="Create"
        onCancel={() => setAddressForm(false)}
        onSubmit={updateAddress}
        onApprove={() => {}}
        loading={addressLoading}
        open={addressForm}>
        <div className="m-1">
          <AddressInputs
            lang={lang}
            map
            {...adr}
            onError={(err) => setMessage({ type: "error", text: err, duration: 10 })}
          />
        </div>
      </Modal>
    </section>
  );
}

const content = {};
