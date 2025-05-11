import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import axios from 'axios';
export default function ProductDetail({ product }) {
  

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Product not found</h1>
            <Link href="/products" className="mt-4 inline-block text-blue-600 hover:text-blue-500">
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/products" className="text-blue-600 hover:text-blue-500">
            ← Back to Products
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 rounded-lg">
              {/* Image placeholder */}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              {/* <p className="mt-2 text-sm text-gray-500">{product.category}</p> */}
              <p className="mt-4 text-2xl font-bold text-gray-900">RS {product.price}</p>
              
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">Description</h2>
                <p className="mt-2 text-gray-600">{product.description}</p>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">Specifications</h2>
                <p className="mt-2 text-gray-600">{product.specification}</p>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">Features</h2>
                <ul className="mt-2 list-disc list-inside text-gray-600">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 space-y-4">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
export async function getStaticPaths() {
  const res = await axios.get('http://localhost:3000/api/products');
  const products = res.data;
  const paths = products.map((product) => ({
    params: { id: String(product.id) },
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const { id } = params;
  const res = await axios.get('http://localhost:3000/api/products');
  const products = res.data;
  const product = products.find((product) => product.id === Number(id));
  return {
    props: { product },
  };
}
