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
    >
      <Box className="wrapper">
        <Box className="glow" data-text="Glow">
          {/* Your Choice Matters */}
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
            Vote
          </Box>
          {creator &
          (
            <Box className="link-box" component="a" href="/ballot">
              Create Ballot
            </Box>
          )}
          <Box className="link-box" component="a" href="/result">
            Result
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
