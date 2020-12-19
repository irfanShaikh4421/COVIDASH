import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import '../App.css';

import { Layout, Menu } from 'antd';
import {
	PieChartOutlined,
	MedicineBoxOutlined,
	CarOutlined,
	AlertOutlined,
	HeartOutlined,
	PushpinOutlined,
	UserOutlined,
	BugOutlined,
	HomeOutlined,
	CheckCircleOutlined,
	LoginOutlined,
	PlusCircleOutlined,
	EnvironmentOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Navigation = () => {
	const { currentUser } = useContext(AuthContext);

	const NavigationAuth = () => {
		return (
			<Layout className="hide-mobile">
				<Sider
					style={{
						overflow: 'auto',
						height: '100vh',
						position: 'fixed',
						left: 0,
					}}
				>
					<Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
						<Menu.Item key="1" className="logo">
							<Link to="/">COVIDASH</Link>
						</Menu.Item>
						<Menu.Item key="1" icon={<HomeOutlined />}>
							<Link to="/">Home</Link>
						</Menu.Item>
						<Menu.Item key="2" icon={<PieChartOutlined />}>
							<Link to="/charts">Charts</Link>
						</Menu.Item>
						<Menu.Item key="3" icon={<MedicineBoxOutlined />}>
							<Link to="/news">News</Link>
						</Menu.Item>
						<Menu.Item key="4" icon={<PushpinOutlined />}>
							<Link to="/map">Outbreak map</Link>
						</Menu.Item>
						<Menu.Item key="5" icon={<CheckCircleOutlined />}>
							<Link to="/symptoms">Self checker</Link>
						</Menu.Item>
						<Menu.Item key="6" icon={<EnvironmentOutlined />}>
							<Link to="/testing">Testing locations</Link>
						</Menu.Item>
						<Menu.Item key="7" icon={<BugOutlined />}>
							<Link to="/vaccine">Vaccines</Link>
						</Menu.Item>
						<Menu.Item key="8" icon={<HeartOutlined />}>
							<Link to="/guidelines">Safety guidelines</Link>
						</Menu.Item>
						<Menu.Item key="9" icon={<CarOutlined />}>
							<Link to="/travel">Travel regulations</Link>
						</Menu.Item>
						<Menu.Item key="10" icon={<AlertOutlined />}>
							<Link to="/bed-utilization">Hospital capacity</Link>
						</Menu.Item>
						<Menu.Item key="11" icon={<UserOutlined />}>
							<Link to="/account">Account</Link>
						</Menu.Item>
					</Menu>
				</Sider>
			</Layout>
		);
	};

	const NavigationUnauth = () => {
		return (
			<Layout className="hide-mobile">
				<Sider
					style={{
						overflow: 'auto',
						height: '100vh',
						position: 'fixed',
						left: 0,
					}}
				>
					<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
						<Menu.Item key="1" className="logo">
							<Link to="/">COVIDASH</Link>
						</Menu.Item>
						<Menu.Item key="1" icon={<HomeOutlined />}>
							<Link to="/">Home</Link>
						</Menu.Item>
						<Menu.Item key="2" icon={<PieChartOutlined />}>
							<Link to="/charts">Charts</Link>
						</Menu.Item>
						<Menu.Item key="3" icon={<MedicineBoxOutlined />}>
							<Link to="/news">News</Link>
						</Menu.Item>
						<Menu.Item key="4" icon={<PushpinOutlined />}>
							<Link to="/map">Outbreak map</Link>
						</Menu.Item>
						<Menu.Item key="5" icon={<CheckCircleOutlined />}>
							<Link to="/symptoms">Self checker</Link>
						</Menu.Item>
						<Menu.Item key="6" icon={<EnvironmentOutlined />}>
							<Link to="/testing">Testing locations</Link>
						</Menu.Item>
						<Menu.Item key="7" icon={<BugOutlined />}>
							<Link to="/vaccine">Vaccines</Link>
						</Menu.Item>
						<Menu.Item key="8" icon={<HeartOutlined />}>
							<Link to="/guidelines">Safety guidelines</Link>
						</Menu.Item>
						<Menu.Item key="9" icon={<CarOutlined />}>
							<Link to="/travel">Travel regulations</Link>
						</Menu.Item>
						<Menu.Item key="10" icon={<AlertOutlined />}>
							<Link to="/bed-utilization">Hospital capacity</Link>
						</Menu.Item>
						<Menu.Item key="12" icon={<PlusCircleOutlined />}>
							<Link to="/signup">Register</Link>
						</Menu.Item>
						<Menu.Item key="11" icon={<LoginOutlined />}>
							<Link to="/login">Login</Link>
						</Menu.Item>
					</Menu>
				</Sider>
			</Layout>
		);
	};

	return <div>{currentUser ? NavigationAuth() : NavigationUnauth()}</div>;
};

export default Navigation;
