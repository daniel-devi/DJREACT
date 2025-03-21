import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout logic here
        localStorage.removeItem("TOKEN"); // JWT_TOKEN - For Authenticating User
        localStorage.removeItem("REFRESH_TOKEN"); // REFRESH_TOKEN - For generating New JWT_TOKEN
        localStorage.removeItem("ID"); // User ID
        localStorage.removeItem("USER"); // User Username
        navigate("/login");
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            width="100vw"
            sx={{ backgroundColor: "#f4f6f8" }}
        >
            <Typography variant="h3" color="text.primary" gutterBottom>Stocker</Typography>
            <Paper
                sx={{
                    padding: "20px 40px",
                    borderRadius: "8px",
                    boxShadow: 3,
                    textAlign: "center",
                    backgroundColor: "#fff",
                    maxWidth: 400,
                    width: "100%",
                }}
            >
                <Typography variant="h6" color="text.primary" gutterBottom>
                    Are you sure you want to logout?
                </Typography>
                <Box display="flex" justifyContent="center" gap={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogout}
                        sx={{ padding: "10px 20px" }}
                    >
                        Logout
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => navigate("/")}
                        sx={{ padding: "10px 20px" }}
                    >
                        Cancel
                    </Button>
                </Box>
                <Box marginTop={2}>
                    <Button
                        variant="text"
                        color="primary"
                        onClick={() => navigate("/")}
                    >
                        Go to Homepage
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default Logout;