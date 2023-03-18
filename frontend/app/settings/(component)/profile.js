"use client";
import { useEffect, useState } from "react";
import { Button } from "../../(component)/(styled)/button";
import Modal from "../../(component)/(styled)/modal";
import { NameInputField } from "../../(component)/custom-inputs";
import { AddressInputs } from "../../(component)/address-inputs";

export default function Profile({ lang, firstName, lastName, address }) {
  const [ftName, setFtName] = useState(firstName);
  const [ltName, setLtName] = useState(lastName);
  const [adr, setAdr] = useState(address || {});
  const [addressForm, setAddressForm] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);

  const changeFirstName = (e) => {
    console.log(e.target.value);
    setFtName(e.target.value);
  };

  const changeLastName = (e) => {
    console.log(e.target.value);
    setLtName(e.target.value);
  };

  const updateAddress = (e) => {
    e.preventDefault();
    const data = {};
    setAddressLoading(true);
    new FormData(e.target).forEach((value, key) => (data[key] = value));
    setAdr(data);
    setAddressLoading(false);
    setAddressForm(false);
  };

  useEffect(() => {
    document.title = "Settings - ALM";
  }, []);

  return (
    <section>
      <h3 className="text-lg font-medium mb-3">Profile</h3>
      <div className="flex ">
        <NameInputField editable full first defaultValue={ftName} onBlur={changeFirstName} cls="mr-2" />
        <NameInputField editable full defaultValue={ltName} onBlur={changeLastName} />
      </div>

      <h3 className="text-lg font-medium mt-6 mb-2">Address</h3>

      {!adr ? (
        <Button
          type="submit"
          text="New address"
          icon="plus"
          handler={() => setAddressForm(true)}
          cls="w-full mt-3 "
        />
      ) : (
        <address
          onClick={() => setAddressForm(true)}
          title="Click to edit your Address"
          aria-label="Click to edit your Address"
          className="card cd_hr p-3 w-full lg:w-1/2 rounded-md cursor-pointer">
          <p dir="ltr">
            {adr.line1} {adr.line2 || ""},<br />
            {adr.postalCode} {adr.city}, {adr.country}
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
        <AddressInputs lang={lang} {...adr} />
      </Modal>
    </section>
  );
}

const content = {};
