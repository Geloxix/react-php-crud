import { Link } from "react-router-dom";

import { RiArrowRightLine } from "@remixicon/react";

const HomePage = () => {
    return (
        <section className="h-screen flex items-center justify-center font-afacad-flux bg-black">
            <div className=" flex items-center justify-center flex-col">
                <h1 className="mb-4 text-white text-2xl">Welcome to my website!</h1>
                <button>
                    <Link to="/users" className="bg-white text-black px-3 py-1 rounded-md flex gap-2 hover:bg-opacity-80 transition-all ease-in-out">
                        Users <RiArrowRightLine color="black" />
                    </Link>
                </button>
            </div>
        </section>
    );
};

export default HomePage;
