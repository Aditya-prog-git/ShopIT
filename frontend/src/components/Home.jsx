import { useEffect } from "react";
import { useGetProductsQuery } from "../redux/api/productsApi";
import Loader from "./layout/Loader";
import MetaData from "./layout/MetaData";
import ProductItem from "./product/ProductItem";
import toast from "react-hot-toast";

const Home = () => {
  const { data, isLoading, error, isError } = useGetProductsQuery();

  useEffect(() => {
    if(isError){
      toast.error(error?.data?.message);
    }
  }, [isError])

  if(isLoading) return <Loader />
  return (
    <>
      <MetaData title={"Buy Best Products Online"} />
      <div className="row">
        <div className="col-12 col-sm-6 col-md-12">
          <h1 id="products_heading" className="text-secondary">Latest Products</h1>

          <section id="products" className="mt-5">
            <div className="row">
              {/* <!-- Product Item 1 --> */}
              {data?.products?.map((product) => (
                <ProductItem product={product} />
              ))}
              {/* <!-- End Product Item 1 --> */}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Home
