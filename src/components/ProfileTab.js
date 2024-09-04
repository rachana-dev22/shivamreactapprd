import React, { useState, useEffect } from "react";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Avatar } from "@mui/material";
import { getAuth } from "firebase/auth";
import { checkPaymentStatus, updatePaymentStatus, deleteUserAccount } from "../util";
import { loadStripe } from "@stripe/stripe-js";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CancelIcon from "@mui/icons-material/Cancel";
import TOS from "./TOS";
const stripePromise = loadStripe("pk_test_51OgZZ7CKDtg3cmb0lr1Ftsq3crlehFW3culboDDrJqIPD6tFDnyVQrhTLmX6RWb73HOyMNe6l2HTIxlWRKPqjJ4Z00TSji7pQD");

export default function ProfileTab() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [open, setOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("free");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [revealEmail, setRevealEmail] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchPaymentStatus() {
      const status = await checkPaymentStatus();
      setPaymentStatus(status);
    }

    fetchPaymentStatus();
  }, []);

  const handleCancelSubscription = async () => {
    try {
      const userDoc = await getDoc(doc(getFirestore(), "users", user.uid));
      const subscriptionId = userDoc.data().subscriptionId;

      if (!subscriptionId) {
        throw new Error("Subscription ID not found");
      }

      const response = await fetch("https://stripe-worker.educationaltools-io.workers.dev/cancel-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId: subscriptionId,
        }),
      });

      const result = await response.json();

      if (response.status === 200 && result.status === "success") {
        await updatePaymentStatus(user.uid, "free");
        setPaymentStatus("free");
        setOpenConfirmDialog(false);
        alert("Subscription canceled successfully.");
      } else {
        throw new Error(result.error || "Failed to cancel subscription");
      }
    } catch (error) {
      console.error("Cancellation error:", error);
      alert("There was an error canceling your subscription. Please try again.");
    }
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    try {
      const response = await fetch("https://stripe-worker.educationaltools-io.workers.dev/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: "price_1OnCBhCKDtg3cmb0s1CLHaXC",
          email: user.email,
        }),
      });

      const session = await response.json();

      if (response.status !== 200 || !session.id) {
        throw new Error("Session ID is missing or invalid.");
      }

      // Store the subscription ID in Firebase
      await updatePaymentStatus(user.uid, "paid", session.subscriptionId);

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
        alert("There was an error processing your request. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const displayEmail = () => {
    setRevealEmail(!revealEmail);
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount(user.uid);

      await auth.signOut();

      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("There was an error deleting your account. Please try again.");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          fontWeight: "bold",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        My Account
      </Typography>

      <Box sx={{ borderRadius: 2, border: "2px solid #e0e0e0", p: 3, mx: "auto", background: "#f7f7f7", boxShadow: "inset 0px 0px 3px rgba(0, 0, 0, 0.1)" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar src={user.photoURL} alt={user.displayName} sx={{ width: 80, height: 80, mr: 2 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {user.displayName}
            </Typography>
          </Box>
          <Box
            sx={{
              ml: 2,
              borderRadius: 2,
              border: paymentStatus === "paid" ? "1px solid #0e539e" : "1px solid #8a8a8a",
              p: 1,
              backgroundColor: paymentStatus === "paid" ? "#1976d2" : "#9e9e9e",
              boxShadow: "0 0px 5px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Typography variant="body2" sx={{ color: "#fff", fontFamily: "'Poppins', sans-serif" }}>
              {paymentStatus === "paid" ? "Verified Member" : "Limited Member"}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              flex: 1,
              p: 2,
              borderRadius: 2,
              border: "2px solid #e0e0e0",
              mr: 1,
              background: "#fefefe",
              boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
              Display Name
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {user.displayName}
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
              Email
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                {revealEmail ? user.email : "**************"}
              </Typography>
              <Button variant="outlined" size="small" onClick={displayEmail}>
                {revealEmail ? "Hide" : "Reveal"}
              </Button>
            </Box>

            {/* <Button variant="contained" color="error" onClick={handleClickOpen}>
              Delete Account
            </Button> */}

            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete your account?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">Deleting your account is a permanent action and cannot be undone. You will lose access to all your data and services associated with your account.</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleDeleteAccount} color="error" autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Box>

          <Box
            sx={{
              flex: 1,
              borderRadius: 2,
              background: "linear-gradient(135deg, #3563e6 0%, #06102e 100%)",
              ml: 1,
              color: "#fff",
              p: 3,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src="/blurredlogo.png"
              alt="Blurred Logo"
              sx={{
                position: "absolute",
                top: { xs: -50, sm: -150 },
                left: { xs: "-5%", sm: "30%" },
                width: { xs: "500px", sm: "600px" },
                height: "auto",
                opacity: 0.2,
                pointerEvents: "none",
              }}
            />
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Unlock EduTools
            </Typography>
            <Typography variant="body1">$19.99 / month</Typography>
            <Box component="ul" sx={{ mt: 2, pl: 2 }}>
              <Typography component="li" variant="body2">
                Access to premium services
              </Typography>
              <Typography component="li" variant="body2">
                Access to private tools
              </Typography>
              <Typography component="li" variant="body2">
                Access to student community
              </Typography>
              <Typography component="li" variant="body2">
                24/7 support
              </Typography>
            </Box>
            <Button
              variant={paymentStatus === "paid" ? "contained" : "outlined"}
              color={paymentStatus === "paid" ? "error" : "primary"}
              startIcon={paymentStatus === "paid" ? <CancelIcon /> : <RocketLaunchIcon />}
              onClick={paymentStatus === "paid" ? () => setOpenConfirmDialog(true) : handleCheckout}
              sx={{
                mt: 2,
                padding: "8px 35px",
                background: paymentStatus === "paid" ? "linear-gradient(135deg, #f44336 0%, #e57373 100%)" : "linear-gradient(135deg, #1a73e8 0%, #4285f4 100%)",
                color: "#fff",
                border: paymentStatus === "paid" ? "1px solid #ef5350" : "1px solid #78a5f0",
                boxShadow: "0 0px 15px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s, box-shadow 0.3s, background 0.3s",
                "&:hover": {
                  background: paymentStatus === "paid" ? "linear-gradient(135deg, #e57373 0%, #ef5350 100%)" : "linear-gradient(135deg, #4285f4 0%, #669df6 100%)",
                  boxShadow: "0 4px 25px rgba(0, 0, 0, 0.4)",
                  transform: "scale(1.05)",
                },
                "&:focus": {
                  boxShadow: "0 0 10px rgba(0, 0, 255, 0.8)",
                },
              }}
            >
              {paymentStatus === "paid" ? "Cancel Membership" : "Purchase EduTools"}
            </Button>
          </Box>
        </Box>
      </Box>

      <TOS />

      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to cancel your subscription? This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            No
          </Button>
          <Button onClick={handleCancelSubscription} color="secondary">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to cancel your subscription? This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            No
          </Button>
          <Button onClick={handleCancelSubscription} color="secondary">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
