"use client"

import { ethers } from "ethers"
import { useState } from "react"

const ConnectWallet = () => {
  const [account, setAccount] = useState(null)

  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
    console.log("Accounts: ", accounts)
    const address = ethers.getAddress(accounts[0])
    setAccount(address)
  }

  return (
    <nav>
      {account ? (
        <button type="button" className="nav__connect">
          {account.slice(0, 6) + "..." + account.slice(38, 42)}
        </button>
      ) : (
        <button type="button" className="nav__connect" onClick={connectHandler}>
          Connect
        </button>
      )}
    </nav>
  )
}

export default ConnectWallet
