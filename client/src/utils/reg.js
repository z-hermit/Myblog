let Reg = (() => {
	const userName = (username) => {
		let re = /^[a-zA-Z][a-zA-Z0-9_]{2,20}$/
		return re.test(username)
	}


	return {
	    userName: userName,
	}
})()