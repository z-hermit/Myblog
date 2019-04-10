let Router = (() => {
	const goBack = (content) => {
		content.props.history.goBack();
	}

	//data[0](type) : query(明文，类似get), state(非明文，类似post), data[1](data)
	const goTo = (content, des, ...data) => {
		let path;
		if (data === null || data.length === 0) {
			path = des;
		} else if (data[0] === "query") {
			path = {
			  pathname:'des',
			  query:data[1],
			}
		} else if (data[0] === "state") {
			path = {
			  pathname:'des',
			  state:data[1],
			}
		}
		content.props.history.push(path);
	}

	const getParam = (content) => {
		return content.props.match.params;
	}

	const getQuery = (content) => {
		return content.props.location.query;
	}

	const getState = (content) => {
		return content.props.location.state;
	}

	return {
		goBack: goBack,
		goTo: goTo,
		getParam: getParam,
		getQuery: getQuery,
		getState: getState
	}
})();

export default Router;