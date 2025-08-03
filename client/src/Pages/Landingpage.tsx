import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [topListings, setTopListings] = useState([]);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    fetch('http://rk-martin.cz/api/property/list?format=json')
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a: any, b: any) => b.visibility_level - a.visibility_level);
        setTopListings(sorted.slice(0, 3));
      })
      .catch((error) => console.error('Chyba při načítání nemovitostí:', error));
  }, []);

  return (
    <div className="h-full w-full">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center h-auto md:h-[700px] px-6 md:px-[50px] pb-10">
        <div className="md:w-1/2 w-full text-center md:text-left p-4">
          <p className="text-gray-600 text-2xl md:text-[36px]">Najdeme vám nový domov</p>
          <h1 className="text-4xl md:text-[80px] font-bold text-gray-900 mt-2 leading-tight">Realitní kancelář Martin</h1>
          <p className="text-gray-500 leading-[38px] mt-4 md:mt-[6%] text-xl md:text-[36px]">Jsme tu pro vás 7 dní v týdnu již od roku 2004.</p>
          <button
            className="mt-4 text-lg md:text-[28px] bg-[#F9DC5C] py-2 px-4 rounded-lg flex items-center"
            onClick={() => handleNavigate('/list')}
          >
            Zobrazit nabídku 
            <img src="./arrow.svg" alt="arrow" className="h-6 md:h-10 pl-2" />
          </button>
        </div>
        <div className="md:w-1/2 p-4 flex justify-center">
          <img 
            src="./drone.jpeg" 
            alt="Letecký pohled na domy" 
            className="rounded-2xl w-full max-w-[700px] object-cover"
          />
        </div>
      </div>

      {/* Services Section */}
      <div className="text-center py-12 bg-white">
        <h2 className="text-4xl md:text-[80px] font-semibold mb-[60px]">Naše služby</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          {[
            { img: "./Domecek.svg", title: "Prodej nemovitostí", text: "Chaty, byty, rodinné domy, pozemky.." },
            { img: "./Graf.svg", title: "Vyhodnocení cen majetků, dědické odhady", text:"Vyhodnotíme vaši nemovitost" },
            { img: "./Cons.svg", title: "Konzultace", text:"Neváhejte si s námi dohodnout neplacenou konzultaci" }
          ].map((service, index) => (
            <div key={index} className="flex flex-col items-center md:items-start text-center md:text-left">
              <img src={service.img} alt={service.title} className="h-16 md:h-20" />
              <h3 className="text-xl md:text-[30px] font-semibold mt-2">{service.title}</h3>
              <p className="text-gray-600 mt-2 text-sm md:text-base">{service.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Offers Section */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">Aktuálně nabízíme</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {topListings.map((item: any) => (
            <div key={item.id} className="relative bg-white shadow-lg rounded-xl overflow-hidden w-64 h-64">
              <img
                src={item.images[0].image_url || "./drone.jpeg"}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-white bg-opacity-0 opacity-0 hover:opacity-100 hover:bg-white transition-all duration-300 flex flex-col justify-center items-center text-white p-4">
                <button
                  className="bg-[#F9DC5C] w-20 h-20 rounded-full text-gray-900 font-semibold flex items-center justify-center p-5"
                  onClick={() => handleNavigate(`/detail/${item.id}`)}
                >
                  Zobrazit
                </button>
                <p className="text-gray-900 font-medium mt-2">{item.name}</p>
              </div>
            </div>
          ))}

          <div className="bg-white shadow-2xl rounded-xl flex items-center justify-center w-64 h-64">
            <p
              className="text-[30px] font-semibold text-center max-w-[150px] flex flex-col rotate-45 cursor-pointer"
              onClick={() => handleNavigate('/list')}
            >
              Celá nabídka nemovitostí
              <img src="./click.svg" alt="arrow" className="h-20 -rotate-45" />
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center py-12 bg-white px-6 md:px-[50px]">

      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start gap-10 mt-20">

{/* Sekce s Martinem Holým */}
<div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full md:min-w-[250px] md:max-w-[700px] text-center md:text-left mx-auto">
  <img
    src="/pan.png"
    alt="Martin Holy"
    className="w-40 md:w-[250px] h-auto rounded-[30px] object-cover"
  />
  <div>
    <h2 className="text-2xl md:text-[35px] font-semibold">Martin Holý</h2>
    <p className="text-gray-500">Realitní makléř</p>
    <p className="text-gray-600 mt-4 text-sm md:text-[20px]">
      Zaměřujeme se především na prodej nemovitostí, vše se snažíme zhodnotit tak, aby se spokojenost nesla na obou stranách.
      Jakékoliv kroky, ať už při prodeji nebo nákupu, budete řešit primárně se mnou. <br />
      Těším se na kontakt s Vámi, <br />Martin Holý.
    </p>
    <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg">Kontakt</button>
  </div>
</div>

{/* Sekce výhod */}
<div className="w-full md:w-5/12 text-center md:text-left">
  <h2 className="text-3xl md:text-[48px] font-semibold mb-6 leading-tight">
    Proč si vybrat nás?
  </h2>
  <ul className="space-y-6">
    {[
      {
        title: "Rodinný podnik",
        description: "Osobní přístup a důvěra jsou u nás na prvním místě."
      },
      {
        title: "Bohatá historie",
        description: "Prodali jsme už řadu nemovitostí, vždy s úspěchem."
      },
      {
        title: "Minimální poplatky",
        description: "Žádné skryté poplatky, férová a transparentní cena."
      },
      {
        title: "Právní pořádek",
        description: "Všechny transakce jsou právně ošetřené a bezpečné."
      },
      {
        title: "Bezpečná transakce",
        description: "Vaše finance i data jsou u nás v bezpečí."
      }
    ].map((item, index) => (
      <li
        key={index}
        className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 text-gray-700"
      >
        <img
          src="./Check.svg"
          alt="Check"
          className="h-6 md:h-7 self-center shrink-0"
        />
        <div>
          <div className="font-semibold text-base md:text-lg">{item.title}</div>
          <div className="text-sm md:text-base text-gray-600">
            {item.description}
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>
</div>
<section className="w-full max-w-4xl mx-auto px-4 py-16 text-center md:text-left">
  <h2 className="text-3xl md:text-5xl font-semibold mb-6">
    Chcete prodat svou nemovitost?
  </h2>
  <p className="text-gray-600 mb-10 text-base md:text-lg">
    Vyplňte nezávazný formulář a já se Vám co nejdříve ozvu. Společně najdeme nejlepší řešení pro prodej Vaší nemovitosti.
  </p>

  <form className="space-y-6">
    <div className="flex flex-col md:flex-row gap-6">
      <input
        type="text"
        placeholder="Vaše jméno"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
      />
      <input
        type="email"
        placeholder="E-mail"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
      />
    </div>

    <input
      type="tel"
      placeholder="Telefon"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
    />

    <textarea
      placeholder="Popište svou nemovitost nebo zadejte další informace..."
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
    ></textarea>

    <button
      type="submit"
      className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
    >
      Odeslat formulář
    </button>
  </form>
</section>


    </div>



    </div>
  );
};

export default LandingPage;
