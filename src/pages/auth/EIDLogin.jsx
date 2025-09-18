import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function EIDLogin() {
  const { loginWithEID, isBG } = useAuth();
  const [form, setForm] = useState({
    idNumber: "",
    nationality: "BG",
    dob: "",
  });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isBG) {
      navigate("/", { replace: true });
    }
  }, [isBG, navigate]);

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   setErr("");
  //   try {
  //     await loginWithEID(form);
  //     window.location.href = "/"; // към страницата за гласуване
  //   } catch (e) {
  //     setErr(e.message);
  //   }
  // };
  const onSubmit = async (e) => {
  e.preventDefault();
  setErr("");
  try {
    const token = await loginWithEID(form);
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.creator) {
      navigate("/admin", { replace: true });
    } else {
      window.location.href = "/"; // към voting системата
    }
  } catch (e) {
    setErr(e.message);
  }
};


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
        }}
      >
        <Typography
          variant="h4"
          color={"primary"}
          fontWeight="500"
          gutterBottom
        >
          eID Идентификация
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Въведете данните си, за да се удостоверите като български гражданин
        </Typography>

        <Stack component="form" onSubmit={onSubmit} sx={{ mt: 3 }} gap={2}>
          <TextField
            type="text"
            placeholder="Номер на документ"
            fullWidth
            margin="normal"
            value={form.idNumber}
            onChange={(e) => {
              let newValue = e.target.value.replace(/\D/g, "");
              if (newValue.length > 9) newValue = newValue.slice(0, 9);
              setForm((f) => ({ ...f, idNumber: newValue }));
            }}
            inputMode="numeric"
            helperText={
              form.idNumber.length < 9
                ? "Номерът трябва да съдържа 9 цифри"
                : ""
            }
            required
          />
          <TextField
            placeholder="Националност"
            fullWidth
            margin="normal"
            value={form.nationality}
            onChange={(e) =>
              setForm((f) => ({ ...f, nationality: e.target.value }))
            }
            required
          />
          <TextField
            placeholder="Дата на раждане (YYYY-MM-DD)"
            fullWidth
            margin="normal"
            value={form.dob}
            onChange={(e) => setForm((f) => ({ ...f, dob: e.target.value }))}
            required
          />

          {err && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {err}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 3, borderRadius: 2 }}
          >
            Вход
          </Button>
           <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 0, borderRadius: 2 }}
          >
            Вход като гост
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
