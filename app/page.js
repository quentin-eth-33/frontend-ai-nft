import ConnectWallet from "../components/ConnectWallet"
import FormCallApi from "../components/FormCallApi"
export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        <span className="orange_gradient text-center">Generate NFT with AI</span>
      </h1>
      <div className="absolute top-0 right-0 mt-8 mr-0">
        <ConnectWallet />
      </div>
      <div>
        <FormCallApi />
      </div>
    </section>
  )
}
