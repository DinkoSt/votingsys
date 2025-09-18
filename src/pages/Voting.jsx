// import React, { useEffect } from "react";
// import { Alert, Box, Button, Container, Divider, Paper, TextField, Typography } from "@mui/material";
// import { toast } from "react-toastify";

// const Voting = ({
//     voting,
//     account,
//     setLoading,
//     getChoices,
//     choices,
//     getBallotDetails,
//     ballot,
//     visible,
//     ended,
//     getCurrentState,
//     endVoting,
//     totalVote,
//     getTotalVotes,
//     checkIsVoter,
//     hasVoted,
//     isVoter,
//     state,
//     getVoters,
//     totalVoters,
//     setContract,
//     contract,
// }) => {
//     const doVote = async (val) => {
//         setLoading(true);
//         await voting.methods
//             .doVote(val)
//             .send({ from: account })
//             .on("error", (error) => {
//                 toast.error(error.message);
//             })
//             .on("receipt", (receipt) => {
//                 toast.success("Вотът е записан успешно.");
//                 checkIsVoter();
//                 getTotalVotes();
//             });
//         setLoading(false);
//     };

//     useEffect(() => {
//         if (ballot.name && contract) {
//             getChoices();
//             getTotalVotes();
//             checkIsVoter();
//             getCurrentState();
//             getVoters();
//         }
//     }, [getChoices, getTotalVotes, checkIsVoter, getCurrentState, getVoters, ballot, contract]);

//     return (
//         <Container>
//             <Box my={2}>
//                 <Paper>
//                     <Box py={1}>
//                         <Typography variant="h4" fontWeight="bold" textAlign="center">
//                             Гласуване
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
//                                             Адрес на 
//                                         </Typography>
//                                         <Typography>{ballot.address}</Typography>
//                                     </Box> */}
//                                 </Box>
//                             )}

//                             <Box>
//                                 <Button variant="contained" type="submit" fullWidth>
//                                    Зареди бюлетина
//                                 </Button>
//                             </Box>
//                         </form>
//                         <Box mt={2}>
//                             {state === 0 && <Alert severity="warning">Гласуването, все още, не е започнал.</Alert>}
//                             {state === 2 && (
//                                 <Alert severity="warning">Гласуването приключи. </Alert>
//                             )}
//                         </Box>
//                     </Box>
//                 </Paper>
//                 {visible && isVoter && (
//                     <Paper>
//                         <Box py={1}>
//                             <Typography variant="h4" fontWeight="bold" textAlign="center">
//                                 Запис на избора
//                             </Typography>
//                         </Box>
//                         <Divider />
//                         <Box margin={2} paddingY={2}>
//                             <Typography variant="h6">
//                                 {hasVoted
//                                     ? "Вече сте гласували."
//                                     : "Моля, изберете един от следните избори:"}
//                             </Typography>
//                             <Divider />
//                             <Box display="flex" justifyContent="space-around" my={3}>
//                                 {choices?.map((val, ind) => {
//                                     return (
//                                         <Box key={ind}>
//                                             <Button
//                                                 variant="outlined"
//                                                 color="primary"
//                                                 sx={{ padding: "2rem", borderRadius: "50%" }}
//                                                 onClick={() => doVote(val)}
//                                                 disabled={hasVoted}
//                                             >
//                                                 {val}
//                                             </Button>
//                                         </Box>
//                                     );
//                                 })}
//                             </Box>
//                             {totalVote !== 0 && (
//                                 <>
//                                     <Divider />
//                                     <Alert severity="success">
//                                         {totalVote} / {totalVoters} български граждани успешно са гласували.
//                                     </Alert>
//                                 </>
//                             )}
//                         </Box>
//                     </Paper>
//                 )}
//                 {ballot.name && ballot.address === account && state === 1 && (
//                     <Paper>
//                         <Box margin={2} paddingY={2}>
//                             {totalVote !== 0 && (
//                                 <>
//                                     <Divider />
//                                     <Alert severity="success">
//                                         {totalVote} / {totalVoters} български граждани успешно са гласували.
//                                     </Alert>
//                                 </>
//                             )}
//                             <Box mt={2}>
//                                 <Button
//                                     variant="contained"
//                                     type="submit"
//                                     color="secondary"
//                                     fullWidth
//                                     onClick={endVoting}
//                                     disabled={ended}
//                                 >
//                                     Край на гласуването
//                                 </Button>
//                             </Box>
//                         </Box>
//                     </Paper>
//                 )}
//             </Box>
//         </Container>
//     );
// };

// export default Voting;

