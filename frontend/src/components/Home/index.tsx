import HomeProducts from "../ProductCard/";
import HomeCarousel from "./Carousel";

const Home = () => {
    return (
        <div className='w-full '>
            <HomeCarousel />
            <HomeProducts />
        </div>
    );
};

export default Home;
