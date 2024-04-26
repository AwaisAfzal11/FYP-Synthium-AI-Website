import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import { curve } from "../assets";
import Button from "./Button";

function Chose() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    // Redirect to localhost://5173/dashboard/chose/selectmodel
    navigate('/dashboard/chose/selectmodel');
  }

  return (
    <section className="pt-[12rem] -mt-[7.25rem]">
      <div>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <Header />

          <h1 className="h1 mb-6">
            {/* nbsp;AI&nbsp; */}
            Chose Your {` `}
            <span className="inline-block relative mt-10">
              Project{" "}
              {/* Rainbow Line below Synthium */}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>

          <p className="body-1 max-w-3xl mx-auto mb- text-n-2 lg:mb-8">
            Lets create a new Project!
          </p>

        </div>
      </div>

      <div className='mx-[50px] mt-[-30px] mb-[40px] flex flex-col  items-center border border-gray-300  rounded-lg rounded-tr-[30px] rounded-br-[0px] rounded-tl-[0px] rounded-bl-[30px] ' >
        <div className=" w-[90%]">
          <div className="w-full md:w-[100%] px-2 md:ml-[0%] flex flex-col items-center">
            <label htmlFor="projectName" className="body-2 my-6  text-n-1 block text-[33px] font-bold">Project Name</label>
            <input
              type="text"
              placeholder="Enter your Project Name"
              className="w-[100%] mt-[0px] mb-[40px] md:w-[50%] border border-gray-300 rounded-md px-3 py-2 bg-purple-500 text-white "
            />

           
          </div>

        </div>
        <Button onClick={handleButtonClick} white className="mb-[20px]">
          Continue
        </Button>
      </div>
    </section>

  );
}

export default Chose;
