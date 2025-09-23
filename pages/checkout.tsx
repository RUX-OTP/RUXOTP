import { useState } from "react";

export default function Checkout() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const handlePay = () => {
    if (!email || !amount) return alert("Enter email & amount");

    // @ts-ignore: Paystack script is global
    const handler = PaystackPop.setup({
      key: "pk_test_xxxxxxxxxxxxxxxx", // Replace with your Paystack PUBLIC key
      email,
      amount: Number(amount) * 100, // Convert to Kobo
      currency: "NGN",
      callback: function (response: any) {
        alert("Payment complete! Reference: " + response.reference);
        // TODO: Send this reference to your backend API to verify payment
      },
      onClose: function () {
        alert("Transaction was not completed.");
      },
    });
    handler.openIframe();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Pay with Paystack</h1>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-3 w-64"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount (NGN)"
        className="border p-2 mb-3 w-64"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        onClick={handlePay}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Pay Now
      </button>
    </div>
  );
}
