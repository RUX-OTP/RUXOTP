export default function Home() {
  return (
    <section className="text-center py-20">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to RuxOTP</h1>
      <p className="mt-4 text-lg max-w-2xl mx-auto">
        Buy virtual numbers, receive OTPs securely, powered by Twilio.  
        Fast, reliable, and affordable.
      </p>
      <a
        href="/services"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        View Services
      </a>
    </section>
  );
}
