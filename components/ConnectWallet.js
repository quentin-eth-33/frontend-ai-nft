"use client"

import { ethers } from "ethers"
import { useState, useEffect } from "react"
import { contractAddresses, abi } from "../constants"

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
      if (window.ethereum && window.ethereum.selectedAddress) {
        const address = ethers.utils.getAddress(window.ethereum.selectedAddress)
        setAccount(address)
      }
    }

    checkSelectedAddress()
  }, [])

  const totalSupply = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const network = await provider.getNetwork()
    console.log("provider: ", provider)
    console.log("network: ", network)
    console.log("address", contractAddresses.sepolia[0])
    const nft = new ethers.Contract(contractAddresses.sepolia[0], abi, provider)
    console.log("contract nft" + nft)
    const signer = await provider.getSigner()
    console.log("signer" + signer)
    const transaction = await nft.connect(signer).totalSupply()
    console.log("total supply: " + transaction)
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
      <button type="button" className="nav__connect" onClick={totalSupply}>
        Total Supply
      </button>
    </nav>
  )
}

export default ConnectWallet
