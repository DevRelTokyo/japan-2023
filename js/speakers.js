document.addEventListener('DOMContentLoaded', () => {
	const colors = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
	$('.speakers .speaker-box-layout4').each((index, element) => {
		const color = colors[index % colors.length];
		$(element).addClass(`color-${color}`);
	});
});
