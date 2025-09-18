// import React, { useEffect, useState } from "react";
// import { Alert, Button, Divider, Paper, TextField, Typography } from "@mui/material";
// import { Box, Container } from "@mui/system";

// const Result = ({
//     voting,
//     setLoading,
//     getBallotDetails,
//     state,
//     ballot,
//     choices,
//     getChoices,
//     getCurrentState,
//     contract,
//     setContract,
// }) => {
//     const [result, setResult] = useState([]);

//     const getResult = async (choice) => {
//         const vote = await voting.methods.getVote(choice).call();
//         return parseInt(vote);
//     };

//     const getAllResult = async () => {
//         setLoading(true);
//         let votes = [];
//         for (let i = 0; i < choices.length; i++) {
//             const ele = choices[i];
//             const res = await getResult(ele);
//             votes.push({ name: ele, vote: res });
//         }
//         setResult(votes);
//         setLoading(false);
//     };

//     useEffect(() => {
//         if (contract && ballot.address) {
//             getChoices();
//             getCurrentState();
//         }
//     }, [getChoices, ballot, contract, getCurrentState]);

//     return (
//         <Container>
//             <Box my={2}>
//                 <Paper>
//                     <Box py={1}>
//                         <Typography variant="h4" fontWeight="bold" textAlign="center">
//                            Резултати от гласуването
//                         </Typography>
//                     </Box>
//                     <Divider />
//                     <Box margin={2} paddingY={2}>
//                         <form onSubmit={getBallotDetails}>
//                             <Box my={2}>
//                                 <TextField
//                                     value={contract}
//                                     name="name"
//                                     id="outlined-basic"
//                                     label="Адрес на бюлетината"
//                                     variant="outlined"
//                                     onChange={(e) => setContract(e.target.value)}
//                                     fullWidth
//                                 />
//                             </Box>
//                             {ballot.name && ballot.address && ballot.proposal && (
//                                 <Box my={2} display="flex" justifyContent="space-between">
//                                     <Box>
//                                         <Typography variant="h6" fontWeight="bold">
//                                             Име на бюлетината
//                                         </Typography>
//                                         <Typography>{ballot.name}</Typography>
//                                     </Box>
//                                     <Box>
//                                         <Typography variant="h6" fontWeight="bold">
//                                             Предложение
//                                         </Typography>
//                                         <Typography>{ballot.proposal}</Typography>
//                                     </Box>
//                                     {/* <Box>
//                                         <Typography variant="h6" fontWeight="bold">
//                                             Ballot Address
//                                         </Typography>
//                                         <Typography>{ballot.address}</Typography>
//                                     </Box> */}
//                                 </Box>
//                             )}
//                             {state === 1 && (
//                                 <Box mb={2}>
//                                     <Alert severity="warning">Гласуването все още не е започнало.</Alert>
//                                 </Box>
//                             )}
//                             <Box>
//                                 <Button variant="contained" type="submit" fullWidth>
//                                     Провери резултатите
//                                 </Button>
//                             </Box>
//                         </form>
//                     </Box>
//                 </Paper>

//                 {state === 2 && (
//                     <Paper>
//                         <Box padding={2} pb={0}>
//                             <Box py={1}>
//                                 <Typography variant="h4" fontWeight="bold" textAlign="center">
//                                     Резултати
//                                 </Typography>
//                             </Box>
//                             <Box py={2}>
//                                 <Button variant="contained" type="submit" fullWidth onClick={getAllResult}>
//                                     Провери резултатите
//                                 </Button>
//                             </Box>
//                             {result?.length !== 0 && (
//                                 <>
//                                     <Divider />
//                                     <Box margin={2} paddingY={2} display="flex" justifyContent="space-between">
//                                         {result.map((val, ind) => {
//                                             return (
//                                                 <Box key={ind}>
//                                                     <Typography variant="h6" fontWeight="bold">
//                                                         {val?.name}
//                                                     </Typography>
//                                                     <Typography>{val?.vote}</Typography>
//                                                 </Box>
//                                             );
//                                         })}
//                                     </Box>
//                                 </>
//                             )}
//                         </Box>
//                     </Paper>
//                 )}
//             </Box>
//         </Container>
//     );
// };

