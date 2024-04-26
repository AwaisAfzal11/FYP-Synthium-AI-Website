import { useNavigate, useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
// for designing
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  const handleLogoClick = () => {
    navigate("/");
  }; 

  const handleNavItemClick = (url) => {
    navigate(url);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
        }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8 cursor-pointer" onClick={handleLogoClick}>
          <img src={brainwave} width={190} height={40} alt="synthium ai" />
        </a>

        <nav
          className={`${openNavigation ? "flex" : "hidden"
            } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                onClick={() => handleNavItemClick(item.url)}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""
                  } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                  } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        <a
          href="/signup"
          className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        >
          Create An Account
        </a>
        <Button className="hidden lg:flex" href="/login">
          Login To Console
        </Button>

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
        
      </div>
    </div>
  );
};

export default Header;



// When i add the funtionality that when i click on synthium logo it should point me to localhost://5173/ =| basically above code 
// import { useLocation } from "react-router-dom";
// import { disablePageScroll, enablePageScroll } from "scroll-lock";

// import { brainwave } from "../assets";
// import { navigation } from "../constants";
// import Button from "./Button";
// // for designing
// import MenuSvg from "../assets/svg/MenuSvg";
// import { HamburgerMenu } from "./design/Header";
// import { useState } from "react";

// const Header = () => {
//   const pathname = useLocation();
//   const [openNavigation, setOpenNavigation] = useState(false);

//   const toggleNavigation = () => {
//     if (openNavigation) {
//       setOpenNavigation(false);
//       enablePageScroll();
//     } else {
//       setOpenNavigation(true);
//       disablePageScroll();
//     }
//   };

//   const handleClick = () => {
//     if (!openNavigation) return;

//     enablePageScroll();
//     setOpenNavigation(false);
//   };

//   return (
//     <div
//       className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
//         }`}
//     >
//       {/* Brainwave logo, use synthetic data logo */}
//       {/* Brainwave logo, use synthetic data logo */}
//       {/* Brainwave logo, use synthetic data logo */}
//       <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
//         <a className="block w-[12rem] xl:mr-8" href="#hero">
//           <img src={brainwave} width={190} height={40} alt="synthium ai" />
//           {/* <p>SDG</p> */}
//         </a>

//         {/* Navbare code  */}
//         <nav
//           className={`${openNavigation ? "flex" : "hidden"
//             } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
//         >
//           <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
//             {/* index.js */}
//             {/* index.js */}
//             {/* index.js */}
//             {/* Navigation mapping with index.js */}
//             {navigation.map((item) => (
//               <a
//                 key={item.id}
//                 href={item.url}
//                 onClick={handleClick}
//                 className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""
//                   } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${item.url === pathname.hash
//                     ? "z-2 lg:text-n-1"
//                     : "lg:text-n-1/50"
//                   } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
//               >
//                 {item.title}
//               </a>
//             ))}
//           </div>

//           <HamburgerMenu />
//         </nav>
//         {/* Navbare code ends here */}


//         <a
//           href="#signup"
//           className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
//         >
//           New account
//         </a>
//         <Button className="hidden lg:flex" href="#login">
//           Sign in
//         </Button>

//         {/* For small screens  */}
//         <Button
//           className="ml-auto lg:hidden"
//           px="px-3"
//           onClick={toggleNavigation}
//         >
//           <MenuSvg openNavigation={openNavigation} />
//         </Button>
//         {/*End For small screens  */}
        
//       </div>
//     </div>
//   );
// };

// export default Header;
