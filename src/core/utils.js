export const recordFromSnapshot = (snapshot) => {
	let record = snapshot.val();
	record.key = snapshot.key();
	return record;
};

export const consoleError = (loc, error) => {
	console.error(`ERROR @ ${loc} :`, error); // eslint-disable-lint no-console
};
