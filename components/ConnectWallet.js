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
  const [message, setMessage] = useState("")
  const [image, setImage] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isWaiting, setIsWaiting] = useState(false)

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

  const submitHandler = async (e) => {
    e.preventDefault() // Empeche le rafraichissement de la page
    const formData = {
      name: name,
      description: description,
    }
    setIsWaiting(true)
    const imageData = await createImage()
    console.log("imageData")
    setIsWaiting(false)
    setMessage("")
  }

  const createImage = async () => {
    setMessage("Generating Image...")
    const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`

    const response = await axios({
      url: URL,
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        inputs: description,
        options: { wait_for_model: true },
      }),
      responseType: "arraybuffer",
    })

    const type = response.headers["content-type"]
    const data = response.data

    const base64data = Buffer.from(data).toString("base64")
    const img = `data:${type};base64,` + base64data // <-- This is so we can render it on the page
    setImage(img)

    return data
  }

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

      <div className="image">
        {!isWaiting && image ? (
          <img src={image} alt="AI generated image" />
        ) : isWaiting ? (
          <div className="image__placeholder">
            <Spinner animation="border" />
            <p>{message}</p>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="form">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Create a name..."
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <input
            type="text"
            placeholder="Create a description..."
            onChange={(e) => setDescription(e.target.value)}
          />
          <input type="submit" value="Create & Mint" />
        </form>
      </div>
      <style jsx>{`
        .nav__connect {
          position: absolute;
          top: 0;
          right: 0;
        }
      `}</style>
    </div>
  )
}

export default ConnectWallet
