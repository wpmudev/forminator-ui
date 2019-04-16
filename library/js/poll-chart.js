( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global FUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.pollChart = function( pollChart, pollData, chartType = 'horizontalBar', chartExtras = '' ) {

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

			// Poll Data
			let answerLabels = [];
			let answerVotes = [];
			let answerColors = [];

			for ( let row of pollData ) {

				// Get answer text
				if ( 'pie' === chartType ) {

					answerLabels.push(
						row[0] // Get first key
					);
				} else {

					answerLabels.push(
						formatLabel( row[0], 20 ) // Get first key
					);
				}

				// Get answer votes
				answerVotes.push(
					row[1] // Get second key
				);

				// Get answer color
				answerColors.push(
					row[2] // Get third key
				);
			}

			// Chart Extras
			if ( '' === chartExtras ) {

				chartExtras = [
					'vote(s)', // custom labdel (string)
					true // vote count (bool)
				];
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
					display: false
				},
				tooltips: {
					callbacks: {
						title: function( tooltipItems, data ) {

							var title = '';

							if ( 'pie' !== chartType ) {
								title = tooltipItems[0].yLabel;
							}

							return title;

						},
						label: function( tooltipItem, data ) {

							var label = data.datasets[tooltipItem.datasetIndex].label || '';

							if ( 'pie' === chartType ) {

								label = data.labels[tooltipItem.index] + ': ' + data.datasets[0].data[tooltipItem.index];

							} else {

								if ( label ) {
									label += '';
								}

								label += ( 'pie' === chartType ) ? Math.round( tooltipItem.yLabel * 100 ) / 100 : Math.round( tooltipItem.xLabel * 100 ) / 100;

							}

							label += ' ' + chartExtras[0];

							return label;

						}
					},
					titleFontColor: '#FFFFFF',
					titleFontFamily: '\'Helvetica Neue\', \'Helvetica\', \'Arial\', sans-serif',
					titleFontSize: 13,
					titleFontStyle: 'bold',
					titleMarginBottom: 10,
					bodyFontColor: '#FFFFFF',
					bodyFontFamily: '\'Helvetica Neue\', \'Helvetica\', \'Arial\', sans-serif',
					bodyFontSize: 12,
					bodyFontStyle: 'normal'
				},
				scales: {
					xAxes: [ {
						display: ( 'pie' === chartType ) ? false : true,
						ticks: {
							beginAtZero: true
						}
					} ],
					yAxes: [ {
						display: ( 'pie' === chartType ) ? false : true,
						ticks: {
							beginAtZero: true
						}
					} ]
				},
				plugins: {
					datalabels: {
						display: ( 'pie' === chartType ) ? false : chartExtras[1],
						align: 'end',
						anchor: 'start',
						textAlign: 'center',
						color: '#333333',
						formatter: function( value ) {
							return value + ' ' + chartExtras[0];
						}
					}
				}
			};

			chart.each( function() {

				chart = $( this );

				new Chart( chart, {
					type: chartType,
					data: chartData,
					plugins: [
						ChartDataLabels
					],
					options: chartOptions
				});

				if ( 'pie' === chartType ) {

					// Wrap the chart
					chart.wrap( '<div class="forminator-chart-wrapper" aria-hidden="true" />' );

					// Insert legend wrapper
					chart.parent().prepend(
						'<ul class="forminator-chart-legend"></ul>'
					);

					// Insert legend items
					pollData.forEach( function( entry ) {
						chart.parent().find( '.forminator-chart-legend' ).append(
							'<li><span class="forminator-chart-legend--color" style="background-color: ' + entry[2] + '" aria-hidden="true"></span><strong>' + entry[0] + ':</strong> ' + entry[1] + ' ' + chartExtras[0] + '</li>'
						);
					});
				}
			});
		}

		init();

		return this;
	};

}( jQuery ) );
