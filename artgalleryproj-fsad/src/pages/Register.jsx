35
  import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await axios.post('https://artgallery-htya.onrender.com/user/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      });

      if (response.status === 201 || response.status === 200) {
        toast.success('Registration successful!');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error registering user.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("/images/login-bg.jpg")' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="max-w-2xl w-full mx-4 relative z-10">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="px-8 py-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h2>
              <p className="text-gray-600">Join our art community today</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="block w-full px-3 py-2 border border-border-color rounded-md text-text bg-card-bg"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-paragraph mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="block w-full px-3 py-2 border border-border-color rounded-md text-text bg-card-bg"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-paragraph mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="block w-full px-3 py-2 border border-border-color rounded-md text-text bg-card-bg"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-paragraph mb-1">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="block w-full px-3 py-2 border border-border-color rounded-md text-text bg-card-bg"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="password" className="block text-sm font-medium text-paragraph mb-1">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="block w-full px-3 py-2 border border-border-color rounded-md text-text bg-card-bg"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="block w-full px-3 py-2 border border-border-color rounded-md text-text bg-card-bg"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="country" className="block text-sm font-medium text-paragraph mb-1">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-accent-color border-border-color rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-paragraph">
                  I agree to the{' '}
                  <Link to="/terms" className="text-accent-color hover:text-accent-color/80">
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-button-primary hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-color"
                >
                  Register
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-paragraph">
                  Already have an account?{' '}
                  <Link to="/login" className="text-accent-color hover:text-accent-color/80">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
