const ncmb = new NCMB('fff52c69eb36fcb1ca582fcf4f4c22f5698ca6a75df82296fa45f09c82688403', 'b6dcec84182a84f88c18d882713395c171e1b3b82717411f0b6b004858db8ff2');
const Proposal = ncmb.DataStore('Proposal');
$(async () => {
	const objectId = $.url('?id');
	if (!objectId) {
		alert('不正なアクセスです');
		return;
	}
	try {
		const proposal = await Proposal.fetchById(objectId);
		if (proposal.acceptDate) {
			alert('既に承認済みです');
			return;
		}
		Object.keys(proposal).forEach(key => {
			console.log(key);
			$(`.proposal-${key}`).text(proposal[key]);
		});
		await proposal
			.set('uploaded', true)
			.set('acceptDate', new Date())
			.update();
	} catch (e) {
		alert('不正なアクセスです');
		return;
	}
});
