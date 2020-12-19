import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { Card, Row, Col, Typography, Collapse } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Vaccine = () => {
	const [vaccineData, setVaccineData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(undefined);

	const { Title } = Typography;
	const { Panel } = Collapse;

	useEffect(() => {
		async function getData() {
			setLoading(true);
			setError(undefined);
			//const url = 'https://disease.sh/v3/covid-19/vaccine';
			console.log('get Vaccine data useEffect launched');
			try {
				const response = await axios.get('/vaccine');
				setVaccineData(response.data.data);
				setLoading(false);
			} catch (e) {
				setLoading(false);
				setError(e);
				console.log(e);
			}
		}
		getData();
	}, []);

	if (error) {
		return (
			<>
				<Title>Vaccines for COVID-19</Title>
				<span className="sub-info">
					{error.name}: {error.message}
				</span>
			</>
		);
	}

	if (loading) {
		return <LoadingOutlined className="loader" />;
	}

	return (
		<div>
			<Title>Vaccines for COVID-19</Title>
			<span className="sub-heading margin-small-bottom">
				Source:&nbsp;
				<a
					target="blank"
					href="https://disease.sh/docs/#/COVID-19%3A%20Vaccine"
					className="color-blue"
				>
					Disease.sh
				</a>
			</span>
			<Row gutter={[40, 30]}>
				{vaccineData.map((item, index) => (
					<Col className="full-width" sm={24} md={12} lg={8} key={index}>
						<Card hoverable className="flex-column news-card">
							<span className="card-title">{item.candidate}</span>
							<span className="sub-heading">Mechanism:</span>
							<span className="schedule">{item.mechanism}</span>
							<span className="sub-heading">Sponsors:</span>
							{item.sponsors.map((sponsor, index) => (
								<span key={index} className="schedule">
									{sponsor}
								</span>
							))}
							<span className="sub-heading">Trial phase:</span>
							<span className="schedule">{item.trialPhase}</span>
							<Collapse accordion bordered={false}>
								<Panel
									header="Vaccine details"
									key={index}
									className="collapse-header"
								>
									<span className="details">
										{item.details
											.replace(/&nbsp;/g, ' ' /** FUN WITH REGEX*/)
											.replace(/&.squo;|&#39;/g, "'")
											.replace(/&.dquo;|&quot;/g, '"')
											.replace(/&ndash;/g, '-')}
									</span>
								</Panel>
							</Collapse>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default Vaccine;
