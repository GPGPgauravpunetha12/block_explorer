import { Utils } from 'alchemy-sdk';
import React from 'react'
import { Card, Row, Spinner, Table } from 'react-bootstrap';

const TransactionDetail = (props) => {
	var gasPrice, gasUsedByTxn, txFee;
	const { txIsLoading, tx, receipt } = props;
	
	if (receipt) {
		gasPrice = parseInt(receipt.effectiveGasPrice);
		gasUsedByTxn = parseInt(receipt.gasUsed);
		txFee = gasPrice * gasUsedByTxn;
		
		console.log("gasPrice", gasPrice);
		console.log("gasUsedByTxn", gasUsedByTxn);
		console.log("txFee", txFee);
	}
	
	return (
		<Card className='h-100'>
			{
				txIsLoading ? (
					<>
						<Card.Body>
							<Row className='justify-content-center align-items-center h-100'>
								<Spinner animation='grow' variant="primary" />
							</Row>
						</Card.Body>
					</>
				) : (
					tx ? (		
						<>
							<Card.Header>{tx.hash}</Card.Header>
							<Card.Body style={{ overflowY: 'scroll' }}>
								<Table striped hover>
									<tbody>
										<tr>
											<th scope="row">Block Number</th>
											<td>{tx.blockNumber}</td>
										</tr>
										<tr>
											<th scope="row">ChainID</th>
											<td>{tx.chainId}</td>
										</tr>
										<tr>
											<th scope="row">Confirmations</th>
											<td>{tx.confirmations}</td>
										</tr>
										<tr>
											<th scope="row">From</th>
											<td>{tx.from}</td>
										</tr>
										<tr>
											<th scope="row">To</th>
											<td>{tx.to}</td>
										</tr>
										<tr>
											<th scope="row">Gas Price</th>
											<td>{Utils.formatUnits(`${gasPrice}`, "gwei")} Wei</td>
										</tr>
										<tr>
											<th scope="row">Gas used by Txn</th>
											<td>{gasUsedByTxn} Wei</td>
										</tr>
										<tr>
											<th scope="row">Transaction fee</th>
											<td>{Utils.formatUnits(`${txFee}`, "ether")} ETH</td>
											{/* used  for convrtng it to ethr  */}
										</tr>
										<tr>
											<th scope="row">Value</th>
											<td>{Utils.formatUnits(parseInt(tx.value), "ether")} ETH</td>
										</tr>
									</tbody>
								</Table>
							</Card.Body>
						</>
					) : (
						<>
							<Card.Header> Click on any transaction hash</Card.Header>
						</>
					)
				)
			}
		</Card>
	)
}

export default TransactionDetail