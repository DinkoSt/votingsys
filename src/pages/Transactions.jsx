
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
     <Box
          sx={{
            minHeight: "100vh",
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.5)), url('/Result.png')`,
             backgroundColor: `rgba(248, 245, 245, 0.78)`,
            backgroundBlendMode: "overlay",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            p: 4,
          }}
        >
    <Box p={3}>
       <Typography variant="h4" gutterBottom>
        История на гласовете
      </Typography>
      <TextField
        label="Адрес на бюлетина"
        value={contract}
        onChange={(e) => setContract(e.target.value)}
        fullWidth
        sx={{ mb: 1 }}
      />
      <Button variant="contained" onClick={loadContract} sx={{ mb: 2 }}>
        Зареди бюлетина
      </Button>

     

      <Button variant="contained" onClick={getAllTransactions} sx={{ mb: 2 }} style={{ marginLeft: '10px' }}>
        Обнови гласовете
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Адрес на гласуващия</TableCell>
            <TableCell>Глас</TableCell>
            <TableCell>Хеш на транзакция</TableCell>
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
      </Box>
  );
      
  };

export default Transactions;


