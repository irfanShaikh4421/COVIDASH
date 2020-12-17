import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import '../App.css';
import { doSignOut } from '../firebase/FirebaseFunctions';

import { Drawer, Button, Menu } from 'antd';

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
	LogoutOutlined,
	PlusCircleOutlined,
	MenuOutlined,
	EnvironmentOutlined,
} from '@ant-design/icons';

const MobileNavigation = () => {
	const { currentUser } = useContext(AuthContext);
	const [visible, setVisible] = useState(false);
	const placement = 'bottom';

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	const signOutCloseDrawer = () => {
		doSignOut();
		setVisible(false);
	};

	const NavigationAuth = () => {
		return (
			<Menu defaultSelectedKeys={['1']} mode="inline">
				<Menu.Item key="1" icon={<HomeOutlined />}>
					<Link to="/" onClick={onClose}>
						Home
					</Link>
				</Menu.Item>
				<Menu.Item key="2" icon={<PieChartOutlined />}>
					<Link to="/charts" onClick={onClose}>
						Chart
					</Link>
				</Menu.Item>
				<Menu.Item key="3" icon={<MedicineBoxOutlined />}>
					<Link to="/news" onClick={onClose}>
						News
					</Link>
				</Menu.Item>
				<Menu.Item key="4" icon={<PushpinOutlined />}>
					<Link to="/map" onClick={onClose}>
						Outbreak map
					</Link>
				</Menu.Item>
				<Menu.Item key="5" icon={<CheckCircleOutlined />}>
					<Link to="/symptoms" onClick={onClose}>
						Self checker
					</Link>
				</Menu.Item>
				<Menu.Item key="6" icon={<EnvironmentOutlined />}>
					<Link to="/testing" onClick={onClose}>
						Testing locations
					</Link>
				</Menu.Item>
				<Menu.Item key="7" icon={<BugOutlined />}>
					<Link to="/vaccine" onClick={onClose}>
						Vaccines
					</Link>
				</Menu.Item>
				<Menu.Item key="8" icon={<HeartOutlined />}>
					<Link to="/guidelines" onClick={onClose}>
						Safety guidelines
					</Link>
				</Menu.Item>
				<Menu.Item key="9" icon={<CarOutlined />}>
					<Link to="/travel" onClick={onClose}>
						Travel regulations
					</Link>
				</Menu.Item>
				<Menu.Item key="10" icon={<AlertOutlined />}>
					<Link to="/bed-utilization" onClick={onClose}>
						Hospital capacity
					</Link>
				</Menu.Item>
				<Menu.Item key="11" icon={<UserOutlined />}>
					<Link to="/account" onClick={onClose}>
						Account
					</Link>
				</Menu.Item>
				<Menu.Item key="12" icon={<LogoutOutlined />}>
					<span onClick={signOutCloseDrawer}>Sign out</span>
				</Menu.Item>
			</Menu>
		);
	};

	const NavigationUnauth = () => {
		return (
			<Menu defaultSelectedKeys={['1']} mode="inline">
				<Menu.Item key="1" icon={<HomeOutlined />}>
					<Link to="/" onClick={onClose}>
						Home
					</Link>
				</Menu.Item>
				<Menu.Item key="2" icon={<PieChartOutlined />}>
					<Link to="/charts" onClick={onClose}>
						Chart
					</Link>
				</Menu.Item>
				<Menu.Item key="3" icon={<MedicineBoxOutlined />}>
					<Link to="/news" onClick={onClose}>
						News
					</Link>
				</Menu.Item>
				<Menu.Item key="4" icon={<PushpinOutlined />}>
					<Link to="/map" onClick={onClose}>
						Outbreak map
					</Link>
				</Menu.Item>
				<Menu.Item key="5" icon={<CheckCircleOutlined />}>
					<Link to="/symptoms" onClick={onClose}>
						Self checker
					</Link>
				</Menu.Item>
				<Menu.Item key="6" icon={<EnvironmentOutlined />}>
					<Link to="/testing" onClick={onClose}>
						Testing locations
					</Link>
				</Menu.Item>
				<Menu.Item key="7" icon={<BugOutlined />}>
					<Link to="/vaccine" onClick={onClose}>
						Vaccines
					</Link>
				</Menu.Item>
				<Menu.Item key="8" icon={<HeartOutlined />}>
					<Link to="/guidelines" onClick={onClose}>
						Safety guidelines
					</Link>
				</Menu.Item>
				<Menu.Item key="9" icon={<CarOutlined />}>
					<Link to="/travel" onClick={onClose}>
						Travel regulations
					</Link>
				</Menu.Item>
				<Menu.Item key="10" icon={<AlertOutlined />}>
					<Link to="/bed-utilization" onClick={onClose}>
						Hospital capacity
					</Link>
				</Menu.Item>
				<Menu.Item key="11" icon={<PlusCircleOutlined />}>
					<Link to="/signup" onClick={onClose}>
						Register
					</Link>
				</Menu.Item>
				<Menu.Item key="12" icon={<LoginOutlined />}>
					<Link to="/login" onClick={onClose}>
						Login
					</Link>
				</Menu.Item>
			</Menu>
		);
	};

	const whichNavigation = () => {
		return <div>{currentUser ? NavigationAuth() : NavigationUnauth()}</div>;
	};

	return (
		<>
			<Button type="primary" onClick={showDrawer} className="floating-menu">
				<MenuOutlined />
			</Button>
			<Drawer
				title="Covidash"
				placement={placement}
				closable={false}
				onClose={onClose}
				visible={visible}
				key={placement}
				height={'auto'}
			>
				{whichNavigation()}
			</Drawer>
		</>
	);
};

export default MobileNavigation;
