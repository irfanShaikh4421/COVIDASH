import React, { useState } from 'react';

const Symptoms = (props) => {
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

        setStr(`You have ${tmp} chance of having Covid-19`);
    }

    return (
        <div className="centeredFlex">
            <div className="travelContainer">
                <h1 style={{ fontWeight: 350 }}> Symptoms Checklist</h1>
                <br /> <br />
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="label">
                        Fever :{' '}
                        <label>
                            <input
                                type="radio"
                                value={true}
                                name="fever"
                                onChange={() =>
                                    setSymptoms({ ...symptoms, fever: true })
                                }
                            />{' '}
                            Yes{' '}
                        </label>{' '}
                        :{' '}
                        <label>
                            {' '}
                            <input
                                type="radio"
                                name="fever"
                                onChange={() =>
                                    setSymptoms({ ...symptoms, fever: false })
                                }
                            />{' '}
                            No{' '}
                        </label>
                    </div>
                    <div className="label">
                        Cough :{' '}
                        <label>
                            <input
                                type="radio"
                                value={true}
                                name="cough"
                                onChange={() =>
                                    setSymptoms({ ...symptoms, cough: true })
                                }
                            />{' '}
                            Yes{' '}
                        </label>{' '}
                        :{' '}
                        <label>
                            {' '}
                            <input
                                type="radio"
                                name="cough"
                                onChange={() =>
                                    setSymptoms({ ...symptoms, cough: false })
                                }
                            />{' '}
                            No{' '}
                        </label>
                    </div>
                    <div className="label">
                        Sore Throat :{' '}
                        <label>
                            <input
                                type="radio"
                                value={true}
                                name="soreThroat"
                                onChange={() =>
                                    setSymptoms({
                                        ...symptoms,
                                        soreThroat: true,
                                    })
                                }
                            />{' '}
                            Yes{' '}
                        </label>{' '}
                        :{' '}
                        <label>
                            {' '}
                            <input
                                type="radio"
                                name="soreThroat"
                                onChange={() =>
                                    setSymptoms({
                                        ...symptoms,
                                        soreThroat: false,
                                    })
                                }
                            />{' '}
                            No{' '}
                        </label>
                    </div>
                    <div className="label">
                        Loss Of Smell :{' '}
                        <label>
                            <input
                                type="radio"
                                value={true}
                                name="lossOfSmell"
                                onChange={() =>
                                    setSymptoms({
                                        ...symptoms,
                                        lossOfSmell: true,
                                    })
                                }
                            />{' '}
                            Yes{' '}
                        </label>{' '}
                        :{' '}
                        <label>
                            {' '}
                            <input
                                type="radio"
                                name="lossOfSmell"
                                onChange={() =>
                                    setSymptoms({
                                        ...symptoms,
                                        lossOfSmell: false,
                                    })
                                }
                            />{' '}
                            No{' '}
                        </label>
                    </div>
                    <div className="label">
                        Headache :{' '}
                        <label>
                            <input
                                type="radio"
                                value={true}
                                name="headache"
                                onChange={() =>
                                    setSymptoms({ ...symptoms, headache: true })
                                }
                            />{' '}
                            Yes{' '}
                        </label>{' '}
                        :{' '}
                        <label>
                            {' '}
                            <input
                                type="radio"
                                name="headache"
                                onChange={() =>
                                    setSymptoms({
                                        ...symptoms,
                                        headache: false,
                                    })
                                }
                            />{' '}
                            No{' '}
                        </label>
                    </div>
                    <div className="label">
                        Vomit :{' '}
                        <label>
                            <input
                                type="radio"
                                value={true}
                                name="vomit"
                                onChange={() =>
                                    setSymptoms({ ...symptoms, vomit: true })
                                }
                            />{' '}
                            Yes{' '}
                        </label>{' '}
                        :{' '}
                        <label>
                            {' '}
                            <input
                                type="radio"
                                name="vomit"
                                onChange={() =>
                                    setSymptoms({ ...symptoms, vomit: false })
                                }
                            />{' '}
                            No{' '}
                        </label>
                    </div>
                    <div className="label">
                        Diarrhea :{' '}
                        <label>
                            <input
                                type="radio"
                                value={true}
                                name="diarrhea"
                                onChange={() =>
                                    setSymptoms({ ...symptoms, diarrhea: true })
                                }
                            />{' '}
                            Yes{' '}
                        </label>{' '}
                        :{' '}
                        <label>
                            {' '}
                            <input
                                type="radio"
                                name="diarrhea"
                                onChange={() =>
                                    setSymptoms({
                                        ...symptoms,
                                        diarrhea: false,
                                    })
                                }
                            />{' '}
                            No{' '}
                        </label>
                    </div>
                    <br />
                    <div>
                        <button onClick={() => handleSymptomCalc()}>
                            Should I be worried ?
                        </button>
                    </div>
                    <br />
                    {result > 0 ? <p className="label">{str}</p> : null}
                </form>
            </div>
        </div>
    );
};

export default Symptoms;
