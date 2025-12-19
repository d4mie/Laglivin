"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "./CartContext";

function formatNaira(value) {
  const amount = Number(value);
  if (Number.isNaN(amount)) return `${value}`;
  return `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;
}

function parsePriceToNumber(price) {
  if (typeof price !== "string") return Number(price) || 0;
  const numeric = Number(price.replace(/[^\d.]/g, ""));
  return Number.isNaN(numeric) ? 0 : numeric;
}

function isBlank(value) {
  return !String(value ?? "").trim();
}

function Input({
  label,
  type = "text",
  placeholder,
  rightSlot,
  rightSlotInteractive = false,
  ...props
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/30"
          {...props}
        />
        {rightSlot ? (
          <div
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-white/50 ${
              rightSlotInteractive ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            {rightSlot}
          </div>
        ) : null}
      </div>
    </label>
  );
}

function HelpPopover({
  open,
  text = "In case we need to contact you about your order",
}) {
  if (!open) return null;
  return (
    <div className="absolute right-0 top-full z-20 mt-2 w-64 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black shadow-xl ring-1 ring-black/10">
      {text}
    </div>
  );
}

function PhoneHelpIcon({ open, onOpen, onHoverChange }) {
  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Why we need your phone number"
        onMouseEnter={() => onHoverChange?.(true)}
        onMouseLeave={() => onHoverChange?.(false)}
        onPointerEnter={() => onHoverChange?.(true)}
        onPointerLeave={() => onHoverChange?.(false)}
        onWheel={(e) => {
          // Only open on scroll over the icon (per UX request)
          onOpen();
        }}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-black/40 text-xs font-semibold text-white/80 shadow-sm ring-1 ring-white/10 transition hover:border-white/40 hover:bg-black/50 hover:text-white"
      >
        ?
      </button>
      <HelpPopover open={open} />
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-xl font-semibold tracking-tight text-white">
      {children}
    </h2>
  );
}

function RadioRow({ checked, onChange, title, subtitle, rightSlot, name }) {
  return (
    <label
      className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3 transition ${
        checked
          ? "border-blue-500/60 bg-blue-500/10 ring-1 ring-blue-500/20"
          : "border-white/10 bg-white/5 hover:border-white/20"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-4 w-4 items-center justify-center rounded-full border ${
            checked ? "border-blue-500/80" : "border-white/30"
          }`}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              checked ? "bg-blue-500" : "bg-transparent"
            }`}
          />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">{title}</p>
          {subtitle ? (
            <p className="mt-0.5 text-xs text-white/60">{subtitle}</p>
          ) : null}
        </div>
      </div>
      {rightSlot ? (
        <div className="text-sm font-semibold text-white/70">{rightSlot}</div>
      ) : null}
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
    </label>
  );
}

export default function CheckoutForm() {
  const { items } = useCart();
  const [email, setEmail] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("ship"); // ship | pickup
  const [country, setCountry] = useState("Nigeria");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [stateRegion, setStateRegion] = useState("Lagos");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingMethod, setShippingMethod] = useState("lagos"); // lagos | outside
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billingCountry, setBillingCountry] = useState("Nigeria");
  const [billingFirstName, setBillingFirstName] = useState("");
  const [billingLastName, setBillingLastName] = useState("");
  const [billingCompany, setBillingCompany] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingApartment, setBillingApartment] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingStateRegion, setBillingStateRegion] = useState("Lagos");
  const [billingPostalCode, setBillingPostalCode] = useState("");
  const [billingPhone, setBillingPhone] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [showPhoneHelp, setShowPhoneHelp] = useState(false);
  const [showBillingPhoneHelp, setShowBillingPhoneHelp] = useState(false);
  const [isPhoneHelpHover, setIsPhoneHelpHover] = useState(false);
  const [isBillingPhoneHelpHover, setIsBillingPhoneHelpHover] = useState(false);
  const phoneHelpTimerRef = useRef(null);
  const billingPhoneHelpTimerRef = useRef(null);
  const phoneHelpLastOpenRef = useRef(0);
  const billingPhoneHelpLastOpenRef = useRef(0);

  const subtotalNaira = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + parsePriceToNumber(item.price) * item.quantity,
      0
    );
  }, [items]);

  const shippingCost = useMemo(() => {
    if (deliveryMode !== "ship") return 0;
    return shippingMethod === "lagos" ? 5000 : 7000;
  }, [deliveryMode, shippingMethod]);

  const totalNaira = subtotalNaira + shippingCost;

  const missingRequiredFields = useMemo(() => {
    const missing = [];

    // Contact
    if (!email.trim() || !email.includes("@")) missing.push("Email");

    // Delivery (everything except explicitly optional fields)
    if (isBlank(firstName)) missing.push("First name");
    if (isBlank(lastName)) missing.push("Last name");
    if (isBlank(address)) missing.push("Address");
    if (isBlank(city)) missing.push("City");
    if (isBlank(stateRegion)) missing.push("State");
    if (isBlank(phone)) missing.push("Phone");

    // Billing (only if user chose different billing address)
    if (!billingSameAsShipping) {
      if (isBlank(billingFirstName)) missing.push("Billing first name");
      if (isBlank(billingLastName)) missing.push("Billing last name");
      if (isBlank(billingAddress)) missing.push("Billing address");
      if (isBlank(billingCity)) missing.push("Billing city");
      if (isBlank(billingStateRegion)) missing.push("Billing state");
      if (isBlank(billingPhone)) missing.push("Billing phone");
    }

    return missing;
  }, [
    email,
    firstName,
    lastName,
    address,
    city,
    stateRegion,
    phone,
    billingSameAsShipping,
    billingFirstName,
    billingLastName,
    billingAddress,
    billingCity,
    billingStateRegion,
    billingPhone,
  ]);

  const canPay =
    items.length > 0 &&
    !isPaying &&
    totalNaira > 0 &&
    missingRequiredFields.length === 0;

  const openPhoneHelp = () => {
    const now = Date.now();
    if (now - phoneHelpLastOpenRef.current < 250) return;
    phoneHelpLastOpenRef.current = now;
    setShowPhoneHelp(true);
    if (phoneHelpTimerRef.current) window.clearTimeout(phoneHelpTimerRef.current);
    phoneHelpTimerRef.current = window.setTimeout(
      () => setShowPhoneHelp(false),
      2500
    );
  };

  const openBillingPhoneHelp = () => {
    const now = Date.now();
    if (now - billingPhoneHelpLastOpenRef.current < 250) return;
    billingPhoneHelpLastOpenRef.current = now;
    setShowBillingPhoneHelp(true);
    if (billingPhoneHelpTimerRef.current)
      window.clearTimeout(billingPhoneHelpTimerRef.current);
    billingPhoneHelpTimerRef.current = window.setTimeout(
      () => setShowBillingPhoneHelp(false),
      2500
    );
  };

  useEffect(() => {
    const onWheel = () => {
      // If the user is scrolling while hovering the "?" icon, show the helper.
      if (isPhoneHelpHover) openPhoneHelp();
      if (isBillingPhoneHelpHover) openBillingPhoneHelp();
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [isPhoneHelpHover, isBillingPhoneHelpHover]);

  const onPayNow = async () => {
    setPayError("");

    if (!items.length) {
      setPayError("Your cart is empty.");
      return;
    }
    if (missingRequiredFields.length) {
      setPayError(
        `Please fill: ${missingRequiredFields.slice(0, 5).join(", ")}${
          missingRequiredFields.length > 5 ? "…" : ""
        }`
      );
      return;
    }
    if (totalNaira <= 0) {
      setPayError("Invalid total amount.");
      return;
    }

    setIsPaying(true);
    try {
      const amountKobo = Math.round(totalNaira * 100);
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amountKobo,
          metadata: {
            cart: items.map((i) => ({
              slug: i.slug,
              title: i.title,
              price: i.price,
              quantity: i.quantity,
            })),
            shipping: {
              mode: deliveryMode,
              method: deliveryMode === "ship" ? shippingMethod : "pickup",
              shippingCostNaira: shippingCost,
            },
            contact: {
              country,
              firstName,
              lastName,
              company,
              address,
              apartment,
              city,
              stateRegion,
              postalCode,
              phone,
            },
            billing: billingSameAsShipping
              ? { sameAsShipping: true }
              : {
                  sameAsShipping: false,
                  country: billingCountry,
                  firstName: billingFirstName,
                  lastName: billingLastName,
                  company: billingCompany,
                  address: billingAddress,
                  apartment: billingApartment,
                  city: billingCity,
                  stateRegion: billingStateRegion,
                  postalCode: billingPostalCode,
                  phone: billingPhone,
                },
            totals: {
              subtotalNaira,
              shippingCostNaira: shippingCost,
              totalNaira,
              currency: "NGN",
            },
          },
        }),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok || !json?.authorization_url) {
        throw new Error(json?.error || "Unable to start payment. Try again.");
      }
      window.location.href = json.authorization_url;
    } catch (e) {
      setPayError(e?.message || "Payment failed to start. Try again.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="relative z-10 mx-auto w-full max-w-[560px] px-4 pb-16 pt-10 sm:px-6">
      <div className="flex items-start justify-between gap-6">
        <SectionTitle>Contact</SectionTitle>
        <Link
          href="/"
          className="text-sm font-semibold text-blue-400 hover:text-blue-300"
        >
          Sign in
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        <Input
          label="Email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          rightSlot={
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 9.5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2l-10 6L4 8Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />

        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-white/60">
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3.5 11.5V7.8c0-1 .8-1.8 1.8-1.8h13.4c1 0 1.8.8 1.8 1.8v8.4c0 1-.8 1.8-1.8 1.8H9.2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M3.5 12.2 12 16.8l8.5-4.6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 19.5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5S5 15.62 5 17s1.12 2.5 2.5 2.5Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">Hide My Email…</p>
              <p className="mt-0.5 text-xs text-white/60">
                Create a unique, random address that forwards to your inbox.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <SectionTitle>Delivery</SectionTitle>
        <div className="mt-4 space-y-3">
          <RadioRow
            name="delivery"
            checked={deliveryMode === "ship"}
            onChange={() => setDeliveryMode("ship")}
            title="Ship"
            rightSlot={
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 7h11v10H3V7Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 10h4l3 3v4h-7v-7Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            }
          />
          <RadioRow
            name="delivery"
            checked={deliveryMode === "pickup"}
            onChange={() => setDeliveryMode("pickup")}
            title="Pick up"
            rightSlot={
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 21V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M9 21v-6h6v6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>

        <div className="mt-4 space-y-3">
          <label className="block">
            <span className="sr-only">Country/Region</span>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/30"
            >
              <option>Nigeria</option>
              <option>Ghana</option>
              <option>United States</option>
              <option>United Kingdom</option>
            </select>
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              label="First name"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <Input
              label="Last name"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <Input
            label="Company (optional)"
            placeholder="Company (optional)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <Input
            label="Address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <Input
            label="Apartment, suite, etc. (optional)"
            placeholder="Apartment, suite, etc. (optional)"
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Input
              label="City"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <label className="block">
              <span className="sr-only">State</span>
              <select
                value={stateRegion}
                onChange={(e) => setStateRegion(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/30"
              >
                <option>Lagos</option>
                <option>Abuja</option>
                <option>Rivers</option>
                <option>Oyo</option>
              </select>
            </label>
            <Input
              label="Postal code (optional)"
              placeholder="Postal code (optional)"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          <Input
            label="Phone"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            rightSlotInteractive
            rightSlot={
              <PhoneHelpIcon
                open={showPhoneHelp}
                onOpen={openPhoneHelp}
                onHoverChange={setIsPhoneHelpHover}
              />
            }
          />

          <label className="flex items-center gap-3 text-sm text-white/70">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/20 bg-white/10 text-blue-500"
            />
            Save this information for next time
          </label>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-sm font-semibold text-white">Shipping method</p>
        <div className="mt-3 space-y-3">
          <RadioRow
            name="shipping"
            checked={shippingMethod === "lagos"}
            onChange={() => setShippingMethod("lagos")}
            title="Delivery within LAGOS"
            subtitle="Delivery within 7 to 14 Days"
            rightSlot={formatNaira(5000)}
          />
          <RadioRow
            name="shipping"
            checked={shippingMethod === "outside"}
            onChange={() => setShippingMethod("outside")}
            title="Delivery outside LAGOS"
            subtitle="Delivery within 7 to 14 Days"
            rightSlot={formatNaira(7000)}
          />
        </div>
      </div>

      <div className="mt-10">
        <SectionTitle>Payment</SectionTitle>
        <p className="mt-1 text-sm text-white/60">
          All transactions are secure and encrypted.
        </p>

        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
            <p className="text-sm font-semibold text-white">Paystack</p>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <span className="rounded bg-white/10 px-2 py-1">MC</span>
              <span className="rounded bg-white/10 px-2 py-1">VISA</span>
              <span className="rounded bg-white/10 px-2 py-1">VERVE</span>
              <span className="rounded bg-white/10 px-2 py-1">+5</span>
            </div>
          </div>

          <div className="px-4 py-10 text-center text-sm text-white/60">
            <div className="mx-auto mb-4 h-20 w-28 rounded-xl border border-white/10 bg-black/30" />
            After clicking &quot;Pay now&quot;, you will be redirected to Paystack
            to complete your purchase securely.
          </div>
        </div>
      </div>

      <div className="mt-10">
        <SectionTitle>Billing address</SectionTitle>
        <div className="mt-4 space-y-3">
          <RadioRow
            name="billing"
            checked={billingSameAsShipping}
            onChange={() => setBillingSameAsShipping(true)}
            title="Same as shipping address"
          />
          <RadioRow
            name="billing"
            checked={!billingSameAsShipping}
            onChange={() => setBillingSameAsShipping(false)}
            title="Use a different billing address"
          />
        </div>

        {!billingSameAsShipping ? (
          <div className="mt-4 space-y-3">
            <label className="block">
              <span className="sr-only">Billing country/region</span>
              <select
                value={billingCountry}
                onChange={(e) => setBillingCountry(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/30"
              >
                <option>Nigeria</option>
                <option>Ghana</option>
                <option>United States</option>
                <option>United Kingdom</option>
              </select>
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                label="Billing first name"
                placeholder="First name"
                value={billingFirstName}
                onChange={(e) => setBillingFirstName(e.target.value)}
                required
              />
              <Input
                label="Billing last name"
                placeholder="Last name"
                value={billingLastName}
                onChange={(e) => setBillingLastName(e.target.value)}
                required
              />
            </div>

            <Input
              label="Billing company (optional)"
              placeholder="Company (optional)"
              value={billingCompany}
              onChange={(e) => setBillingCompany(e.target.value)}
            />

            <Input
              label="Billing address"
              placeholder="Address"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              required
            />

            <Input
              label="Billing apartment, suite, etc. (optional)"
              placeholder="Apartment, suite, etc. (optional)"
              value={billingApartment}
              onChange={(e) => setBillingApartment(e.target.value)}
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Input
                label="Billing city"
                placeholder="City"
                value={billingCity}
                onChange={(e) => setBillingCity(e.target.value)}
                required
              />
              <label className="block">
                <span className="sr-only">Billing state</span>
                <select
                  value={billingStateRegion}
                  onChange={(e) => setBillingStateRegion(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/30"
                >
                  <option>Lagos</option>
                  <option>Abuja</option>
                  <option>Rivers</option>
                  <option>Oyo</option>
                </select>
              </label>
              <Input
                label="Billing postal code (optional)"
                placeholder="Postal code (optional)"
                value={billingPostalCode}
                onChange={(e) => setBillingPostalCode(e.target.value)}
              />
            </div>

            <Input
              label="Billing phone"
              placeholder="Phone"
              value={billingPhone}
              onChange={(e) => setBillingPhone(e.target.value)}
              required
              rightSlotInteractive
              rightSlot={
                <PhoneHelpIcon
                  open={showBillingPhoneHelp}
                  onOpen={openBillingPhoneHelp}
                  onHoverChange={setIsBillingPhoneHelpHover}
                />
              }
            />
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onPayNow}
        disabled={!canPay}
        className={`mt-8 w-full rounded-xl px-5 py-4 text-sm font-semibold text-white transition focus:outline-none focus:ring-4 focus:ring-blue-500/30 ${
          !canPay
            ? "cursor-not-allowed bg-blue-600/40"
            : "bg-blue-600 hover:bg-blue-500"
        }`}
        aria-label="Pay now"
      >
        {isPaying ? "Redirecting…" : "Pay now"}
      </button>

      {payError ? (
        <p className="mt-3 text-center text-sm text-red-300">{payError}</p>
      ) : missingRequiredFields.length ? (
        <p className="mt-3 text-center text-xs text-white/50">
          Fill all required fields to continue.
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/50">
        <Link href="/refund-policy" className="hover:text-white">
          Refund policy
        </Link>
        <Link href="/shipping-policy" className="hover:text-white">
          Shipping
        </Link>
        <Link href="/privacy-policy" className="hover:text-white">
          Privacy policy
        </Link>
        <Link href="/terms-of-service" className="hover:text-white">
          Terms of service
        </Link>
      </div>

      {/* Debug-friendly: cost preview without changing layout */}
      <p className="sr-only">Shipping: {formatNaira(shippingCost)}</p>
    </div>
  );
}


