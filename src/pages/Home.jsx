import { Box } from "@mui/material";
import React from "react";
import { useAuth } from "./auth/AuthContext";

// const Home = () => {
//     return (
//         <Box className="home" display="flex" width="100%" alignItems="center" justifyContent="center">
//             <Box className="wrapper">
//                 <Box className="glow" data-text="Glow">
//                     {/* Web3.0 Voting Appaaaa */}
//                 </Box>
//                 {/* <Box className="glow-shadow" aria-hidden="true">
//                     Welcome
//                 </Box> */}
//             </Box>
//         </Box>
//     );
// };
const Home = () => {
  const { creator } = useAuth();
  console.log(creator);
  return (
    <Box
      className="home"
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      minHeight="100vh" // центрира по цялата височина на екрана
    >
      <Box className="wrapper">
        <Box className="glow" data-text="Glow">
          Сигурност. Децентрализация. Блокчейн.
        </Box>
        <Box
          className="link-section"
          display="flex"
          justifyContent="center"
          gap="2rem"
          flexWrap="wrap"
          mt={10}
        >
          <Box className="link-box" component="a" href="/voting">
            Гласувай
          </Box>
          {creator &
          (
            <Box className="link-box" component="a" href="/ballot">
              Създаване на избори
            </Box>
          )}
          <Box className="link-box" component="a" href="/result">
            Преглед на резултати
          </Box>
           <Box className="link-box" component="a" href="/transactions">
            Провери глас
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
