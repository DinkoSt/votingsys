// import { useState } from "react";
// import { Container, Paper, Typography, TextField, Button, MenuItem, Stack } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// export default function AdminPanel() {
//   const [address, setAddress] = useState("");
//   const [location, setLocation] = useState("");
//   const navigate = useNavigate();

//   const handleSave = () => {
//     console.log("Saved:", { address, location });
//     // засега не правим нищо
//   };

//   const handleEnter = () => {
//     navigate("/"); // към voting системата
//   };

//   return (
//     <Container sx={{ mt: 10 }}>
//       <Paper sx={{ p: 4, borderRadius: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           Админ Панел
//         </Typography>

//         <Stack gap={3}>
//           <TextField
//             label="Адрес на бюлетина"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             fullWidth
//           />

//           <TextField
//             select
//             label="Локация"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             fullWidth
//           >
//             <MenuItem value="България">България</MenuItem>
//             <MenuItem value="София">София</MenuItem>
//             <MenuItem value="Пловдив">Пловдив</MenuItem>
//           </TextField>

//           <Stack direction="row" gap={2}>
//             <Button
//               variant="outlined"
//               onClick={handleSave}
//               sx={{ flex: 1 }}
//             >
//               Запази промените
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleEnter}
//               sx={{ flex: 1 }}
//             >
//               Вход
//             </Button>
//           </Stack>
//         </Stack>
//       </Paper>
//     </Container>
//   );
// }

import { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.5)), url('/herringbone.webp')`,
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        height: "100vh",
        margin: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          mt: 8,
          borderRadius: 3,
          textAlign: "center",
          maxWidth: "md",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          color={"primary"}
          fontWeight="500"
          gutterBottom
        >
          Админ Панел
        </Typography>

        <Stack gap={3} mt={3}>
          <TextField
            label="Адрес на бюлетина"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />

          <TextField
            select
            label="Локация"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
          >
            <MenuItem value="България">България</MenuItem>
            <MenuItem value="София">София</MenuItem>
            <MenuItem value="Пловдив">Пловдив</MenuItem>
          </TextField>

          <Stack direction="row" gap={2}>
            <Button variant="outlined" sx={{ flex: 1 }}>
              Запази промените
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{ flex: 1 }}
            >
              Вход
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
