import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import hero from '../assets/Hero__4_.avif'
import hero1 from '../assets/Advanced.avif'
import hero2 from '../assets/zero_fees_us.avif'
import hero3 from '../assets/image.avif'
import hero4 from '../assets/0_4mVyVaU6yLa--GR_.avif'
import hero5 from '../assets/CB_LOLP__1_.avif'
import hero6 from '../assets/Learn_Illustration_Ultimate_Guide_Bitcoin.avif'
import hero7 from '../assets/Replace_Bank.avif'
import { cryptoApi } from '../services/api';

const Home = () => {
  const [activeTab, setActiveTab] = useState('tradable');
  const [topCryptos, setTopCryptos] = useState([]);
  const [isLoadingCryptos, setIsLoadingCryptos] = useState(true);
  const [cryptoError, setCryptoError] = useState('');

  useEffect(() => {
    let mounted = true;

    const fetchCryptos = async () => {
      try {
        setIsLoadingCryptos(true);
        setCryptoError('');

        let response;

        if (activeTab === 'gainers') {
          response = await cryptoApi.getGainers();
        } else if (activeTab === 'new') {
          response = await cryptoApi.getNewListings();
        } else {
          response = await cryptoApi.getAll();
        }

        if (mounted) {
          setTopCryptos((response.cryptos || []).slice(0, 6));
        }
      } catch (error) {
        if (mounted) {
          setTopCryptos([]);
          setCryptoError(error.message || 'Failed to load cryptocurrencies.');
        }
      } finally {
        if (mounted) {
          setIsLoadingCryptos(false);
        }
      }
    };

    fetchCryptos();

    return () => {
      mounted = false;
    };
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-white py-20 md:py-32">
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex justify-center md:justify-start order-2 md:order-1">
              <img 
                src={hero}
                alt="Coin" 
                className="w-full rounded-[56px]"
              />
            </div>
            <div className="order-1 md:order-2">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0D0D0D] mb-6 leading-[1.1]">
                The future of finance is here.
              </h1>
              <p className="text-xl md:text-2xl text-[#5B616E] mb-8 leading-relaxed">
                Trade crypto and more on a platform you can trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 px-4 py-3.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent"
                />
                <Link to="/signup">
                  <button className="w-full sm:w-auto px-8 py-3.5 text-base font-medium text-white bg-[#0052FF] hover:bg-[#0041CC] rounded-3xl transition-colors whitespace-nowrap">
                    Sign up
                  </button>
                </Link>
              </div>
              <p className="text-sm text-[#8A919E] mt-4">
                Stocks and prediction markets not available in your jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Crypto Section */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-200">
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 items-start">
            {/* Left: Heading, Description, and Button */}
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0D0D0D] mb-4">
                Explore crypto like Bitcoin, Ethereum, and Dogecoin.
              </h2>
              <p className="text-lg text-[#5B616E] mb-6">
                Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
              </p>
              <Link to="/explore">
                <button className="flex items-center px-8 py-4 text-sm font-medium bg-black text-[#ffffff] border hover:bg-gray-800 rounded-full transition-colors">
                  See more assets
                </button>
              </Link>
            </div>

            {/* Right: Table Container */}
            <div className="bg-black rounded-2xl overflow-hidden">
              {/* Tabs */}
              <div className="flex gap-6 px-6 pt-6 ">
                <button
                  onClick={() => setActiveTab('tradable')}
                  className={`pb-3 px-1 font-medium text-base transition-colors ${
                    activeTab === 'tradable'
                      ? 'text-[#ffffff] border-b-2 border-[#3f4044]'
                      : 'text-[#5B616E] hover:text-[#5c5c5c]'
                  }`}
                >
                  Tradable
                </button>
                <button
                  onClick={() => setActiveTab('gainers')}
                  className={`pb-3 px-1 font-medium text-base transition-colors ${
                    activeTab === 'gainers'
                      ? 'text-[#ffffff] border-b-2 border-[#727376]'
                      : 'text-[#5B616E] hover:text-[#7e7e7e]'
                  }`}
                >
                  Top gainers
                </button>
                <button
                  onClick={() => setActiveTab('new')}
                  className={`pb-3 px-1 font-medium text-base transition-colors ${
                    activeTab === 'new'
                      ? 'text-[#ffffff] border-b-2 border-[#696969]'
                      : 'text-[#5B616E] hover:text-[#716f6f]'
                  }`}
                >
                  New on Coinbase
                </button>
              </div>

              {/* Crypto List - Table Style */}
              <div className="divide-y divide-black">
                {isLoadingCryptos && (
                  <div className="px-6 py-8 text-sm text-gray-300">Loading market data...</div>
                )}

                {!isLoadingCryptos && cryptoError && (
                  <div className="px-6 py-8 text-sm text-red-300">{cryptoError}</div>
                )}

                {!isLoadingCryptos && !cryptoError && topCryptos.length === 0 && (
                  <div className="px-6 py-8 text-sm text-gray-300">No assets available.</div>
                )}

                {!isLoadingCryptos && !cryptoError && topCryptos.map((crypto) => {
                  const isPositive = crypto.change >= 0;
                  return (
                    <Link
                      key={crypto.id}
                      to={`/asset/${crypto.id}`}
                      className="flex items-center justify-between px-6 py-5 hover:bg-gray-700 transition-colors"
                    >
                      {/* Left: Icon + Name */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-12 h-12 rounded-full ${crypto.color} flex items-center justify-center shrink-0`}>
                          <span className="text-white font-bold text-lg">{crypto.symbol.charAt(0)}</span>
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-[#ffffff] text-lg">{crypto.name}</div>
                        </div>
                      </div>

                      {/* Right: Price + Change */}
                      <div className="text-right">
                        <div className="font-semibold text-[#ffffff] text-lg mb-0.5">
                          ${crypto.price.toLocaleString()}
                        </div>
                        <div className={`text-base font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {isPositive ? '+' : ''}{crypto.change.toFixed(2)}%
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Trade Section */}
      <section className="bg-[#ffffff] py-16 md:py-24">
        <div className="max-w-full max-h-full mx-auto px-10 sm:px-6 lg:px-32">
          <div className="grid grid-cols-1 md:grid-cols-[50%_45%] lg:grid-cols-[50%_45%] gap-8 md:gap-12 items-center">
            <div className="flex justify-center md:justify-end order-2 md:order-1">
              <img 
                src={hero1}
                className="w-full rounded-[56px] shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0D0D0D] mb-6 leading-tight">
                Powerful tools, designed for the advanced trader.
              </h2>
              <p className="text-lg text-[#5B616E] mb-8 leading-relaxed">
                Powerful analytical tools with the safety and security of Coinbase deliver the ultimate trading experience. 
                Tap into sophisticated charting capabilities, real-time order books, and deep liquidity across hundreds of markets.
              </p>
              <button className="px-6 py-3 text-base font-medium text-white bg-[#000000] hover:bg-[#2f3033] rounded-3xl transition-colors">
                Start trading
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Coinbase One Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="text-sm font-bold inline-block rounded-lg border border-gray-200 text-[#000000] mb-3 tracking-wide px-4 py-2">COINBASE ONE</div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0D0D0D] mb-6 leading-tight">
                Zero trading fees, more rewards.
              </h2>
              <p className="text-lg text-[#5B616E] mb-8 leading-relaxed">
                Get more out of crypto with one membership: zero trading fees, boosted rewards, priority support, and more.
              </p>
              <button className="px-5 py-3 text-base font-medium text-white bg-[#000000] hover:bg-[#4a4c53] rounded-3xl transition-colors">
                Claim free trial
              </button>
            </div>
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div className="bg-[#F7F8FA] p-8 rounded-[56px] w-full">
                <img 
                  src={hero2}
                  alt="Coin" 
                  className="w-full max-h-100 object-contain rounded-[56px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Base App Section */}
      <section className="bg-[#F7F8FA] py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex justify-center order-2 md:order-1">
              <img 
              src={hero5}
                alt="Base App" 
                className="w-full rounded-[56px]"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="text-sm font-bold text-[#0052FF] mb-3 tracking-wide">BASE APP</div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0D0D0D] mb-6 leading-tight">
                Countless ways to earn crypto with the Base App.
              </h2>
              <p className="text-lg text-[#5B616E] mb-8 leading-relaxed">
                An everything app to trade, create, discover, and chat, all in one place.
              </p>
              <button className="px-6 py-3 text-base font-medium text-white bg-[#000000] hover:bg-[#45474b] rounded-3xl transition-colors">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Learn Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0D0D0D] mb-4 leading-tight">
              New to crypto? Learn some crypto basics
            </h2>
            
            <p className="text-lg text-[#5B616E] leading-relaxed">
              Beginner guides, practical tips, and market updates for first-timers, experienced investors, and everyone in between
            </p>
            <Link to="/learn">
            <button className="px-6 py-3 text-base font-medium text-[#ffffff] bg-black border border-gray-300 hover:bg-gray-800 rounded-2xl transition-colors">
              Read More
            </button>
          </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Link to="/learn" className="group">
              <div className="overflow-hidden rounded-[40px] mb-4">
                <img 
                  src={hero4} 
                  alt="USDC" 
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-[#0D0D0D] mb-2 group-hover:text-[#0052FF] transition-colors">
                USDC: The digital dollar for the global crypto economy
              </h3>
            </Link>

            <Link to="/learn" className="group">
              <div className="overflow-hidden rounded-[40px] mb-4">
                <img 
                  src={hero7}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-[#0D0D0D] mb-2 group-hover:text-[#0052FF] transition-colors">
                Can crypto really replace your bank account?
              </h3>
            </Link>

            <Link to="/learn" className="group">
              <div className="overflow-hidden rounded-[40px] mb-4">
                <img 
                  src={hero6}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-[#0D0D0D] mb-2 group-hover:text-[#0052FF] transition-colors">
                When is the best time to invest in crypto?
              </h3>
            </Link>
          </div>

          
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#F7F8FA] py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Text Content */}
            <div className="order-2 md:order-1">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0D0D0D] mb-6 leading-tight">
                Take control of your money
              </h2>
              <p className="text-xl text-[#5B616E] mb-8">
                Start your portfolio today and discover crypto
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 px-4 py-3.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent"
                />
                <Link to="/signup">
                  <button className="w-full sm:w-auto px-10 py-3.5 text-base font-medium text-white bg-[#0052FF] hover:bg-[#0041CC] rounded-3xl transition-colors whitespace-nowrap">
                    Sign up
                  </button>
                </Link>
              </div>
            </div>

            {/* Right: Image */}
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <img 
                src={hero3} 
                alt="Take control" 
                className="w-full rounded-[56px]"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