// export default Result;


import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";

const Result = ({
  voting,
  setLoading,
  getBallotDetails,
  state,
  ballot,
  choices,
  getChoices,
  getCurrentState,
  contract,
  setContract,
}) => {
  const [result, setResult] = useState([]);

  const getResult = async (choice) => {
    const vote = await voting.methods.getVote(choice).call();
    return parseInt(vote);
  };

  const getAllResult = async () => {
    setLoading(true);
    let votes = [];
    for (let i = 0; i < choices.length; i++) {
      const ele = choices[i];
      const res = await getResult(ele);
      votes.push({ name: ele, vote: res });
    }
    setResult(votes);
    setLoading(false);
  };

  useEffect(() => {
    if (contract && ballot.address) {
      getChoices();
      getCurrentState();
    }
  }, [getChoices, ballot, contract, getCurrentState]);

  return (
     <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.5)), url('/Vote4.png')`,
         backgroundColor: `rgba(245, 242, 242, 0.89)`,
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        p: 4,
      }}
    >
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        // minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
        py: 4,
      }}
    >
      <Box width="100%" maxWidth="800px">
       {/* Целият Paper */}
<Paper
  elevation={4}
  sx={{
    background: "linear-gradient(180deg, #e3f2fd, #ffffff)",
    borderRadius: "20px",
    overflow: "hidden",
  }}
>
  {/* Заглавие */}
  <Box py={2} sx={{ backgroundColor: "#1976d2", color: "white" }}>
    <Typography variant="h4" fontWeight="bold" textAlign="center">
      Резултати от гласуването
    </Typography>
  </Box>
  <Divider />

  {/* Форма */}
  <Box margin={3} paddingY={2}>
    <form onSubmit={getBallotDetails}>
      <Box my={2}>
        <TextField
          value={contract}
          name="name"
          id="outlined-basic"
          label="Адрес на бюлетината"
          variant="outlined"
          onChange={(e) => setContract(e.target.value)}
          fullWidth
          sx={{
            "& label": {
              color: "#1565c0",
              fontWeight: "bold",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              "& fieldset": { borderColor: "#1976d2" },
              "&:hover fieldset": { borderColor: "#0d47a1" },
            },
          }}
        />
      </Box>

      {ballot.name && ballot.address && ballot.proposal && (
        <Box
          my={2}
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
        >
          <Box>
            <Typography variant="h6" fontWeight="bold" color="primary">
              Име на бюлетината
            </Typography>
            <Typography>{ballot.name}</Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" color="primary">
              Предложение
            </Typography>
            <Typography>{ballot.proposal}</Typography>
          </Box>
        </Box>
      )}

      {state === 1 && (
        <Box mb={2}>
          <Alert severity="warning">
            Гласуването все още не е започнало.
          </Alert>
        </Box>
      )}

      <Box>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          onClick={getAllResult}
          sx={{
            py: 1.5,
            borderRadius: "12px",
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#115293" },
          }}
        >
          Провери резултатите
        </Button>
      </Box>
    </form>
  </Box>

  {/* Резултати вътре в същия Paper */}
  {state === 2 && result?.length !== 0 && (
    <>
      <Divider sx={{ my: 2 }} />
      <Box margin={3} paddingY={2}>
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          color="primary"
          gutterBottom
        >
          Резултати
        </Typography>
        <Box
          display="flex"
          justifyContent="space-around"
          flexWrap="wrap"
          gap={4}
        >
          {result.map((val, ind) => (
            <Box
              key={ind}
              sx={{
                textAlign: "center",
                px: 2,
                py: 1,
                backgroundColor: "#e3f2fd",
                borderRadius: "12px",
                minWidth: "120px",
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="primary">
                {val?.name}
              </Typography>
              <Typography fontSize="1.2rem">{val?.vote}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )}
</Paper>

        
      </Box>
    </Container>
    </Box>
  );
};

export default Result;
