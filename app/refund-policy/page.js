import PolicyPage from "../../components/PolicyPage";

export const metadata = {
  title: "Refund Policy • Laglivin",
};

export default function RefundPolicyPage() {
  return (
    <PolicyPage title="Refund Policy">
      <p>
        All Laglivin product sales are carefully prepared and fulfilled after
        payment. Because many items are limited, refunds are reviewed case by
        case.
      </p>
      <p>
        If your order arrives damaged, incomplete, or incorrect, contact us as
        soon as possible with your order details and clear photos. We will
        review the issue and offer a replacement, store credit, or refund where
        appropriate.
      </p>
      <p>
        Delivery fees paid to the dispatcher are separate from your product
        payment and are generally not refundable once delivery has been
        completed.
      </p>
      <p>
        Sold-out items cannot be purchased. If an item becomes unavailable after
        checkout but before fulfillment, we will contact you with options.
      </p>
      <p>
        To start a refund or replacement request, email us with your order
        reference and a short description of the issue.
      </p>
    </PolicyPage>
  );
}
