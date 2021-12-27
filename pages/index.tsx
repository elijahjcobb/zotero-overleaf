import type {NextPage} from 'next';
import styles from '../styles/Home.module.scss';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import {Button, Container, Paper} from "@mui/material";
import {useEffect, useState} from "react";
import QueryString from "query-string";

const Home: NextPage = () => {

	const [ownerType, setOwnerType] = useState("user");
	const [ownerId, setOwnerId] = useState("");
	const [formatType, setFormatType] = useState("bibtex");
	const [recursive, setRecursive] = useState(false);
	const [collectionId, setCollectionId] = useState("");
	const [url, setUrl] = useState("");

	useEffect(() => {

		const baseUrl = "https://zotero-overleaf.xyz/api/"
		const config = {
			ownerType,
			format: formatType,
			recursive,
			ownerId,
			collectionId
		}

		setUrl(baseUrl + "?" + QueryString.stringify(config, {}));

	}, [ownerType, formatType, recursive, collectionId, ownerId]);

	return (
		<Box sx={{flexGrow: 1}}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{flexGrow: 1}}>
						zotero-overleaf.xyz
					</Typography>
				</Toolbar>
			</AppBar>
			<Container maxWidth={"sm"} className={styles.container}>
				<FormGroup className={styles.form}>
					<FormControl component="fieldset">
						<FormLabel component="legend">Owner Type:</FormLabel>
						<RadioGroup value={ownerType} onChange={ev => setOwnerType(ev.target.value)}>
							<FormControlLabel value="user" control={<Radio/>} label="User"/>
							<FormControlLabel value="group" control={<Radio/>} label="Group"/>
						</RadioGroup>
					</FormControl>
					<TextField
						value={ownerId}
						onChange={ev => setOwnerId(ev.target.value)} label="Owner Id" variant="standard"/>
					<FormControl component="fieldset">
						<FormLabel component="legend">Format:</FormLabel>
						<RadioGroup value={formatType} onChange={ev => setFormatType(ev.target.value)}>
							<FormControlLabel value="bibtex" control={<Radio/>} label="bibtex"/>
							<FormControlLabel value="json" control={<Radio/>} label="json"/>
						</RadioGroup>
					</FormControl>
					<FormControlLabel control={<Switch
						value={recursive}
						onChange={(e, v) => setRecursive(v)}
						defaultChecked/>} label="Recursive"/>
					<TextField
						value={collectionId}
						onChange={ev => setCollectionId(ev.target.value)} label="Collection Id" variant="standard"/>
				</FormGroup>
				<Button variant="contained">Copy</Button>
			</Container>
		</Box>
	);
};

export default Home;
