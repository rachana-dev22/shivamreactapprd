import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Avatar } from "@mui/material";
import { getAuth } from "firebase/auth";
import { checkPaymentStatus, updatePaymentStatus, deleteUserAccount } from "../util";
import { loadStripe } from "@stripe/stripe-js";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
const stripePromise = loadStripe("pk_test_51OgZZ7CKDtg3cmb0lr1Ftsq3crlehFW3culboDDrJqIPD6tFDnyVQrhTLmX6RWb73HOyMNe6l2HTIxlWRKPqjJ4Z00TSji7pQD");

export default function ProfileTab() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [open, setOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("free");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [revealEmail, setRevealEmail] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

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

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch("https://stripe-worker.educationaltools-io.workers.dev/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId: "price_1PthzPCKDtg3cmb0d95HhTLc",
        email: user.email,
      }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  const handleCancelSubscription = async () => {
    await updatePaymentStatus(user.uid, "free");
    setPaymentStatus("free");
    setOpenConfirmDialog(false);
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

            <Button variant="contained" color="error" onClick={handleClickOpen}>
              Delete Account
            </Button>

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
              variant="contained"
              color="primary"
              startIcon={<RocketLaunchIcon />}
              onClick={handleCheckout}
              sx={{
                mt: 2,
                padding: "8px 35px",
                background: "linear-gradient(135deg, #1a73e8 0%, #4285f4 100%)",
                color: "#fff",
                border: "1px solid #78a5f0",
                boxShadow: "0 0px 15px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s, box-shadow 0.3s, background 0.3s",
                "&:hover": {
                  background: "linear-gradient(135deg, #4285f4 0%, #669df6 100%)",
                  boxShadow: "0 4px 25px rgba(0, 0, 0, 0.4)",
                  transform: "scale(1.05)",
                },
                "&:focus": {
                  boxShadow: "0 0 10px rgba(0, 0, 255, 0.8)",
                },
              }}
            >
              Purchase EduTools
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ borderRadius: 2, border: "2px solid #e0e0e0", p: 3, mt: 3, background: "#f7f7f7", boxShadow: "inset 0px 0px 3px rgba(0, 0, 0, 0.1)" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", pb: 1 }}>
          Terms of Service
        </Typography>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            border: "2px solid #e0e0e0",
            mr: 1,
            background: "#fefefe",
            boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.1)",
            height: "300px",
            overflow: "auto",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
            1. General Information
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
            EduTools is a student community platform designed to help users succeed academically through various resources and a supportive community. By using EduTools, you agree to these Terms of Service.
            <br />
            <strong>No Age Restrictions: </strong>
            EduTools does not impose any age restrictions for using the platform.
            <br />
            <strong>Account Requirement:</strong> Users are required to create an account using Google authentication to access EduTools' services.
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "#333" }}>
            2. User Obligations
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
            Users must adhere to the following guidelines:
            <ul style={{ marginLeft: "20px" }}>
              <li>
                <strong>Respect and Tolerance: </strong>
                No racism, homophobia, or discrimination of any kind will be tolerated. Users are expected to be respectful to all community members.
              </li>
              <li>
                <strong>Prohibited Activities:</strong> Promotion of illegal activities, abuse, piracy, and any form of raiding or disruptive behavior in chats are strictly prohibited.
              </li>
              <li>
                <strong>Truthful Information:</strong> Users must provide accurate and truthful information during registration.
              </li>
            </ul>
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "#333" }}>
            3. Intellectual Property
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
            All content provided on the EduTools platform is created by EduTools and is the intellectual property of EduTools. Users are permitted to use the content but are not allowed to reproduce or redistribute it without prior permission.
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "#333" }}>
            4. Subscriptions and Billing
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
            <strong>Subscription: </strong>
            Users can upgrade their accounts for a $20/month subscription.
            <br />
            <strong>Promotions: </strong>Occasionally, we offer free trials, discounts, and special promotions, including affiliate offers.
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "#333" }}>
            5. Termination of Service
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
            EduTools reserves the right to terminate any user account at its sole discretion if a user violates these Terms of Service. Upon termination, all user data will be deleted from our system.
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "#333" }}>
            6. Limitation of Liability
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
            EduTools is not responsible for the content accuracy or the use of third-party services. We do not provide disclaimers regarding the accuracy of information on the platform.
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "#333" }}>
            7. Amendments
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
            EduTools reserves the right to modify these Terms of Service at any time. However, users will not be notified of changes. It is the user's responsibility to review the ToS periodically.
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "#333" }}>
            8. Governing Law
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
            These Terms of Service will be governed by the laws of the applicable jurisdiction. Disputes arising from these terms will be resolved through litigation.
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "#333" }}>
            9. User Support
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
            For support or questions about the service, users can contact us at educationaltools.io@gmail.com.
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "#333" }}>
            10. Third-Party Links and Services
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6, mb: 3 }}>
            EduTools utilizes third-party services such as Kasm, AWS, and Webshare. We hold no responsibility for the performance, availability, or any issues related to these third-party services.
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold", pb: 1 }}>
          Privacy Policy
        </Typography>

        <Typography variant="body2" sx={{ fontWeight: "bold", color: "#555", mb: 1 }}>
          Effective Date: 8/19/2024
        </Typography>

        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            border: "2px solid #e0e0e0",
            mr: 1,
            background: "#fefefe",
            boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.1)",
            height: "300px",
            overflow: "auto",
          }}
        >
          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "#333" }}>
            1. Data Collection
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
            We collect the following personal data from our users:
            <ul style={{ marginLeft: "20px" }}>
              <li>Google Account information (name, email, etc.)</li>
              <li>Payment status (whether you have paid for a subscription or not)</li>
            </ul>
            We do not collect any non-personal data, and we do not use personal data for platform improvement or marketing purposes.
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "#333" }}>
            2. Data Usage
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
            The personal data we collect is used solely to provide and manage our services, including determining your subscription status and access to features.
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "#333" }}>
            3. Data Sharing
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
            We do not share user data with third parties. Additionally, we do not sell user data to any third parties.
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "#333" }}>
            4. Data Storage
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
            User data is securely stored in AWS and Firebase. We retain your data for as long as your account remains open. To protect your data, we use the security measures provided by Google and Amazon.
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "#333" }}>
            5. User Rights
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
            You have the right to access, update, or delete your personal data at any time through the profile tab in your account. If you wish to exercise any of these rights, you can also contact us directly.
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "#333" }}>
            6. Cookies and Tracking
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
            We do not use cookies or any other tracking technologies on our platform.
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "#333" }}>
            7. Third-Party Services
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
            We use the following third-party services on our platform:
            <ul style={{ marginLeft: "20px" }}>
              <li>
                <strong>Kasm:</strong> Allows users to use proxy servers.
              </li>
              <li>
                <strong>AWS (Amazon Web Services):</strong> For data storage and security.
              </li>
              <li>
                <strong>Webshare:</strong> Provides additional proxy server services.
              </li>
            </ul>
            Please note that these third-party services have their own privacy policies, and we encourage you to review them.
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "#333" }}>
            8. Children’s Privacy
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
            We collect the same information from users under and over the age of 18. Since the data collected is not sensitive, we do not have special protections in place for children's data.
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "#333" }}>
            9. Changes to the Privacy Policy
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
            Any updates to our Privacy Policy will be reflected in the profile tab of your account. By continuing to use our services after changes are made, you agree to the updated terms.
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "#333" }}>
            10. Contact Information
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6, mb: 3 }}>
            If you have any privacy concerns or questions related to your data, you can contact us at: educationaltools.io@gmail.com.
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold", pb: 1 }}>
          Refund Policy
        </Typography>

        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            border: "2px solid #e0e0e0",
            mr: 1,
            background: "#fefefe",
            boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            At EduTools, we strive to provide valuable resources and support to our users. However, please note that all sales and subscriptions are final. We do not offer refunds under any circumstances. This policy applies to all users and transactions, including but not limited to subscription fees, one-time purchases, and special promotions. If you experience any issues or have any concerns regarding your purchase, please contact our support team at educationaltools.io@gmail.com. We are here to assist you with any questions or technical difficulties you may encounter. Thank you for understanding and supporting EduTools.
          </Typography>
        </Box>
      </Box>

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
