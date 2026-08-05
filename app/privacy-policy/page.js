import PolicyPage from "../../components/PolicyPage";

export const metadata = {
  title: "Privacy Policy • Laglivin",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage title="Privacy Policy">
      <p>
        Laglivin collects the information needed to process and deliver your
        order. This can include your name, email, phone number, shipping
        address, and payment confirmation details.
      </p>
      <p>
        We use this information to complete checkout, arrange delivery, send
        order updates, and improve the shopping experience. Payments are handled
        by Paystack. We do not store your full card details on our servers.
      </p>
      <p>
        We do not sell your personal information. We may share order details with
        trusted partners only as needed to fulfill delivery or process payment.
      </p>
      <p>
        You can contact us if you want to update or correct your order contact
        details. We keep order records as needed for business, security, and
        legal purposes.
      </p>
      <p>
        By using laglivin.com and completing checkout, you agree to this privacy
        policy.
      </p>
    </PolicyPage>
  );
}
