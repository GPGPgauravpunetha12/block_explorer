import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { alchemy } from '../App.js';

const LatestBlock = (props) => {
	const { blockNumber, setBlockTxs, setBlockTxIsLoading, setTx } = props;
	const handleOnClick = async (block) => {
		setBlockTxIsLoading(true);
		const { transactions } = await alchemy.core.getBlockWithTransactions(block);
		setBlockTxs(transactions);
		setBlockTxIsLoading(false);
		setTx(null);
		console.log(transactions);
	}
	
	return (
		<Card className='h-100'>
			<Card.Header>Latest Block</Card.Header>
			<Card.Body style={{ overflowY: 'scroll' }}>
				<ListGroup>
					{
						blockNumber.map((value, index) => (
							<ListGroup.Item action onClick={() => handleOnClick(value)} key={index}>
								{value}
							</ListGroup.Item>
						))
					}
				</ListGroup>
			</Card.Body>
		</Card>
	)
}

export default LatestBlock