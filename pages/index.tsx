import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
	return (
		<div>
			<h1>zotero-overleaf</h1>
			<input name={"account"} type={"radio"} value={"group"} id={"group"}/>
			<label htmlFor={"group"}>Group</label>
			<br/>
			<input name={"account"} type={"radio"} value={"user"} id={"user"}/>
			<label htmlFor={"user"}>User</label>
		</div>
	)
}

export default Home
