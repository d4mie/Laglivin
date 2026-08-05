import PolicyPage from "../../components/PolicyPage";

export const metadata = {
  title: "Shipping Policy • Laglivin",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyPage title="Shipping Policy">
      <p>
        Laglivin delivers orders across Nigeria. When you place an order, your
        checkout total covers products only.
      </p>
      <p>
        Delivery fee is paid directly to the dispatcher when your order arrives.
        The fee may vary by location and distance.
      </p>
      <p>
        After payment is confirmed, we prepare your order and arrange delivery.
        Delivery timing depends on your location and dispatcher availability.
        Someone should be available to receive the order and pay the delivery
        fee on arrival.
      </p>
      <p>
        Pickup may also be available at checkout where offered. Pickup orders do
        not include a dispatcher delivery fee.
      </p>
      <p>
        If you have a delivery question after ordering, contact us with your
        order details and we will help.
      </p>
    </PolicyPage>
  );
}
