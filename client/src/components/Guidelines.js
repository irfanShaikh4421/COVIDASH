import React from 'react';
import { Typography, Card } from 'antd';

const Guidelines = () => {
	const { Title } = Typography;

	return (
		<div>
			<Title>Things to know about the COVID-19</Title>
			<span className="sub-heading margin-small-bottom">
				Source:&nbsp;
				<a
					target="blank"
					href="https://www.cdc.gov/coronavirus/2019-ncov/your-health/need-to-know.html"
					className="color-blue"
				>
					CDC
				</a>
			</span>
			<Card className="news-card margin-bottom">
				<div className="card-content">
					<span className="card-title">
						Three Important Ways to Slow the Spread
					</span>
					<span className="card-body">
						<ol>
							<li>
								Wear a mask to protect yourself and others and stop the spread
								of COVID-19.
							</li>
							<li>
								Stay at least 6 feet (about 2 arm lengths) from others who don’t
								live with you, particularly in crowded areas.
							</li>
							<li>
								Wash your hands with soap and water for 20 seconds or use hand
								sanitizer with at least 60% alcohol.
							</li>
						</ol>
					</span>
				</div>
			</Card>
			<Card className="news-card margin-bottom">
				<div className="card-content">
					<span className="card-title">
						How to Protect Yourself When Going Out
					</span>
					<span className="card-body">
						<ol>
							<li>
								Wear a mask that covers your nose and mouth to help protect
								yourself and others. Choose a mask with two or more layers of
								washable, breathable fabric that fits snugly against the sides
								of your face.
							</li>
							<li>
								Stay 6 feet apart and avoid crowds. The more people you are in
								contact with, the more likely you are to be exposed to COVID-19.
							</li>
							<li>
								Avoid indoor spaces as much as possible, particularly ones that
								aren’t well ventilated. You may find it harder to stay 6 feet
								apart in indoor spaces.
							</li>
							<li>
								Wash your hands often. Use soap and water for 20 seconds,
								especially after you have been in a public place or hand
								sanitizer if soap and water aren’t available.
							</li>
						</ol>
					</span>
				</div>
			</Card>
			<Card className="news-card margin-bottom">
				<div className="card-content">
					<span className="card-title">
						If You are at Risk of Getting Very Sick
					</span>
					<span className="card-body">
						<ol>
							<li>
								People of any age can get COVID-19, even healthy young adults
								and children.
							</li>
							<li>
								People who are older or have certain underlying medical
								conditions are at higher risk of getting very sick from
								COVID-19.
							</li>
							<li>
								People who are older or have certain underlying medical
								conditions are at higher risk of getting very sick from
								COVID-19.
							</li>
							<li>
								Other groups may be at higher risk for getting COVID-19 or
								having more severe illness.
							</li>
						</ol>
					</span>
				</div>
			</Card>
			<Card className="news-card margin-bottom">
				<div className="card-content">
					<span className="card-title">What to Do If You're Sick</span>
					<span className="card-body">
						<ol>
							<li>
								Stay home except to get medical care. Most people with COVID-19
								have mild illness and recover at home without medical care.
							</li>
							<li>
								Isolate yourself from other members of your family to prevent
								spread to them and the people that they may have contact with,
								like grandparents. If you have to leave isolation, wear a mask,
								stay 6 feet apart from others, wash your hands frequently, and
								clean all touched surfaces.
							</li>
							<li>
								Even if you don’t feel sick, you can spread COVID-19 to others.
								Be sure that you protect everyone as though they are the most
								fragile person in your family.
							</li>
							<li>
								Get care immediately if you are having emergency warning signs,
								like trouble breathing, pain or pressure in chest.
							</li>
						</ol>
					</span>
				</div>
			</Card>
			<Card className="news-card margin-bottom">
				<div className="card-content">
					<span className="card-title">
						How to Get a Test for Current Infection
					</span>
					<span className="card-body">
						<ol>
							<li>
								You can visit your state or local health department’s website to
								look for the latest local information on testing.
							</li>
							<li>
								If you have symptoms of COVID-19 and want to get tested, call
								your healthcare provider first.
							</li>
							<li>
								If you have symptoms of COVID-19 and choose to not get tested,
								it is important to stay home. Find out what to do if you are
								sick.
							</li>
						</ol>
					</span>
				</div>
			</Card>
			<Card className="news-card margin-bottom">
				<div className="card-content">
					<span className="card-title">How to Cope with Stress</span>
					<span className="card-body">
						<ol>
							<li>Care for yourself one small way each day.</li>
							<li>Unwind by doing yoga, listening to music, or gardening.</li>
							<li>
								Find new ways to connect with family and friends, get support,
								and share feelings.
							</li>
							<li>Eat healthy foods and get enough rest.</li>
							<li>
								Relax by reading, listening to music, or starting a new hobby.
							</li>
						</ol>
					</span>
				</div>
			</Card>
			<Card className="news-card margin-bottom">
				<div className="card-content">
					<span className="card-title">What Symptoms to Watch For</span>
					<span className="card-body">
						<ol>
							<li>Fever</li>
							<li>Cough</li>
							<li>Headaches</li>
							<li>Fatigue</li>
							<li>Muscle or body aches</li>
							<li>Loss of taste or smell</li>
							<li>Sore throat</li>
							<li>Nausea</li>
							<li>Diarrhea</li>
						</ol>
					</span>
				</div>
			</Card>
		</div>
	);
};

export default Guidelines;
