// import React, { useMemo, useState } from "react";
// import { FormattedMessage } from "react-intl";
// import { TypeAnimation } from "react-type-animation";

// const ServiceOptions = ({ data }) => {
//   const [open, setOpen] = useState(false);

//   const typingList = useMemo(() => {
//     return data.reduce((acc, curr) => {
//       const text = `${curr?.judul}`;
//       return [...acc, text, 1000];
//     }, []);
//   }, [data]);

//   return (
//     <React.Fragment>
//       <div className="hidden gap-2 md:grid md:grid-cols-4">
//         {data.map((item, index) => {
//           let url;
//           if (item.icon?.data) {
//             url = `${process.env.API_URL}${item.icon.data.attributes.url}`;
//           }
//           return (
//             <a
//               href={item.url}
//               key={index}
//               className="flex h-16 rounded-md bg-purple p-3"
//             >
//               <div className="flex w-full flex-row items-center justify-start">
//                 {url && (
//                   <img
//                     loading="lazy"
//                     src={url}
//                     height={36}
//                     width={36}
//                     className="mx-3"
//                     alt={item.judul}
//                   />
//                 )}
//                 <p className="text-sm font-bold text-white">{item.judul}</p>
//               </div>
//             </a>
//           );
//         })}
//       </div>
//       <div className="relative z-40 md:hidden">
//         <button
//           onClick={() => setOpen(!open)}
//           className="focus:shadow-outline text-md mt-2 flex w-full flex-row items-center justify-between rounded-lg bg-transparent p-4 py-3 text-left text-center font-semibold focus:outline-none md:mt-0 md:ml-4 md:inline md:w-auto"
//         >
//           <div className="flex w-full flex-col">
//             <span className="self-center">
//               <FormattedMessage
//                 id="i_want_to_access"
//                 defaultMessage={"Saya ingin mengakses"}
//               />
//             </span>
//             <TypeAnimation
//               className="font-bold text-purple"
//               sequence={typingList}
//               speed={50} // Custom Speed from 1-99 - Default Speed: 40
//               wrapper="span" // Animation will be rendered as a <span>
//               repeat={Infinity} // Repeat this Animation Sequence infinitely
//             />
//           </div>
//           <svg
//             fill="#670075"
//             viewBox="0 0 20 20"
//             className={`mt-1 ml-1 inline h-7 w-7 transform transition-transform duration-200 md:-mt-1 ${
//               open ? "rotate-180" : "rotate-0"
//             }`}
//           >
//             <path
//               fillRule="evenodd"
//               d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//               clipRule="evenodd"
//             ></path>
//           </svg>
//         </button>
//         <div
//           className={`absolute right-0 mt-2 w-full origin-top-right overflow-hidden rounded-md bg-white shadow-lg md:w-48 ${
//             open ? "block" : "hidden"
//           }`}
//         >
//           {data.map((item, index) => {
//             let url;
//             if (item.icon?.data) {
//               url = `${process.env.API_URL}${item.icon.data.attributes.url}`;
//             }
//             return (
//               <a
//                 href={item.url}
//                 key={index}
//                 className="focus:shadow-outline mt-1 block flex flex-row items-center bg-transparent px-4 py-2 text-sm font-semibold hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none md:mt-0"
//               >
//                 {url && (
//                   <img
//                     loading="lazy"
//                     src={url}
//                     width={28}
//                     height={28}
//                     className="mr-2"
//                     alt={item.judul}
//                   />
//                 )}
//                 {item.judul}
//               </a>
//             );
//           })}
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default ServiceOptions;

import React, { useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import { TypeAnimation } from "react-type-animation";

// Import icons
import DataAuditorIcon from "../assets/images/data_auditor.svg";
import DataLembagaIcon from "../assets/images/data_lembaga.svg";
import DataLhlnIcon from "../assets/images/data_lhln.svg";
import DataLp3hIcon from "../assets/images/data_lp3h.svg";
import DataP3hIcon from "../assets/images/data_p3h.svg";
import DataPenyeliaIcon from "../assets/images/data_penyelia.svg";
import DataRphIcon from "../assets/images/data_rph.svg";
import DataLphIcon from "../assets/images/data_lph.svg";

const ServiceOptions = ({ data }) => {
  const [open, setOpen] = useState(false);

  const typingList = useMemo(
    () => data.reduce((acc, curr) => [...acc, curr?.judul, 1000], []),
    [data]
  );

  const menu = useMemo(
    () => [
      { icon: DataLphIcon, name: "Data LPH", url: "/search/data_lph" },
      { icon: DataLp3hIcon, name: "Data LP3H", url: "/search/data_lp3h" },
      { icon: DataLhlnIcon, name: "Data LHLN", url: "/datalhln" },
      {
        icon: DataPenyeliaIcon,
        name: "Data Penyelia Halal",
        url: "/search/data_penyelia",
      },
      {
        icon: DataAuditorIcon,
        name: "Data Auditor Halal",
        url: "/search/data_auditor",
      },
      { icon: DataP3hIcon, name: "Data P3H", url: "/search/data_p3h" },
      {
        icon: DataLembagaIcon,
        name: "Data Lembaga Pelatihan",
        url: "/search/data_lembaga_pelatihan",
      },
      {
        icon: DataRphIcon,
        name: "Data RPH/RPU Halal",
        url: "/search/data_rph",
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="hidden gap-2 md:grid md:grid-cols-4">
        {menu.map(({ icon: Icon, name, url }, index) => (
          <a
            href={url}
            key={index}
            className="flex h-16 rounded-md bg-purple p-3"
          >
            <div className="flex w-full flex-row items-center">
              <img
                loading="lazy"
                src={Icon}
                height={36}
                width={36}
                className="mx-3"
                alt={name}
              />
              <p className="text-sm font-bold text-white">{name}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="relative z-40 md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="focus:shadow-outline text-md mt-2 flex w-full justify-between rounded-lg bg-transparent p-4 py-3 font-semibold focus:outline-none"
        >
          <div className="flex w-full flex-col">
            <span className="self-center">
              <FormattedMessage
                id="i_want_to_access"
                defaultMessage="Saya ingin mengakses"
              />
            </span>
            <TypeAnimation
              className="font-bold text-purple"
              sequence={typingList}
              speed={50}
              wrapper="span"
              repeat={Infinity}
            />
          </div>
          <svg
            fill="#670075"
            viewBox="0 0 20 20"
            className={`mt-1 ml-1 inline h-7 w-7 transform transition-transform duration-200 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div
          className={`absolute right-0 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg md:w-48 ${
            open ? "block" : "hidden"
          }`}
        >
          {menu.map(({ icon: Icon, name, url }, index) => (
            <a
              href={url}
              key={index}
              className="flex items-center px-4 py-2 text-sm font-semibold hover:bg-gray-200"
            >
              <img
                loading="lazy"
                src={Icon}
                width={28}
                height={28}
                className="mr-2"
                alt={name}
              />
              {name}
            </a>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ServiceOptions;
