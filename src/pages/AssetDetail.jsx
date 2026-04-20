import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import PriceChart from '../components/crypto/PriceChart';
import { cryptoApi } from '../services/api';

const generateChartData = () => {
  return Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 1);
};

const AssetDetail = () => {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [amount, setAmount] = useState('');
  const chartData = useMemo(() => generateChartData(), []);

  useEffect(() => {
    let mounted = true;

    const fetchCrypto = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');
        const data = await cryptoApi.getById(id);

        if (mounted) {
          setCrypto(data.crypto || null);
        }
      } catch (error) {
        if (mounted) {
          setCrypto(null);
          setErrorMessage(error.message || 'Unable to load this asset.');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCrypto();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Loading asset...</h1>
          <p className="text-gray-600">Please wait while we fetch the latest market data.</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!crypto) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Cryptocurrency not found</h1>
          {errorMessage && <p className="text-red-600 mb-6">{errorMessage}</p>}
          <Link to="/explore">
            <Button>Back to Explore</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isPositive = crypto.change >= 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link to="/explore" className="text-blue-600 hover:text-blue-700 mb-6 inline-block">
          ← Back to Explore
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${crypto.color}`}>
                <span className="text-white font-bold text-2xl">{crypto.symbol.charAt(0)}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{crypto.name}</h1>
                <p className="text-gray-500">{crypto.symbol}</p>
              </div>
            </div>

            {/* Price Info */}
            <Card>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <p className="text-gray-600 mb-1">Price</p>
                  <h2 className="text-4xl font-bold text-gray-900">
                    ${crypto.price.toLocaleString()}
                  </h2>
                  <p className={`text-lg font-medium mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{crypto.change.toFixed(2)}% today
                  </p>
                </div>
              </div>
              <PriceChart data={chartData} isPositive={isPositive} />
            </Card>

            {/* About */}
            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-4">About {crypto.name}</h3>
              <p className="text-gray-600 leading-relaxed">{crypto.description}</p>
            </Card>

            {/* Market Stats */}
            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Market Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Market Cap</span>
                  <span className="font-semibold">${(crypto.marketCap / 1e9).toFixed(2)}B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Volume (24h)</span>
                  <span className="font-semibold">${(crypto.volume / 1e9).toFixed(2)}B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Circulating Supply</span>
                  <span className="font-semibold">{crypto.symbol}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar - Buy/Sell */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Buy {crypto.symbol}</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {amount && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">You'll get</span>
                      <span className="font-semibold">
                        {(parseFloat(amount) / crypto.price).toFixed(8)} {crypto.symbol}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price</span>
                      <span>${crypto.price.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>

              <Button className="w-full mb-3">
                Buy {crypto.symbol}
              </Button>
              <Button variant="outline" className="w-full">
                Sell {crypto.symbol}
              </Button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Sign in to start trading
              </p>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AssetDetail;
