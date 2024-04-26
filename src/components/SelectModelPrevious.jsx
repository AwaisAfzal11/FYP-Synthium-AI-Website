import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import { curve } from "../assets";
import Button from "./Button";

function SelectModel() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        // Redirect to localhost://5173/dashboard/chose/selectmodel/selectdata
        navigate('/dashboard/chose/selectmodel/selectdata');
    }
    return (
        <section className="pt-[12rem] -mt-[7.25rem]">
            <div>
                <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
                    <Header />
                    <h1 className="h1 mb-6">
                        {/* nbsp;AI&nbsp; */}
                        Select a {` `}
                        <span className="inline-block relative mt-10">
                            Model{" "}
                            {/* Rainbow Line below Synthium */}
                            <img src={curve} className="absolute top-full left-0 w-full xl:-mt-2" width={624} height={28} alt="Curve" />
                        </span>
                    </h1>
                    <p className="body-1 max-w-3xl mx-auto mb- text-n-2 lg:mb-8">
                        Chose a Synthium Model for your usecase!
                    </p>
                </div>
            </div>

            {/* for all models  */}
            <div className="mx-[50px] mt-[-30px] mb-[40px] flex flex-col  border-gray-300 border rounded-lg rounded-tr-[30px] rounded-br-[0px] rounded-tl-[0px] rounded-bl-[30px]">
                <button className="border-purple-500 border-2 text-left mt-4 hover hover:bg-purple-500 mx-[30px] my-[10px] p-[10px]">
                    <h2 className="text-xl font-bold">CT-GAN</h2>
                    <p className="text-sm">AI model for tabular data synthesis.</p>
                </button>
                <button className="border-purple-500 border-2 text-left mt-4  mx-[30px] my-[10px] p-[10px] hover hover:bg-purple-500">
                    <h2 className="text-xl font-bold">DGAN</h2>
                    <p className="text-sm">AI model for time-series data synthesis</p>
                </button>

                <div className="flex justify-center">
                    <Button onClick={handleButtonClick} white className="w-[10%] mt-[10px] mb-[10px]">
                        Continue
                    </Button>
                </div>
                
            </div>


        </section>

    )
}
export default SelectModel