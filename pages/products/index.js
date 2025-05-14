import Link from 'next/link';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
export default function Products({products}) {
  const { addToCart } = useCart();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">All Products</h1>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 rounded-lg mb-4">
                  {/* Image placeholder */}
                </div>
                <Link href={`/products/${product.id}`} className="block">
                  <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600">{product.name}</h3>
                </Link>
                
                <p className="mt-2 text-gray-900 font-medium">RS {product.price}</p>
                <div className="mt-4 space-y-2">
                  <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                    Add to Cart
                  </button>
                  <Link
                    href={`/products/${product.id}`}
                    className="block w-full text-center border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
export async function getStaticProps(){
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await axios.get(`${baseUrl}/api/products`);
  const products = res.data;
  if(!products){
    return {
      notFound: true,
    }
  }
  return {
    props: {
      products
    },
    revalidate: 60,
  }
}

    
