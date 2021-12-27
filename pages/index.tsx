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
	const [mode, setMode] = useState("recursive");
	const [collectionId, setCollectionId] = useState("");
	const [url, setUrl] = useState("");

	useEffect(() => {

		const baseUrl = "https://zotero-overleaf.xyz/api/"
		const config = {
			ownerType,
			format: formatType,
			mode,
			ownerId,
			collectionId
		}

		setUrl(baseUrl + "?" + QueryString.stringify(config, {}));

	}, [ownerType, formatType, mode, collectionId, ownerId]);

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
					<h2>Owner</h2>
					<TextField
						value={ownerId}
						onChange={ev => setOwnerId(ev.target.value)} label="Owner Id" variant="standard"/>
					<FormControl component="fieldset">
						<FormLabel component="legend">Owner Type:</FormLabel>
						<RadioGroup value={ownerType} onChange={ev => setOwnerType(ev.target.value)}>
							<FormControlLabel value="user" control={<Radio/>} label="User"/>
							<FormControlLabel value="group" control={<Radio/>} label="Group"/>
						</RadioGroup>
					</FormControl>
					<h2>Format</h2>
					<FormControl component="fieldset">
						<FormLabel component="legend">Format:</FormLabel>
						<RadioGroup value={formatType} onChange={ev => setFormatType(ev.target.value)}>
							<FormControlLabel value="bibtex" control={<Radio/>} label="bibtex"/>
							<FormControlLabel value="json" control={<Radio/>} label="json"/>
						</RadioGroup>
					</FormControl>
					<FormControl component="fieldset">
						<FormLabel component="legend">Mode:</FormLabel>
						<RadioGroup value={mode} onChange={ev => setMode(ev.target.value)}>
							<FormControlLabel value="recursive" control={<Radio/>} label="Recurisve"/>
							<FormControlLabel value="single" control={<Radio/>} label="Single"/>
						</RadioGroup>
					</FormControl>
					<h2>Collection</h2>
					<TextField
						value={collectionId}
						onChange={ev => setCollectionId(ev.target.value)} label="Collection Id" variant="standard"/>
				</FormGroup>
				<h2>API URL</h2>
				<Paper className={styles.url} elevation={3}>
					<span>{url}</span>
				</Paper>
				<Button onClick={() => {
					navigator.clipboard.writeText(url).catch(console.error);
				}} variant="contained">Copy</Button>
				<Button
					onClick={() => {
						setOwnerType("user");
						setOwnerId("");
						setFormatType("bibtex");
						setMode("recursive");
						setCollectionId("");
					}}
					className={styles.clearButton} variant="text">Clear</Button>
			</Container>
		</Box>
	);
};

export default Home;
