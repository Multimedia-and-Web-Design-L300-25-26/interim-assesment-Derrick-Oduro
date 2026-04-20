import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import { useAuth } from '../context/AuthContext';
import { cryptoApi } from '../services/api';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [cryptoForm, setCryptoForm] = useState({
    name: '',
    symbol: '',
    price: '',
    image: '',
    change24h: '',
  });
  const [createStatus, setCreateStatus] = useState({
    loading: false,
    error: '',
    success: '',
  });

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  };

  const handleCryptoFormChange = (event) => {
    const { name, value } = event.target;
    setCryptoForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCreateCrypto = async (event) => {
    event.preventDefault();

    try {
      setCreateStatus({ loading: true, error: '', success: '' });

      const payload = {
        ...cryptoForm,
        price: Number(cryptoForm.price),
        change24h: Number(cryptoForm.change24h),
      };

      const response = await cryptoApi.create(payload);

      setCreateStatus({
        loading: false,
        error: '',
        success: `${response.crypto.name} was added successfully.`,
      });

      setCryptoForm({
        name: '',
        symbol: '',
        price: '',
        image: '',
        change24h: '',
      });
    } catch (error) {
      setCreateStatus({
        loading: false,
        error: error.message || 'Failed to create cryptocurrency.',
        success: '',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
        <p className="text-gray-600 mb-8">
          This page is protected and only visible when you are authenticated.
        </p>

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <div>
            <p className="text-sm text-gray-500 mb-1">Full name</p>
            <p className="text-lg font-semibold text-gray-900">{user?.name || '-'}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="text-lg font-semibold text-gray-900">{user?.email || '-'}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Account created</p>
            <p className="text-lg font-semibold text-gray-900">
              {user?.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}
            </p>
          </div>

          <div className="pt-2">
            <Button type="button" onClick={handleLogout} className="w-full sm:w-auto">
              Sign out
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Add New Cryptocurrency</h2>
          <p className="text-gray-600 mb-6">
            This form submits to the protected POST crypto endpoint.
          </p>

          <form onSubmit={handleCreateCrypto} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                name="name"
                value={cryptoForm.name}
                onChange={handleCryptoFormChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Bitcoin"
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Symbol</label>
              <input
                name="symbol"
                value={cryptoForm.symbol}
                onChange={handleCryptoFormChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="BTC"
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                name="price"
                type="number"
                step="0.0001"
                min="0"
                value={cryptoForm.price}
                onChange={handleCryptoFormChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="43250.5"
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">24h Change (%)</label>
              <input
                name="change24h"
                type="number"
                step="0.01"
                value={cryptoForm.change24h}
                onChange={handleCryptoFormChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2.34"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                name="image"
                type="url"
                value={cryptoForm.image}
                onChange={handleCryptoFormChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://cryptoicons.org/api/icon/btc/200"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <Button
                type="submit"
                disabled={createStatus.loading}
                className="w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {createStatus.loading ? 'Adding asset...' : 'Add cryptocurrency'}
              </Button>
            </div>

            {createStatus.error && (
              <p className="sm:col-span-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {createStatus.error}
              </p>
            )}

            {createStatus.success && (
              <p className="sm:col-span-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                {createStatus.success}
              </p>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
