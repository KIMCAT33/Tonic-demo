import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {


  const [connected, setConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const getProviders = async () => {
    if ('tonic' in window) {
      const provider = await window.tonic;
      setProvider(provider);
      return provider;
    }
  };

  const isConnected = async () => {
    try {
      const provider = await getProviders();
      if (provider) {
        const isConnected = await provider.connectInfo();
        console.log("isConnected", isConnected['connected']);
        return isConnected['connected'];
        // true || false
      }
    } catch (err) {
      console.log(err);
    }
  };

  // getBalace
  const getBalance = async () => {
    try {
      const provider = await getProviders();
      if (provider) {
        const balance = await provider.balanceInfo();
        console.log("balance", balance['balance']);
        // 0.874720
      }

    } catch (err) {
      console.log(err);
    }
  };

  // network info 
  const getNetwork = async () => {
    try {
      const provider = await getProviders();
      if (provider) {
        const network = await provider.networkInfo();
        console.log("network", network['network']);
        /*
          {
            api_key: "31955b5f252f3ee75c4401d72f5a23de765f6bc54cc5b7a15558133f133e40b5",
            name: "Testnet",
            rpc: "https://testnet.toncenter.com/api/v2/jsonRPC",
            tonsacn_url: "https://testnet.tonscan.org/tx/",
          }
        */
      }
    } catch (err) {
      console.log(err);
    }
  };

  
  // connect to wallet
  const connect = async () => {
    try {
      const provider = await getProviders();
      console.log("provider", provider);
      if (provider) {
        const account = await provider.connect();
        console.log("account", account);
        console.log("adress", account.address);
        // EQD5mL_JSOY9t_Ugbf_anQ596RfzFDBjbMk_a-znn9FBS5Pr
        setConnected(true);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const sendTransaction = async (toAddress, amount, payload, stateInit) => {
    try {
      const provider = await getProviders();
      if (provider) {
        const transaction = await provider.sendTransaction({
          toAddress: toAddress,
          amount: amount,
          payload: payload,
          stateInit: stateInit,
        });
        console.log("transaction", transaction);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const runGetMethod = async (method) => {
    try {
      const provider = await getProviders();
      const account = await provider.enable();
      if (provider) {
        const result = await provider.runGetMethod({
          address: account.address,
          method: method,
        });
        console.log("result", result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const jsonRPCCall = async (method, params) => {
    try {
      const provider = await getProviders();
      if (provider) {
        const result = await provider.jsonRPCCall({
          method: method,
          id: 1,
          string: "2.0",
        });
        console.log("result", result);
      }
    } catch (err) {
      console.log(err);
    }
  };






  useEffect(() => {
  }, [provider]);




  return (
    <div className="App">
      <header className="App-header">
        <img src={"images/logo.png"} className="App-logo" alt="logo" />
        <p>
          Tonic Wallet
        </p>
        {
          connected ? 
          (
            <>
          <div>Connected</div>
          <button onClick={() => sendTransaction("EQDJDVP9cXPCRMgjH9z8eZO4IXyp05fN1hnDrDGbuByRIUpq", 0.1, "payload", "")}>
          <div>Send Transaction</div>
        </button>
        <button onClick={getBalance}>
          <div>Get Balance</div>
        </button>
        <button onClick={getNetwork}>
          <div>Get Network</div>
        </button>
        </>
          )
          : 
          (
            <button onClick={connect}>
          <div>Connect Wallet</div>
          </button>
          )
        }
  
      </header>
    </div>
  );
}

export default App;
