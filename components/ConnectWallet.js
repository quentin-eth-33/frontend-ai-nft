"use client"

import { ethers } from "ethers"
import { useState, useEffect } from "react"
import { contractAddresses, abi } from "../constants"
import axios from "axios"
import { Buffer } from "buffer"
import Spinner from "react-bootstrap/Spinner"
require("dotenv").config()

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

  return (
    <div>
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
    </div>
  )
}

export default ConnectWallet
