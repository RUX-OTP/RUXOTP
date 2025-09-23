callback: async function (response: any) {
  alert("Payment complete! Ref: " + response.reference);

  // Send ref + userId to backend
  const res = await fetch("/api/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      reference: response.reference,
      userId: "USER_ID_HERE", // replace with logged-in user ID
    }),
  });

  const result = await res.json();
  if (result.success) {
    alert("Wallet updated! New balance: ₦" + result.wallet / 100);
  } else {
    alert("Verification failed: " + result.error);
  }
}
<a
  href="/checkout"
  className="mt-6 bg-blue-600 px-4 py-2 rounded text-white"
>
  Add Funds
</a>