import React, { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

const Voting = ({
  voting,
  account,
  setLoading,
  getChoices,
  choices,
  getBallotDetails,
  ballot,
  visible,
  ended,
  getCurrentState,
  endVoting,
  totalVote,
  getTotalVotes,
  checkIsVoter,
  hasVoted,
  isVoter,
  state,
  getVoters,
  totalVoters,
  setContract,
  contract,
}) => {
  const doVote = async (val) => {
    setLoading(true);
    await voting.methods
      .doVote(val)
      .send({ from: account })
      .on("error", (error) => {
        toast.error(error.message);
      })
      .on("receipt", () => {
        toast.success("Вотът е записан успешно.");
        checkIsVoter();
        getTotalVotes();
      });
    setLoading(false);
  };

  useEffect(() => {
    if (ballot.name && contract) {
      getChoices();
      getTotalVotes();
      checkIsVoter();
      getCurrentState();
      getVoters();
    }
  }, [
    getChoices,
    getTotalVotes,
    checkIsVoter,
    getCurrentState,
    getVoters,
    ballot,
    contract,
  ]);

  return (
    <Box
  sx={{
    minHeight: "100vh",
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.5)), url('/VoteImage.png')`,
     backgroundColor: `rgba(226, 226, 226, 0.98)`,
    backgroundBlendMode: "overlay",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    p: 4,
  }}
>
  <Container maxWidth="md">
    <Container
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Box>
        <Paper
          elevation={4}
          sx={{
            background: "linear-gradient(180deg, #e3f2fd, #ffffff)",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <Box py={2} sx={{ backgroundColor: "#1976d2", color: "white" }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center">
              Гласуване
            </Typography>
          </Box>
          <Divider />
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
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "&:hover fieldset": {
                        borderColor: "#1976d2",
                      },
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
              <Box>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: "12px",
                    backgroundColor: "#1976d2",
                    "&:hover": { backgroundColor: "#115293" },
                  }}
                >
                  Зареди бюлетина
                </Button>
              </Box>
            </form>
            <Box mt={2}>
              {state === 0 && (
                <Alert severity="warning">
                  Гласуването, все още, не е започнало.
                </Alert>
              )}
              {state === 2 && (
                <Alert severity="warning">Гласуването приключи.</Alert>
              )}
            </Box>
          </Box>
        </Paper>

        {visible && isVoter && (
          <Paper
            elevation={4}
            sx={{
              mt: 4,
              borderRadius: "20px",
              background: "linear-gradient(180deg, #bbdefb, #ffffff)",
            }}
          >
            <Box py={2} sx={{ backgroundColor: "#1976d2", color: "white" }}>
              <Typography variant="h4" fontWeight="bold" textAlign="center">
                Запис на избора
              </Typography>
            </Box>
            <Divider />
            <Box margin={3} paddingY={2}>
              <Typography variant="h6">
                {hasVoted
                  ? "Вече сте гласували."
                  : "Моля, изберете един от следните избори:"}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="center" gap={4} flexWrap="wrap">
                {choices?.map((val, ind) => {
                  return (
                    <Button
                      key={ind}
                      variant="outlined"
                      color="primary"
                      sx={{
                        padding: "2rem",
                        borderRadius: "50%",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        "&:hover": { backgroundColor: "#e3f2fd" },
                      }}
                      onClick={() => doVote(val)}
                      disabled={hasVoted}
                    >
                      {val}
                    </Button>
                  );
                })}
              </Box>
              {totalVote !== 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Alert severity="success">
                    {/* {totalVote} / {totalVoters} български граждани успешно са */}
                    {/* гласували. */}
                  </Alert>
                </>
              )}
            </Box>
          </Paper>
        )}

        {ballot.name && ballot.address === account && state === 1 && (
          <Paper
            elevation={4}
            sx={{
              mt: 4,
              borderRadius: "20px",
              background: "linear-gradient(180deg, #e3f2fd, #ffffff)",
            }}
          >
            <Box margin={3} paddingY={2}>
              {totalVote !== 0 && (
                <>
                  <Divider />
                  <Alert severity="success" sx={{ mt: 2 }}>
                    {/* {totalVote} / {totalVoters} български граждани успешно са */}
                    {/* гласували. */}
                  </Alert>
                </>
              )}
              <Box mt={3}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={endVoting}
                  disabled={ended}
                  sx={{
                    py: 1.5,
                    borderRadius: "12px",
                    backgroundColor: "#1565c0",
                    "&:hover": { backgroundColor: "#0d47a1" },
                  }}
                >
                  Край на гласуването
                </Button>
              </Box>
            </Box>
          </Paper>
        )}
      </Box>
    </Container>
     </Container>
</Box>
  );
};

export default Voting;

