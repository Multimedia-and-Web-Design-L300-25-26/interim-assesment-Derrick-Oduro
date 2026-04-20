import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { cryptoApi } from '../services/api';

const Explore = () => {
  const [cryptos, setCryptos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [timeframe, setTimeframe] = useState('1D');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let mounted = true;

    const fetchCryptos = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');
        const data = await cryptoApi.getAll();

        if (mounted) {
          setCryptos(data.cryptos || []);
        }
      } catch (error) {
        if (mounted) {
          setErrorMessage(error.message || 'Failed to load market data.');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCryptos();

    return () => {
      mounted = false;
    };
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredCryptos = cryptos
    .filter((crypto) => {
      if (!normalizedQuery) {
        return true;
      }

      return (
        crypto.name.toLowerCase().includes(normalizedQuery) ||
        crypto.symbol.toLowerCase().includes(normalizedQuery)
      );
    })
    .filter((crypto) => {
      if (filter === 'gainers') {
        return crypto.change >= 0;
      }

      return true;
    })
    .sort((a, b) => {
      if (filter === 'gainers') {
        return b.change - a.change;
      }

      return 0;
    });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore crypto</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Coinbase 50 Index is</span>
            <span className="text-green-600 font-semibold">up 3.93%</span>
            <span className="text-gray-500">(24hrs)</span>
          </div>
        </div>

        {/* Market Stats */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Market stats</h2>
          <p className="text-gray-600 mb-6">
            The overall crypto market is growing this week. As of today, the total crypto market capitalization is 24.68 trillion, 
            representing a 5.62% increase from last week.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Total market cap</div>
              <div className="text-2xl font-bold text-gray-900">$2.1T</div>
              <div className="text-sm text-green-600 mt-1">+5.62%</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Trade volume</div>
              <div className="text-2xl font-bold text-gray-900">$95B</div>
              <div className="text-sm text-green-600 mt-1">+12%</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Buy-sell ratio</div>
              <div className="text-2xl font-bold text-gray-900">56/44</div>
              <div className="text-sm text-gray-600 mt-1">More buying</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">BTC dominance</div>
              <div className="text-2xl font-bold text-gray-900">47.2%</div>
              <div className="text-sm text-red-600 mt-1">-0.3%</div>
            </div>
          </div>
        </div>

        {/* Crypto Table */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Crypto market prices</h2>
              <p className="text-sm text-gray-600">{cryptos.length} assets</p>
            </div>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All assets</option>
                <option value="tradable">Tradable</option>
                <option value="gainers">Top gainers</option>
              </select>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1D">1D</option>
                <option value="1W">1W</option>
                <option value="1M">1M</option>
                <option value="1Y">1Y</option>
              </select>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Asset</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Price</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Change (24h)</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Market Cap</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCryptos.map((crypto) => {
                  const isPositive = crypto.change >= 0;
                  return (
                    <tr key={crypto.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <Link to={`/asset/${crypto.id}`} className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${crypto.color} flex items-center justify-center shrink-0`}>
                            <span className="text-white font-bold">{crypto.symbol.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{crypto.name}</div>
                            <div className="text-sm text-gray-500">{crypto.symbol}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="py-4 px-4 text-right font-semibold text-gray-900">
                        ${crypto.price.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {isPositive ? '+' : ''}{crypto.change.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right text-gray-600">
                        {crypto.marketCap > 0 ? `$${(crypto.marketCap / 1e9).toFixed(2)}B` : 'N/A'}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Link to={`/asset/${crypto.id}`}>
                          <Button size="sm" variant="outline" className="rounded-md">
                            Trade
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Loading cryptocurrencies...</p>
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">{errorMessage}</p>
            </div>
          )}

          {!isLoading && !errorMessage && filteredCryptos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No cryptocurrencies found</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Create a Coinbase account to trade crypto
          </h3>
          <p className="mb-6 text-blue-100">It's quick, easy, and secure.</p>
          <Link to="/signup">
            <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100 rounded-md">
              Start Trading
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Explore;
