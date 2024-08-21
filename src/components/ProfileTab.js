/* global Paddle */

import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { getAuth } from "firebase/auth";
import { checkPaymentStatus, updatePaymentStatus } from "../util";

export default function ProfileTab() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [paymentStatus, setPaymentStatus] = useState("free");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  useEffect(() => {
    Paddle.Environment.set("sandbox");
    Paddle.Initialize({
      token: "test_f75b2af9393af9ae3b2250cafad",
      eventCallback: function (data) {
        console.log(data);
      },
    });
  }, []);

  useEffect(() => {
    async function fetchPaymentStatus() {
      const status = await checkPaymentStatus();
      setPaymentStatus(status);
    }

    fetchPaymentStatus();
  }, []);

  const handleUpgradeSubscription = () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    if (!"pro_01j5p16j5pbbt215prh6wh1w7b") {
      console.error("Product ID is missing");
      return;
    }

    Paddle.Checkout.open({
      items: [{ product: "pro_01j5p16j5pbbt215prh6wh1w7b", quantity: 1 }],
      customer: [{ email: user.email }],
      // successCallback: async (data) => {
      //   await updatePaymentStatus(user.uid, "paid");
      //   setPaymentStatus("paid");
      // },
      // closeCallback: () => {
      //   console.log("Checkout closed without completing the purchase.");
      // },
    });
  };

  const handleCancelSubscription = async () => {
    await updatePaymentStatus(user.uid, "free");
    setPaymentStatus("free");
    setOpenConfirmDialog(false);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Profile
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, maxWidth: 400, mb: 3 }}>
        <Typography variant="body1" sx={{ fontWeight: 400, fontSize: 16 }}>
          Name: {user.displayName}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 400, fontSize: 16 }}>
          Email: {user.email}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 400, fontSize: 16 }}>
          User ID: {user.uid}
        </Typography>
        <Button variant="contained" color={paymentStatus === "paid" ? "secondary" : "primary"} sx={{ mt: 2 }} onClick={paymentStatus === "paid" ? handleOpenConfirmDialog : handleUpgradeSubscription}>
          {paymentStatus === "paid" ? "Cancel Subscription" : "Upgrade Subscription"}
        </Button>
      </Box>
      <hr />
      <Typography variant="h5" sx={{ mt: 2 }}>
        Terms of Service
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        1. General Information
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        EduTools is a student community platform designed to help users succeed academically through various resources and a supportive community. By using EduTools, you agree to these Terms of Service.
        <br />
        <strong>No Age Restrictions: </strong>
        EduTools does not impose any age restrictions for using the platform.
        <br />
        <strong>Account Requirement:</strong> Users are required to create an account using Google authentication to access EduTools' services.
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        2. User Obligations
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Users must adhere to the following guidelines:
        <br />
        <strong>- Respect and Tolerance: </strong>
        No racism, homophobia, or discrimination of any kind will be tolerated. Users are expected to be respectful to all community members.
        <br />
        <strong>- Prohibited Activities:</strong> Promotion of illegal activities, abuse, piracy, and any form of raiding or disruptive behavior in chats are strictly prohibited.
        <br />
        <strong>- Truthful Information:</strong> Users must provide accurate and truthful information during registration.
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        3. Intellectual Property
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        All content provided on the EduTools platform is created by EduTools and is the intellectual property of EduTools. Users are permitted to use the content but are not allowed to reproduce or redistribute it without prior permission.
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        4. Subscriptions and Billing
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        <strong>- Subscription: </strong>
        Users can upgrade their accounts for a $20/month subscription.
        <br />
        <strong>- Promotions: </strong>Occasionally, we offer free trials, discounts, and special promotions, including affiliate offers.
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        5. Termination of Service
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        EduTools reserves the right to terminate any user account at its sole discretion if a user violates these Terms of Service. Upon termination, all user data will be deleted from our system.
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        6. Limitation of Liability
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        EduTools is not responsible for the content accuracy or the use of third-party services. We do not provide disclaimers regarding the accuracy of information on the platform.
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        7. Amendments
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        EduTools reserves the right to modify these Terms of Service at any time. However, users will not be notified of changes. It is the user's responsibility to review the ToS periodically.
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        8. Governing Law
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        These Terms of Service will be governed by the laws of the applicable jurisdiction. Disputes arising from these terms will be resolved through litigation.
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        9. User Support
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        For support or questions about the service, users can contact us at educationaltools.io@gmail.com.
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        10. Third-Party Links and Services
      </Typography>
      <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
        EduTools utilizes third-party services such as Kasm, AWS, and Webshare. We hold no responsibility for the performance, availability, or any issues related to these third-party services.
      </Typography>

      <hr />

      <Typography variant="h5" sx={{ mt: 3 }}>
        Privacy Policy
      </Typography>

      <Typography variant="body2" sx={{ mt: 1 }}>
        <strong>Effective Date:</strong> 8/19/2024
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        1. Data Collection
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        We collect the following personal data from our users:
        <br />
        - Google Account information (name, email, etc.)
        <br />
        - Payment status (whether you have paid for a subscription or not)
        <br />
        We do not collect any non-personal data, and we do not use personal data for platform improvement or marketing purposes.
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        2. Data Usage
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        The personal data we collect is used solely to provide and manage our services, including determining your subscription status and access to features.
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        3. Data Sharing
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        We do not share user data with third parties. Additionally, we do not sell user data to any third parties.
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        4. Data Storage
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        User data is securely stored in AWS and Firebase. We retain your data for as long as your account remains open. To protect your data, we use the security measures provided by Google and Amazon.
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        5. User Rights
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        You have the right to access, update, or delete your personal data at any time through the profile tab in your account. If you wish to exercise any of these rights, you can also contact us directly.
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        6. Cookies and Tracking
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        We do not use cookies or any other tracking technologies on our platform.
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        7. Third-Party Services
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        We use the following third-party services on our platform:
        <br />
        <strong>- Kasm: </strong>
        Allows users to use proxy servers.
        <br />
        <strong>- AWS (Amazon Web Services): </strong>
        For data storage and security.
        <br />
        <strong>- Webshare: </strong>
        Provides additional proxy server services.
        <br />
        Please note that these third-party services have their own privacy policies, and we encourage you to review them.
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        8. Children’s Privacy
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        We collect the same information from users under and over the age of 18. Since the data collected is not sensitive, we do not have special protections in place for children's data.
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        9. Changes to the Privacy Policy
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Any updates to our Privacy Policy will be reflected in the profile tab of your account. By continuing to use our services after changes are made, you agree to the updated terms.
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        10. Contact Information
      </Typography>
      <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
        If you have any privacy concerns or questions related to your data, you can contact us at: educationaltools.io@gmail.com.
      </Typography>

      <hr />

      <Typography variant="h5" sx={{ mt: 3 }}>
        Refund Policy
      </Typography>

      <Typography variant="body2" sx={{ mt: 2 }}>
        At EduTools, we strive to provide valuable resources and support to our users. However, please note that all sales and subscriptions are final. We do not offer refunds under any circumstances. This policy applies to all users and transactions, including but not limited to subscription fees, one-time purchases, and special promotions. If you experience any issues or have any concerns regarding your purchase, please contact our support team at educationaltools.io@gmail.com. We are here to assist you with any questions or technical difficulties you may encounter. Thank you for understanding and supporting EduTools.
      </Typography>

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
