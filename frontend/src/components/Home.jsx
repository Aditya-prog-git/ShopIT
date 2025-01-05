import { useEffect } from "react";
import { useGetProductsQuery } from "../redux/api/productsApi";
import Loader from "./layout/Loader";
import MetaData from "./layout/MetaData";
import ProductItem from "./product/ProductItem";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";
import Filters from "./layout/Filters";

const Home = () => {

  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");

  const params = { page, keyword };

  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);
  ratings !== null && (params.ratings = ratings);

  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  const columnSize = keyword ? 4 : 3

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
        {keyword && (
          <div className="col-6 col-md-3 mt-5">
            <Filters />
          </div>
        )}
        <div className={keyword? "col-12 col-sm-6 col-md-9" : "col-12 col-sm-6 col-md-12"}>
          <h1 id="products_heading" className="text-secondary">{keyword ? `${data?.products?.length} Products found with keyword: ${keyword}` : "Latest Products"}</h1>

          <section id="products" className="mt-5">
            <div className="row">
              {/* <!-- Product Item 1 --> */}
              {data?.products?.map((product) => (
                <ProductItem product={product} columnSize={columnSize} />
              ))}
              {/* <!-- End Product Item 1 --> */}
            </div>
          </section>

          <CustomPagination resPerPage={data?.resPerPage} filteredProductsCount={data?.filteredProducts} />
        </div>
      </div>
    </>
  )
}

export default Home
