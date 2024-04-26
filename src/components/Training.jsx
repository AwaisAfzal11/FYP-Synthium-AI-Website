import React, { useState } from 'react';
import { curve } from "../assets";
import Header from "./Header";
import { useNavigate } from 'react-router-dom';
import Button from "./Button";

function Training() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        // Redirect to localhost://5173/dashboard/chose/selectmodel
        navigate('/dashboard/chose/selectmodel/selectdata/training/quantity');
    }
    return (
        <section className="pt-[12rem] -mt-[7.25rem]">
            <div>
                <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
                    <Header />
                    <h1 className="h1 mb-6">
                        {/* nbsp;AI&nbsp; */}
                        {` `}
                        <span className="inline-block relative mt-10">
                            Model Training{" "}
                            {/* Rainbow Line below Synthium */}
                            <img src={curve} className="absolute top-full left-0 w-full xl:-mt-2" width={624} height={28} alt="Curve" />
                        </span>
                    </h1>
                    <p className="body-1 max-w-3xl mx-auto mb- text-n-2 lg:mb-8">
                        Be patient! This process may take few minutes depending on the complexity!
                    </p>
                </div>
            </div>

            <div className="mx-[50px] mt-[-30px] mb-[40px] flex flex-col  border-gray-300 border rounded-lg rounded-tr-[30px] rounded-br-[0px] rounded-tl-[0px] rounded-bl-[30px]">
                <h1 className='p-5'>Loading please wait!</h1>
                <div className="flex justify-center">
                    <Button onClick={handleButtonClick} white className="w-[10%] mt-[10px] mb-[10px]">
                        Continue
                    </Button>
                </div>

            </div>

        </section>

    )
}

export default Training