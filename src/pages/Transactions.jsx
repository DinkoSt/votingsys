// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Paper,
//   Typography,
//   Divider,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
// } from "@mui/material";

// const Transactions = ({ voting }) => {
//   const [events, setEvents] = useState([]);

//   const loadEvents = async () => {
//     try {
//       const pastEvents = await voting.getPastEvents("allEvents", {
//         fromBlock: 0,
//         toBlock: "latest",
//       });

//       const formatted = pastEvents.map((ev, idx) => ({
//         id: idx + 1,
//         name: ev.event,
//         returnValues: JSON.stringify(ev.returnValues),
//         txHash: ev.transactionHash,
//         block: ev.blockNumber,
//       }));

//       setEvents(formatted);
//     } catch (err) {
//       console.error("Грешка при зареждане на event-и:", err);
//     }
//   };

//   useEffect(() => {
//     if (voting) {
//       loadEvents();
//     }
//   }, [voting]);

//   return (
//     <Container>
//       <Paper sx={{ p: 2, mt: 2 }}>
//         <Typography variant="h4" textAlign="center" fontWeight="bold">
//           История на транзакциите
//         </Typography>
//         <Divider sx={{ my: 2 }} />

//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><b>#</b></TableCell>
//               <TableCell><b>Event</b></TableCell>
//               <TableCell><b>Transaction Hash</b></TableCell>
//               <TableCell><b>Block</b></TableCell>
//               <TableCell><b>Details</b></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {events.map((ev) => (
//               <TableRow key={ev.id}>
//                 <TableCell>{ev.id}</TableCell>
//                 <TableCell>{ev.name}</TableCell>
//                 <TableCell>{ev.txHash}</TableCell>
//                 <TableCell>{ev.block}</TableCell>
//                 <TableCell>{ev.returnValues}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Container>
//   );
// };

// export default Transactions;

// import React, { useState, useEffect } from "react";
// import Web3 from "web3";
// import { Box, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
// import { toast } from "react-toastify";
// import { ABI } from "../data/Data"; // сложи своя ABI

// const Transactions = ({ transactions, setTransactions }) => {
//   const [contract, setContract] = useState("");
//   const [voting, setVoting] = useState(null);

//   // Зареждаме контракт от адрес
//   const loadContract = () => {
//     if (!contract) return toast.error("Въведи адрес на контракт!");
//     const web3 = new Web3(window.ethereum);
//     const votingContract = new web3.eth.Contract(ABI, contract);
//     setVoting(votingContract);
//     localStorage.setItem("CONTRACT", contract);
//     toast.success("Контрактът е зареден!");
//   };

//   // Взимаме всички събития
//   const getAllTransactions = async () => {
//     if (!voting) return toast.error("Първо зареди контракт!");
//     try {
//       const events = await voting.getPastEvents("allEvents", {
//         fromBlock: 0,
//         toBlock: "latest",
//       });
//       setTransactions(events);
//     } catch (err) {
//       console.error("Грешка при зареждане на събития:", err);
//       toast.error("Грешка при зареждане на събития");
//     }
//   };

//   useEffect(() => {
//     if (voting) {
//       getAllTransactions();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [voting]);

//   return (
//     <Box p={3}>
//       <TextField
//         label="Адрес на контракт"
//         value={contract}
//         onChange={(e) => setContract(e.target.value)}
//         fullWidth
//         sx={{ mb: 1 }}
//       />
//       <Button variant="contained" onClick={loadContract} sx={{ mb: 2 }}>
//         Зареди контракт
//       </Button>

//       <Typography variant="h4" gutterBottom>
//         История на транзакциите
//       </Typography>

//       <Button variant="contained" onClick={getAllTransactions} sx={{ mb: 2 }}>
//         Обнови
//       </Button>

//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>#</TableCell>
//             <TableCell>Event</TableCell>
//             <TableCell>Transaction Hash</TableCell>
//             <TableCell>Block</TableCell>
//             <TableCell>Details</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {transactions.map((tx, i) => (
//             <TableRow key={i}>
//               <TableCell>{i + 1}</TableCell>
//               <TableCell>{tx.event}</TableCell>
//               <TableCell>{tx.transactionHash}</TableCell>
//               <TableCell>{tx.blockNumber}</TableCell>
//               <TableCell>{JSON.stringify(tx.returnValues)}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Box>
//   );
// };

// export default Transactions;


import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Box, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { toast } from "react-toastify";
// import { ABI } from "../data/Data"; // сложи своя ABI
import VotingContract from "../build/Voting.json";

