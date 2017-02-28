
// http://codepen.io/anon/pen/GWJWeq

$().ready(function() {
   
    // Show tooltips always even the stats are zero
    Chart.pluginService.register({
      beforeRender: function(chart) {
        if (chart.config.options.showAllTooltips) {
          // create an array of tooltips
          // we can't use the chart tooltip because there is only one tooltip per chart
          chart.pluginTooltips = [];
          chart.config.data.datasets.forEach(function(dataset, i) {
            chart.getDatasetMeta(i).data.forEach(function(sector, j) {
              chart.pluginTooltips.push(new Chart.Tooltip({
                _chart: chart.chart,
                _chartInstance: chart,
                _data: chart.data,
                _options: chart.options.tooltips,
                _active: [sector]
              }, chart));
            });
          });
    
          // turn off normal tooltips
          chart.options.tooltips.enabled = false;
        }
      },
      afterDraw: function(chart, easing) {
        if (chart.config.options.showAllTooltips) {
          // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
          if (!chart.allTooltipsOnce) {
            if (easing !== 1)
              return;
            chart.allTooltipsOnce = true;
          }
    
          // turn on tooltips
          chart.options.tooltips.enabled = true;
          var drawed_values = [];
          $('.bubble-val').remove();
          Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
                                    
            tooltip.initialize();
            tooltip.update();
            tooltip.pivot();
            
            var tooltip_value = tooltip._view.dataPoints[0].yLabel;
            if($.inArray(tooltip_value, drawed_values) === -1){
              drawed_values.push(tooltip_value);
              tooltip._model.x = tooltip._model.x + 50;
              
              var chart_offset = $('#bubbleChart').offset();
              
              var elem = $("<div class='bubble-val'></div>").css({
                "position": "absolute",
                "font-size": "12px",
                "color": "#666",
                "left": (chart_offset.left - 10) + (tooltip._view.caretX + 25),
                "top": (chart_offset.top - 10) + tooltip._view.caretY
              });

              elem.html(tooltip_value);
              $("body").append(elem);
            } else {
              tooltip._model.x = tooltip._model.x - (tooltip._model.width + 50);
              tooltip._model.xAlign = 'right';
            }
                       
            // we don't actually need this since we are not animating tooltips
            tooltip.transition(1).draw();
            
          });
          chart.options.tooltips.enabled = false;
        }
      }
    });
    // Show tooltips always even the stats are zero
    
    
    var myLineChart = new Chart($("#lineChart"), {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: [80, 75, 65, 59, 56, 55, 40],
                    spanGaps: false,
                }
            ]
        },
        options: {
            legend: {
                display: false
            },
            layout: {
                padding: 25  
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display:false
                    },
                    ticks: {
                        display: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Sistema Operativo'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Pontuação'
                    }
                }]
            }
        }
    });
    
    myBublleChart = new Chart($("#bubbleChart"), {
        type: 'bubble',
        data: {
            datasets: [
                {
                    data: [
                        {
                            x: 0,
                            y: 89,
                            r: 5,
                            label: 'Apple'
                        },
                        {
                            x: 0,
                            y: 72,
                            r: 5,
                            label: 'Samsung'
                        },
                        {
                            x: 0,
                            y: 45,
                            r: 5,
                            label: 'Windows'
                        },
                        {
                            x: 0,
                            y: 45,
                            r: 5,
                            label: 'Windows 2'
                        },
                        {
                            x: 0,
                            y: 0,
                            r: 5,
                            label: 'Neutral'
                        },
                        {
                            x: 0,
                            y: 100,
                            r: 5,
                            label: 'Bom'
                        },
                        {
                            x: 0,
                            y: -12,
                            r: 5,
                            label: 'Opção 4'
                        }
                    ],
                    borderColor:'#CCC',
                    backgroundColor:"#FFF",
                    hoverBackgroundColor: "#CCC",
                }]
        },
        options: {
            title:{
                display: false
            },
            legend: {
                display: false
            },
            layout: {
              padding: 25  
            },
            tooltips: {
                enabled: false,
                mode: 'point',
                backgroundColor: '#CCC',
                displayColors: false,
                cornerRadius: 0,
                caretSize: 12,
                xPadding: 15,
                callbacks: {
                    label: function(tooltipItem, data) {
                        var value = data.datasets[0].data[tooltipItem.index];
                        
                        return value.label;
                    },
                }
            },
            showAllTooltips: true,
            scales: {
                yAxes: [{
                    gridLines: {
                        display:false
                    },
                    ticks: {
                        display: false,
                        beginAtZero:true,
                        mirror:false,
                    }
                }],
                xAxes: [{
                    gridLines: {
                        lineWidth: 0,
                        color: "#fff"
                    },
                    ticks: {
                        display: false
                    }
                }]
            }
        }
    });

});