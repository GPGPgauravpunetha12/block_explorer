import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';


import './App.css';
import LatestBlock from './components/LatestBlock';
import Transactions from './components/Transactions';
import TransactionDetail from './components/TransactionDetail';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
export const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState([]);
	const [blockTxs, setBlockTxs] = useState([]);
	const [blockTxIsLoading, setBlockTxIsLoading] = useState(false);
	const [tx, setTx] = useState();
	const [txIsLoading, setTxIsLoading] = useState(false);
	const [receipt, setReceipt] = useState();
	
	
  useEffect(() => {
		alchemy.core.getBlock("latest")
			.then((value) => {
				setBlockNumber(prev => [...prev, value.number])
			})
		alchemy.ws.on("block", (blockNumber) => {
			setBlockNumber(prev => {
				if (prev.length === 20) prev.shift();
				return [...prev, blockNumber];
				// keeps track of the latest 20 block numbers in the blockNumber state array
		});
		})
  }, [setBlockNumber]);

  return (
		<Container className="py-5" style={{ height: "100vh" }}>
			<Row className='gx-3 h-100'>
				<Col xs={2} className='h-100'>
					<LatestBlock 
						blockNumber={blockNumber}
						setBlockTxs={setBlockTxs}
						setBlockTxIsLoading={setBlockTxIsLoading}
						setTx={setTx}
					/>
				</Col>
				<Col xs={4} className='h-100'>
					<Transactions 
						blockTxs={blockTxs}
						blockTxIsLoading={blockTxIsLoading} 
						setTx={setTx}
						setTxIsLoading={setTxIsLoading}
						setReceipt={setReceipt}
					/>
				</Col>
				<Col xs={6}>
					<TransactionDetail 
						txIsLoading={txIsLoading}
						tx={tx}
						receipt={receipt}
					/>
				</Col>
			</Row>
		</Container>
	);
}

export default App;