const Transactions = () => {
  const [contract, setContract] = useState("");
  const [voting, setVoting] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Зареждаме контракт от адрес
  const loadContract = () => {
    if (!contract) return toast.error("Въведи адрес на контракт!");
    const web3 = new Web3(window.ethereum);
    const votingContract = new web3.eth.Contract(VotingContract.abi, contract);
    setVoting(votingContract);
    localStorage.setItem("CONTRACT", contract);
    toast.success("Контрактът е зареден!");
  };

  // Взимаме всички събития voteDone
  const getAllTransactions = async () => {
    if (!voting) return toast.error("Първо зареди контракт!");
    try {
      const voteEvents = await voting.getPastEvents("voteDone", {
        fromBlock: 0,
        toBlock: "latest",
      });
      console.log(voteEvents);
      const formattedVotes = voteEvents.map((ev, i) => ({
        id: i + 1,
        voter: ev.returnValues.voter,
        choice: ev.returnValues.choice,
        txHash: ev.transactionHash,
      }));
      console.log(voteEvents.map(ev => ev.returnValues.choice));

      setTransactions(formattedVotes);
      console.log(voteEvents.map(ev => ev.returnValues));

    } catch (err) {
      console.error("Грешка при зареждане на гласовете:", err);
      toast.error("Грешка при зареждане на събития");
    }
  };

  useEffect(() => {
    if (voting) getAllTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voting]);

  return (
    <Box p={3}>
      <TextField
        label="Адрес на контракт"
        value={contract}
        onChange={(e) => setContract(e.target.value)}
        fullWidth
        sx={{ mb: 1 }}
      />
      <Button variant="contained" onClick={loadContract} sx={{ mb: 2 }}>
        Зареди контракт
      </Button>

      <Typography variant="h4" gutterBottom>
        История на гласовете
      </Typography>

      <Button variant="contained" onClick={getAllTransactions} sx={{ mb: 2 }}>
        Обнови
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Адрес на гласуващия</TableCell>
            <TableCell>Глас</TableCell>
            <TableCell>Transaction Hash</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{tx.id}</TableCell>
              <TableCell>{tx.voter}</TableCell>
              <TableCell>{tx.choice}</TableCell>
              <TableCell>{tx.txHash}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Transactions;


//NOT WORKING AT THE MOMENT
// import React, { useState, useEffect } from "react";
// import Web3 from "web3";
// import { Box, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
// import { toast } from "react-toastify";
// import VotingContract from "../build/Voting.json"; // ABI-то от build-а

// const Transactions = () => {
//   const [contractAddress, setContractAddress] = useState("");
//   const [voting, setVoting] = useState(null);
//   const [transactions, setTransactions] = useState([]);

//   // Зареждаме контракта от адрес
  
//   const loadContract = () => {
//     if (!contractAddress) return toast.error("Въведи адрес на контракт!");
//     const web3 = new Web3(window.ethereum);
//     try {
//       const votingInstance = new web3.eth.Contract(VotingContract.abi, contractAddress);
//       setVoting(votingInstance);
//       localStorage.setItem("CONTRACT", contractAddress);
//       toast.success("Контрактът е зареден!");
      
//     } catch (err) {
//       console.error("Грешка при зареждане на контракт:", err);
//       toast.error("Невалиден адрес или ABI");
//     }
//   };

//   // Взимаме всички събития voteDone
//   const getAllTransactions = async () => {
//     if (!voting) return toast.error("Първо зареди контракт!");
//     try {
//       const voteEvents = await voting.getPastEvents("voteDone", {
//         fromBlock: 0,
//         toBlock: "latest",
//       });

//       const formattedVotes = voteEvents.map((ev, i) => ({
//         id: i + 1,
//         voter: ev.returnValues.voter,
//         choice: ev.returnValues.choice,
//         txHash: ev.transactionHash,
//       }));
      
//       setTransactions(formattedVotes);
      
//     } catch (err) {
//       console.error("Грешка при зареждане на гласовете:", err);
//       toast.error("Грешка при зареждане на събития");
//     }
//   };

//   useEffect(() => {
    
//     const saved = localStorage.getItem("CONTRACT");
//     if (saved) setContractAddress(saved);
//   }, []);

//   return (
//     <Box p={3}>
//       <TextField
//         label="Адрес на контракт"
//         value={contractAddress}
//         onChange={(e) => setContractAddress(e.target.value)}
//         fullWidth
//         sx={{ mb: 1 }}
//       />
//       <Button variant="contained" onClick={loadContract} sx={{ mb: 2 }}>
//         Зареди контракт
//       </Button>

//       <Typography variant="h4" gutterBottom>
//         История на гласовете
//       </Typography>

//       <Button variant="contained" onClick={getAllTransactions} sx={{ mb: 2 }}>
//         Обнови
//       </Button>

//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>#</TableCell>
//             <TableCell>Адрес на гласуващия</TableCell>
//             <TableCell>Глас</TableCell>
//             <TableCell>Transaction Hash</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {transactions.map((tx) => (
//             <TableRow key={tx.id}>
//               <TableCell>{tx.id}</TableCell>
//               <TableCell>{tx.voter}</TableCell>
//               <TableCell>{tx.choice}</TableCell>
//               <TableCell>{tx.txHash}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Box>
//   );
// };

// export default Transactions;
