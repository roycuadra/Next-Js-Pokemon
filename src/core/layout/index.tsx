//#region Import
import { AppShell, Container } from "@mantine/core";
import { ILayout } from "../interface/Layout";
import AppHeader from "./_header";
import menuJson from "./menu-header.json";
import AppFooter from "./_footer";
import AlertMessage from "../components/_alert";
import { motion } from "framer-motion";
//#endregion

const variants = {
	hidden: { opacity: 0, x: -200, y: 0 },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: 0, y: -100 },
}

const AppLayout = ({ children }: ILayout) => {

	return (
		<AppShell
			header={<AppHeader links={menuJson.links} />}
			footer={<AppFooter />}
		>

			<Container>
				{children}
			</Container>
		</AppShell >
	);
};

export default AppLayout;
