import "./globals.css";

export const metadata = {
  title: "AI-NFT",
  description: "Generate NFT with AI Prompt",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <div className="main">
        <div className="gradient" />
      </div>
      <main className="app">{children}</main>
    </body>
  </html>
);

export default RootLayout;
