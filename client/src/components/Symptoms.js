import React, { useState } from 'react';
import { Typography, Checkbox, Button, Card } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

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
    const [temp, setTemp] = useState('');

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
        if (res > 0.5) setTemp('high');
        else if (0.2 <= res) setTemp('moderate');
        else if (res < 0.2) setTemp('low');
    }

    const titleColor = () => {
        if (temp === 'high') {
            return (
                <Title level={2} className="color-red">
                    {`You have ${temp} chances of having COVID-19`}
                </Title>
            );
        } else if (temp === 'moderate') {
            return (
                <Title level={2} className="color-orange">
                    {`You have ${temp} chances of having COVID-19`}
                </Title>
            );
        } else {
            return (
                <Title level={2} className="color-yellow">
                    {`You have ${temp} chances of having COVID-19`}
                </Title>
            );
        }
    };

    return (
        <div className="align-left flex-column">
            <Title>Self checker</Title>
            <Text className="symptom-header color-gray">
                Select the symptoms you have and click the button to check if
                you are infected
            </Text>
            <form onSubmit={(e) => e.preventDefault()} className="flex-column">
                <Checkbox
                    onChange={() =>
                        setSymptoms({ ...symptoms, fever: !symptoms.fever })
                    }
                    className="label"
                >
                    Fever
                </Checkbox>
                <Checkbox
                    onChange={() =>
                        setSymptoms({ ...symptoms, cough: !symptoms.cough })
                    }
                    className="label"
                >
                    Cough
                </Checkbox>
                <Checkbox
                    onChange={() =>
                        setSymptoms({
                            ...symptoms,
                            soreThroat: !symptoms.soreThroat,
                        })
                    }
                    className="label"
                >
                    Sore throat
                </Checkbox>
                <Checkbox
                    onChange={() =>
                        setSymptoms({
                            ...symptoms,
                            lossOfSmell: !symptoms.lossOfSmell,
                        })
                    }
                    className="label"
                >
                    Loss of smell
                </Checkbox>
                <Checkbox
                    onChange={() =>
                        setSymptoms({
                            ...symptoms,
                            headache: !symptoms.headache,
                        })
                    }
                    className="label"
                >
                    Headache
                </Checkbox>
                <Checkbox
                    onChange={() =>
                        setSymptoms({ ...symptoms, vomit: !symptoms.vomit })
                    }
                    className="label"
                >
                    Vomitting
                </Checkbox>
                <Checkbox
                    onChange={() =>
                        setSymptoms({
                            ...symptoms,
                            diarrhea: !symptoms.diarrhea,
                        })
                    }
                    className="label"
                >
                    Diarrhea
                </Checkbox>
                <Button
                    type="primary"
                    className="symptom-btn"
                    onClick={() => handleSymptomCalc()}
                >
                    Am I infected?
                </Button>
                {result > 0 ? (
                    <Card className="flex-column">
                        {titleColor()}
                        <Text>
                            If symptoms increase, please quarantine yourself and
                            get tested to know if you have COVID-19.
                        </Text>
                        <Link to="/testing" style={{ display: 'block' }}>
                            <Button
                                className="testing-btn"
                                icon={<EnvironmentOutlined />}
                            >
                                Check testing locations
                            </Button>
                        </Link>
                    </Card>
                ) : result === null ? null : (
                    <Card>
                        <Title level={2} className="color-green">
                            Congratulations! You are safe.
                        </Title>
                        <Text>
                            Please wear a mask to keep yourself and others
                            around you safe.
                        </Text>
                    </Card>
                )}
            </form>
        </div>
    );
};

export default Symptoms;
