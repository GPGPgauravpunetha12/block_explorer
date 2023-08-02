import React from 'react'
import { Card, ListGroup, Row, Spinner } from 'react-bootstrap'
import { alchemy } from '../App.js';

const Transactions = (props) => {
	const { blockTxs, blockTxIsLoading, setTx, setTxIsLoading, setReceipt } = props;
	
	const handleOnClick = async (txHash) => {
		setTxIsLoading(true);
		console.log(txHash);
		const tx = await alchemy.core.getTransaction(txHash);
		const txReceipt = await alchemy.core.getTransactionReceipt(txHash);
		setTx(tx);
		console.log(tx);
		console.log(txReceipt);
		setReceipt(txReceipt);
		setTxIsLoading(false);
	}
	
	return (
		<Card className='h-100'>
			{blockTxIsLoading 
				? (
					<>
						<Card.Body>
							<Row className='justify-content-center align-items-center h-100'>
								<Spinner animation='grow'/>
							</Row>
						</Card.Body>
					</>
				) : (
					<>
						<Card.Header>{ blockTxs.length !== 0 ? `Block ${blockTxs[0].blockNumber} Txs` : "Click on any block" }</Card.Header>
						<Card.Body style={{ overflowY: 'scroll' }}>
							<ListGroup>
								{
									blockTxs.map((value, index) => (
										<ListGroup.Item action onClick={() => handleOnClick(value.hash)} key={index}>
											{value.hash}
										</ListGroup.Item>
									))
								}
							</ListGroup>
						</Card.Body>
					</>
				)
			}
		</Card>
	)
}

export default Transactions

