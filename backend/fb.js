require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;
const FB_GRAPH_URL = "https://graph.facebook.com/v19.0";

app.use(cors());
app.use(express.json());

// Facebook App Credentials
const FB_APP_ID = process.env.FB_APP_ID;
const FB_APP_SECRET = process.env.FB_APP_SECRET;
const REDIRECT_URI = "http://localhost:3000/auth/callback";

// Step 1: Redirect user to Facebook OAuth
app.get("/auth/facebook", (req, res) => {
  const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=pages_show_list,pages_manage_posts,catalog_management,business_management`;
  res.redirect(authUrl);
});

// Step 2: Handle Facebook OAuth callback
app.get("/auth/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send("Missing code parameter");

  try {
    const tokenRes = await axios.get(`https://graph.facebook.com/v19.0/oauth/access_token`, {
      params: {
        client_id: FB_APP_ID,
        client_secret: FB_APP_SECRET,
        redirect_uri: REDIRECT_URI,
        code,
      },
    });
    const accessToken = tokenRes.data.access_token;
    res.redirect(`/pages?access_token=${accessToken}`);
  } catch (err) {
    res.status(500).send("OAuth Error: " + err.message);
  }
});

// Step 3: Fetch User's Business Pages
app.get("/pages", async (req, res) => {
  const { access_token } = req.query;
  if (!access_token) return res.status(400).send("Missing access token");

  try {
    const pagesRes = await axios.get(`${FB_GRAPH_URL}/me/accounts`, {
      params: { access_token },
    });
    res.json(pagesRes.data);
  } catch (err) {
    res.status(500).send("Error fetching pages: " + err.message);
  }
});

// Step 4: Connect a Business Page & Create a Product Catalog
app.post("/connect-page", async (req, res) => {
  const { access_token, page_id, business_id } = req.body;
  if (!access_token || !page_id || !business_id) return res.status(400).send("Missing parameters");

  try {
    // Create a new Product Catalog
    const catalogRes = await axios.post(`${FB_GRAPH_URL}/${business_id}/owned_product_catalogs`, {
      name: "My Store Catalog",
      access_token,
    });

    res.json({ catalog_id: catalogRes.data.id, message: "Catalog created" });
  } catch (err) {
    res.status(500).send("Error creating catalog: " + err.message);
  }
});

// Step 5: Upload a Product to the Catalog
app.post("/upload-product", async (req, res) => {
  const { access_token, catalog_id, product_data } = req.body;
  if (!access_token || !catalog_id || !product_data) return res.status(400).send("Missing parameters");

  try {
    const productRes = await axios.post(`${FB_GRAPH_URL}/${catalog_id}/products`, {
      ...product_data,
      access_token,
    });
    res.json({ product_id: productRes.data.id, message: "Product uploaded" });
  } catch (err) {
    res.status(500).send("Error uploading product: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
