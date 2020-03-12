import React,{Component} from 'react';
import Modal from 'react-awesome-modal';
import ReactApexChart from 'react-apexcharts';

import {Bar,Line,Pie} from 'react-chartjs-2';

export default class  Analytics extends Component{
  constructor(props){
    super(props);
    console.log("constructor")
    console.log(this.props)
    // this.state={weightArray: this.props.dataArray[this.props.binNo]}
    // console.log(this.props.datetimeArray)
    console.log(this.props.dataArray[this.props.binNo])
    // console.log(this.props.datetimeArray[this.props.binNo])
    this.state={weightArray: this.props.dataArray[this.props.binNo], timingArray: this.props.datetimeArray[this.props.binNo]}
    // console.log(this.props.binNo)
    console.log(this.state.weightArray)
    // console.log(this.state.timingArray)
  }

  state={
    weightArray:{},
    timingArray:{}
  }

  componentWillReceiveProps(newprops){
      console.log("component will receive new props")
      if(typeof(newprops.visible)!="undefined"){
        console.log(newprops)
        console.log(newprops.binNo)
        // this.state={weightArray: newprops.dataArray[newprops.binNo]}
        // console.log(newprops.datetimeArray)
        this.state={weightArray: newprops.dataArray[newprops.binNo], timingArray:newprops.datetimeArray[newprops.binNo]}
        console.log(this.state.weightArray)
        console.log(this.state.timingArray)
      }
  }
  

  render() {
    console.log("rendering !!!!!!!!!!!!!!!!")
    return (
        <section>
            <h1>React-Modal Examples</h1>
            <Modal 
                visible={this.props.visible}
                width="40%"
                height="90%"
                effect="fadeInUp"
                onClickAway={this.props.closeModal}
            >
                <div>
                    <h1>Analytics for {this.props.binNo}</h1>
                    <p>Graph of Dustbin weight </p>
                    <ReactApexChart 
                    
                            options={{
                              chart: {
                                height: 350,
                                type: 'bar',
                              },
                              plotOptions: {
                                bar: {
                                  dataLabels: {
                                    position: 'top', // top, center, bottom
                                  },
                                }
                              },
                              dataLabels: {
                                enabled: true,
                                formatter: function (val) {
                                  return val + "%";
                                },
                                offsetY: -20,
                                style: {
                                  fontSize: '12px',
                                  colors: ["#125637"]
                                }
                              },
                              // chart: {id: 'apexchart-example'},
                              xaxis: {
                                  categories:this.state.timingArray,
                                  position: 'bottom',
                                  labels: {
                                    offsetY: 15,
                                
                                  },
                                  axisBorder: {
                                    show: true
                                  },
                                  axisTicks: {
                                    show: true
                                  },
                                  crosshairs: {
                                    fill: {
                                      type: 'gradient',
                                      gradient: {
                                        colorFrom: '#eb3464',
                                        colorTo: '#34eb4c',
                                        stops: [0, 100],
                                        opacityFrom: 0.4,
                                        opacityTo: 0.5,
                                      }
                                    }
                                  },
                                  tooltip: {
                                    enabled: true,
                                    offsetY: -35,
                                
                                  }
                                },
                                fill: {
                                  gradient: {
                                    shade: 'dark',
                                    type: "vertical",
                                    shadeIntensity: 0.25,
                                    gradientToColors: undefined,
                                    inverseColors: false,
                                    opacityFrom: 1,
                                    opacityTo: 1,
                                    stops: [50, 0, 100, 100]
                                  },
                                },
                                yaxis: {
                                  axisBorder: {
                                    show: true
                                  },
                                  axisTicks: {
                                    show: true,
                                  },
                                  labels: {
                                    show: true,
                                    formatter: function (val) {
                                      return val + "%";
                                    }
                                  }
                                
                                },
                                title: {
                                  text: 'Monthly Inflation in Argentina, 2002',
                                  floating: true,
                                  offsetY: 320,
                                  align: 'right',
                                  style: {
                                    color: '#e4fa20'
                                  }
                                }

                              }}

                            series= {[{
                              legend:"weight",
                              name: 'weight-1',
                              data:this.state.weightArray
                            }]} 

                      type="bar"
                      width={500}
                      height={320} 
                    />

                    <a href="javascript:void(0);" onClick={this.props.closeModal}>Close</a>
                </div>
            </Modal>
        </section>
    );
}
}