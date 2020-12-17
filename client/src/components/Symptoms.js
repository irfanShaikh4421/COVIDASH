import React, { useState } from 'react';
import { Typography } from 'antd';
import { Checkbox, Button, Card } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';

const Symptoms = () => {
	const { Title, Text } = Typography;

	const symptomsWeight = {
		fever: 0.15,
		cough: 0.15,
		soreThroat: 0.1,
		lossOfSmell: 0.2,
		headache: 0.07,
		vomit: 0.05,
		diarrhea: 0.05,
	};
	const [symptoms, setSymptoms] = useState({
		fever: false,
		cough: false,
		soreThroat: false,
		lossOfSmell: false,
		headache: false,
		vomit: false,
		diarrhea: false,
	});
	const [result, setResult] = useState(null);
	const [str, setStr] = useState('');

	function handleSymptomCalc() {
		let tmp = Object.keys(symptoms);
		let sum = 0;
		for (let a of tmp) {
			if (symptoms[a]) {
				let val = symptomsWeight[a];
				sum += val;
			}
		}
		setResult(sum);
		generatePrediction(sum);
	}

	function generatePrediction(res) {
		let tmp = '';
		if (res > 0.5) tmp = 'high';
		else if (0.2 <= res) tmp = 'moderate';
		else if (res < 0.2) tmp = 'low';

		setStr(`You have ${tmp} chances of having COVID-19`);
	}

	return (
		<div className="flex-center">
			<div className="align-left">
				<Title>Self checker</Title>
				<Text className="symptom-header">
					Select the symptoms you have and click the button to check if you are
					infected
				</Text>
				<br />
				<form onSubmit={(e) => e.preventDefault()}>
					<div className="label">
						<Checkbox
							onChange={() =>
								setSymptoms({ ...symptoms, fever: !symptoms.fever })
							}
						>
							Fever
						</Checkbox>
					</div>
					<div className="label">
						<Checkbox
							onChange={() =>
								setSymptoms({ ...symptoms, cough: !symptoms.cough })
							}
						>
							Cough
						</Checkbox>
					</div>
					<div className="label">
						<Checkbox
							onChange={() =>
								setSymptoms({ ...symptoms, soreThroat: !symptoms.soreThroat })
							}
						>
							Sore throat
						</Checkbox>
					</div>
					<div className="label">
						<Checkbox
							onChange={() =>
								setSymptoms({ ...symptoms, lossOfSmell: !symptoms.lossOfSmell })
							}
						>
							Loss of smell
						</Checkbox>
					</div>
					<div className="label">
						<Checkbox
							onChange={() =>
								setSymptoms({ ...symptoms, headache: !symptoms.headache })
							}
						>
							Headache
						</Checkbox>
					</div>
					<div className="label">
						<Checkbox
							onChange={() =>
								setSymptoms({ ...symptoms, vomit: !symptoms.vomit })
							}
						>
							Vomitting
						</Checkbox>
					</div>
					<div className="label">
						<Checkbox
							onChange={() =>
								setSymptoms({ ...symptoms, diarrhea: !symptoms.diarrhea })
							}
						>
							Diarrhea
						</Checkbox>
					</div>
					<br />
					<div>
						<Button type="primary" onClick={() => handleSymptomCalc()}>
							Am I infected?
						</Button>
					</div>
					<br />
					{result > 0 ? (
						<Card className="flex-column">
							<Title level={2} className="color-red">
								{str}
							</Title>
							<Text>
								If symptoms increase, please quarantine yourself and get tested
								to know if you have COVID-19.
							</Text>
							<Button
								href="/testing"
								className="testing-btn"
								icon={<EnvironmentOutlined />}
							>
								Check testing locations
							</Button>
						</Card>
					) : result === null ? null : (
						<Card>
							<Title level={2} className="color-green">
								Congrats! You are safe.
							</Title>
							<Text>
								Please wear a mask to keep yourself and others around you safe.
							</Text>
						</Card>
					)}
				</form>
			</div>
		</div>
	);
};

export default Symptoms;
