import React from 'react';

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 bg-gray-50 text-[#403F4C] min-h-[calc(100vh-200px)]">
      <div className="bg-white rounded-2xl p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Kontakt</h1>
        <p className="mb-6 opacity-70">Neváhejte nás kontaktovat ohledně nemovitostí nebo dotazů.</p>

        <img
          src="/pan.png"
          alt="Martin Holý"
          className="rounded-[30px] w-40 h-40 mx-auto mb-6 object-cover shadow [object-position:center_20%]"
        />

        <div className="space-y-2 text-sm opacity-80">
          <p><strong>Jméno:</strong> Martin Holý</p>
          <p><strong>Telefon:</strong> <a href="tel:603898391" className="text-blue-600 hover:underline">603 898 391</a></p>
          <p><strong>Email:</strong> <a href="mailto:info@example.com" className="text-blue-600 hover:underline">info@example.com</a></p>
          <p><strong>Adresa:</strong> Riegrova 1206</p>
          <p><strong>IČO:</strong> 18849024</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
