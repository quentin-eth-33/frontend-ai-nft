"use client"

import { ethers } from "ethers"
import { useState, useEffect } from "react"

const ConnectWallet = () => {
  const [account, setAccount] = useState(null)

  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
    console.log("Accounts: ", accounts)
    const address = ethers.utils.getAddress(accounts[0])
    setAccount(address)
  }
  useEffect(() => {
    const checkSelectedAddress = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const network = await provider.getNetwork()
      console.log("provider: ", provider)
      console.log("network: ", network)

      if (window.ethereum && window.ethereum.selectedAddress) {
        const address = ethers.utils.getAddress(window.ethereum.selectedAddress)
        setAccount(address)
      }
    }

    checkSelectedAddress()
  }, [])

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
