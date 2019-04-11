( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global FUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.pollChart = function( pollChart, answerLabels, answerVotes, chartType = 'horizontalBar' ) {

		let chart = $( pollChart );

		if ( 'bar' === chartType ) {
			chartType = 'horizontalBar';
		}

		// Chart Data
		const chartData = {
			labels: answerLabels,
			datasets: [ {
				data: answerVotes,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
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

		function formatLabel( str, maxwidth ) {

			const sections = [];
			const words = str.split( ' ' );
			const temp = '';

			words.forEach( function( item, index ) {

				if ( 0 < temp.length ) {

					const concat = temp + ' ' + item;

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
