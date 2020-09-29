/*!
 * WPMU DEV Forminator UI
 * Copyright 2019 Incsub (https://incsub.com)
 * Licensed under GPL v3 (http://www.gnu.org/licenses/gpl-3.0.html)
 */
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function ($) {
  // Enable strict mode.
  'use strict'; // Define global SUI object if it doesn't exist.

  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }

  FUI.inputStates = function (el) {
    var input = $(el);
    var form = input.closest('form');

    if (!input.is('input') && (!form.is('.forminator-poll') || !form.is('.forminator-ui') && !form.is('.forminator-custom-form'))) {
      return;
    }

    function hover(element) {
      var getInput = $(element);
      var getField = getInput.closest('.forminator-field');
      getInput.mouseover(function (e) {
        getField.addClass('forminator-is_hover');
        e.stopPropagation();
      }).mouseout(function (e) {
        getField.removeClass('forminator-is_hover');
        e.stopPropagation();
      });
    }

    function focused(element) {
      var getInput = $(element);
      var getField = getInput.closest('.forminator-field');
      getInput.focus(function (e) {
        getField.addClass('forminator-is_active');
        e.stopPropagation();
      }).blur(function (e) {
        getField.removeClass('forminator-is_active');
        e.stopPropagation();
      });
    }

    function filled(element) {
      var getInput = $(element);
      var getField = getInput.closest('.forminator-field'); // On input load

      if ('' !== getInput.val().trim()) {
        getField.addClass('forminator-is_filled');
      } // On input changes


      getInput.on('change', function () {
        if ('' !== getInput.val().trim()) {
          getField.addClass('forminator-is_filled');
        } else {
          getField.removeClass('forminator-is_filled');
        }
      });
    }

    function init() {
      input.each(function () {
        hover(this);
        focused(this);
        filled(this);
      });
    }

    init();
    return this;
  };
})(jQuery);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function ($) {
  // Enable strict mode.
  'use strict'; // Define global SUI object if it doesn't exist.

  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }

  FUI.inputMaterial = function (el) {
    var input = $(el);
    var field = input.closest('.forminator-field');
    var label = field.find('.forminator-label');
    var form = input.closest('form');

    if (!input.is('input') && (!form.is('.forminator-poll') || !form.is('.forminator-ui') && !form.is('.forminator-custom-form'))) {
      return;
    }

    function init() {
      // Wrap Element
      if (!input.parent().hasClass('forminator-input--wrap')) {
        input.wrap('<div class="forminator-input--wrap"></div>');
      } // Wrap Label


      if (label.length) {
        // Add floating class
        label.addClass('forminator-floating--input'); // Add icon class (if applies)

        if (field.find('.forminator-input-with-icon').length) {
          label.addClass('forminator-has_icon');
        } // Add phone class (if applies)


        if (field.find('.forminator-input-with-phone').length) {
          label.addClass('forminator-has_phone');

          if (field.find('.intl-tel-input').hasClass('allow-dropdown')) {
            label.addClass('allow-dropdown');
          }
        }
      }
    }

    init();
    return this;
  };
})(jQuery);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function ($) {
  // Enable strict mode.
  'use strict'; // Define global FUI object if it doesn't exist.

  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }

  FUI.radioStates = function (el) {
    var label = $(el);
    var input = label.find('input');

    if (!label.is('label') || 'radio' !== input.attr('type')) {
      return;
    }

    function init() {
      input.each(function () {
        $(this).on('click', function () {
          var radioInput = $(this);
          var radioLabel = radioInput.parent();
          var radioField = radioLabel.closest('.forminator-field');
          var radioOptions = radioField.find('.forminator-radio'); // Remove checked attribute

          radioOptions.find('input').removeAttr('checked'); // Remove checked class

          radioOptions.removeClass('forminator-is_checked'); // Assign checked attribute

          radioInput.attr('checked', 'checked'); // Assign checked class

          radioLabel.addClass('forminator-is_checked');
        });
      });
    }

    init();
    return this;
  };
})(jQuery);
function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function ($) {
  // Enable strict mode.
  'use strict'; // Define global FUI object if it doesn't exist.

  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }

  FUI.pollChart = function (pollChart, pollData) {
    var chartType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'horizontalBar';
    var chartExtras = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var chart = $(pollChart);

    if ('bar' === chartType) {
      chartType = 'horizontalBar';
    }

    if (undefined === pollData || 0 === pollData.length) {
      return;
    }

    function formatLabel(str, maxwidth) {
      var sections = [];
      var words = str.split(' ');
      var temp = '';
      words.forEach(function (item, index) {
        if (0 < temp.length) {
          var concat = temp + ' ' + item;

          if (concat.length > maxwidth) {
            sections.push(temp);
            temp = '';
          } else {
            if (index == words.length - 1) {
              sections.push(concat);
              return;
            } else {
              temp = concat;
              return;
            }
          }
        }

        if (index == words.length - 1) {
          sections.push(item);
          return;
        }

        if (item.length < maxwidth) {
          temp = item;
        } else {
          sections.push(item);
        }
      });
      return sections;
    }

    function init() {
      // Poll Data
      var answerLabels = [];
      var answerVotes = [];
      var answerColors = [];

      var _iterator = _createForOfIteratorHelper(pollData),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var row = _step.value;

          // Get answer text
          if ('pie' === chartType) {
            answerLabels.push(row[0] // Get first key
            );
          } else {
            answerLabels.push(formatLabel(row[0], 20) // Get first key
            );
          } // Get answer votes


          answerVotes.push(row[1] // Get second key
          ); // Get answer color

          answerColors.push(row[2] // Get third key
          );
        } // Chart Extras

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var extras = {};
      extras.votesLabel = 'vote(s)';
      extras.votesOnPoll = false;
      extras.basicColors = ['#E5E5E5', // [0] Grid lines color
      '#777771', // [1] Axis labels color
      '#333333' // [2] On-chart label (bars)
      ];
      extras.tooltipsBasic = ['#333333', // [0] Background color
      '#FFFFFF' // [1] Text color
      ];

      if ('' === chartExtras) {
        chartExtras = [extras.votesLabel, extras.votesOnPoll, extras.basicColors, extras.tooltipsBasic];
      } // Chart Data


      var chartData = {
        labels: answerLabels,
        datasets: [{
          data: answerVotes,
          backgroundColor: answerColors,
          borderWidth: 0
        }]
      }; // Chart Options

      var chartOptions = {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            title: function title(tooltipItems, data) {
              var title = '';

              if ('pie' !== chartType) {
                title = tooltipItems[0].yLabel;
              }

              return title;
            },
            label: function label(tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || '';

              if ('pie' === chartType) {
                label = data.labels[tooltipItem.index];

                if (true === chartExtras[1]) {
                  label += ': ' + data.datasets[0].data[tooltipItem.index];
                }
              } else {
                if (true === chartExtras[1]) {
                  label += Math.round(tooltipItem.xLabel * 100) / 100;
                }
              }

              if (true === chartExtras[1]) {
                label += ' ' + chartExtras[0];
              }

              return label;
            }
          },
          backgroundColor: chartExtras[3][0],
          titleFontColor: chartExtras[3][1],
          titleFontFamily: '\'Helvetica Neue\', \'Helvetica\', \'Arial\', sans-serif',
          titleFontSize: 13,
          titleFontStyle: 'bold',
          titleMarginBottom: 10,
          bodyFontColor: chartExtras[3][1],
          bodyFontFamily: '\'Helvetica Neue\', \'Helvetica\', \'Arial\', sans-serif',
          bodyFontSize: 12,
          bodyFontStyle: 'normal'
        },
        scales: {
          xAxes: [{
            display: 'pie' === chartType ? false : true,
            ticks: {
              fontColor: chartExtras[2][1],
              beginAtZero: true
            },
            gridLines: {
              color: chartExtras[2][0]
            }
          }],
          yAxes: [{
            display: 'pie' === chartType ? false : true,
            ticks: {
              fontColor: chartExtras[2][1],
              beginAtZero: true
            },
            gridLines: {
              color: chartExtras[2][0]
            }
          }]
        },
        plugins: {
          datalabels: {
            display: 'pie' === chartType ? false : chartExtras[1],
            align: 'end',
            anchor: 'start',
            textAlign: 'center',
            color: chartExtras[2][2],
            formatter: function formatter(value) {
              return value + ' ' + chartExtras[0];
            }
          }
        }
      };
      chart.each(function () {
        chart = $(this);
        new Chart(chart, {
          type: chartType,
          data: chartData,
          plugins: [ChartDataLabels],
          options: chartOptions
        });

        if ('pie' === chartType) {
          // Wrap the chart
          chart.wrap('<div class="forminator-chart-wrapper" aria-hidden="true" />'); // Insert legend wrapper

          chart.parent().prepend('<ul class="forminator-chart-legend"></ul>'); // Insert legend items

          pollData.forEach(function (entry) {
            if (true === chartExtras[1]) {
              chart.parent().find('.forminator-chart-legend').append('<li>' + '<span class="forminator-chart-legend--color" style="background-color: ' + entry[2] + '" aria-hidden="true"></span>' + '<strong>' + entry[0] + ':</strong> ' + entry[1] + ' ' + chartExtras[0] + '</li>');
            } else {
              chart.parent().find('.forminator-chart-legend').append('<li>' + '<span class="forminator-chart-legend--color" style="background-color: ' + entry[2] + '" aria-hidden="true"></span>' + '<strong>' + entry[0] + '</strong>' + '</li>');
            }
          });
        }
      });
    }

    init();
    return this;
  };
})(jQuery);