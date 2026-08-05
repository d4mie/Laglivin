import PolicyPage from "../../components/PolicyPage";

export const metadata = {
  title: "Terms of Service • Laglivin",
};

export default function TermsOfServicePage() {
  return (
    <PolicyPage title="Terms of Service">
      <p>
        Welcome to Laglivin. By browsing or purchasing from laglivin.com, you
        agree to these terms.
      </p>
      <p>
        Product prices are shown in Nigerian Naira unless stated otherwise.
        Checkout totals cover products only. Delivery fees, when shipping is
        selected, are paid to the dispatcher on delivery.
      </p>
      <p>
        Orders are confirmed after successful payment through Paystack. We
        reserve the right to cancel an order if an item is unavailable, payment
        fails, or order details appear incomplete or fraudulent.
      </p>
      <p>
        Product images and descriptions are provided to help you choose. Limited
        items may sell out without notice. Sold-out items cannot be added to
        cart.
      </p>
      <p>
        You are responsible for providing accurate contact and delivery details.
        Laglivin is not responsible for failed delivery caused by incorrect
        address or unreachable contact information.
      </p>
      <p>
        These terms may be updated from time to time. Continued use of the site
        after changes means you accept the updated terms.
      </p>
    </PolicyPage>
  );
}
