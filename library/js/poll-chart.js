( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global FUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.pollChart = function( pollChart, pollData, chartType = 'horizontalBar' ) {

		let chart = $( pollChart );

		if ( 'bar' === chartType ) {
			chartType = 'horizontalBar';
		}

		if ( undefined === pollData || 0 === pollData.length ) {
			return;
		}

		function formatLabel( str, maxwidth ) {

			let sections = [];
			let words = str.split( ' ' );
			let temp = '';

			words.forEach( function( item, index ) {

				if ( 0 < temp.length ) {

					let concat = temp + ' ' + item;

					if ( concat.length > maxwidth ) {
						sections.push( temp );
						temp = '';
					} else {

						if ( index == ( words.length - 1 ) ) {
							sections.push( concat );
							return;
						} else {
							temp = concat;
							return;
						}
					}
				}

				if ( index == ( words.length - 1 ) ) {
					sections.push( item );
					return;
				}

				if ( item.length < maxwidth ) {
					temp = item;
				} else {
					sections.push( item );
				}
			});

			return sections;
		}

		function init() {

			let answerLabels = [];
			let answerVotes = [];
			let answerColors = [];

			for ( let row of pollData ) {

				// Get answer text
				answerLabels.push(
					formatLabel( row[0], 20 ) // Get first key
				);

				// Get answer votes
				answerVotes.push(
					row[1] // Get second key
				);

				// Get answer color
				answerColors.push(
					row[2] // Get third key
				);
			}

			// Chart Data
			const chartData = {
				labels: answerLabels,
				datasets: [ {
					data: answerVotes,
					backgroundColor: answerColors,
					borderWidth: 0
				} ]
			};

			// Chart Options
			const chartOptions = {
				legend: {
					display: false // Remove legend
				},
				tooltips: {

					// Label
					titleFontColor: '#FFFFFF',
					titleFontFamily: '\'Helvetica Neue\', \'Helvetica\', \'Arial\', sans-serif',
					titleFontSize: 13,
					titleFontStyle: 'bold',
					titleMarginBottom: 10,

					// Number of Votes
					bodyFontColor: '#FFFFFF',
					bodyFontFamily: '\'Helvetica Neue\', \'Helvetica\', \'Arial\', sans-serif',
					bodyFontSize: 12,
					bodyFontStyle: 'normal'
				},
				scales: {
					xAxes: [ {
						labelMaxWidth: 3,
						labelWrap: true
					} ],
					yAxes: [ {
						ticks: {
							beginAtZero: true
						}
					} ]
				}
			};

			chart.each( function() {

				chart = $( this );

				new Chart( chart, {
					type: chartType,
					data: chartData,
					options: chartOptions
				});
			});
		}

		init();

		return this;
	};

}( jQuery ) );
