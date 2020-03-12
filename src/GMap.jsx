import React, { Component } from 'react';
import Analytics from './Analytics.jsx';
import { GoogleApiWrapper, Marker, Map } from 'google-maps-react';


const mapStyles = {
    width: '10%',
    height: '10%'
};


export class MapContainer extends Component {

    constructor(props) {
        super(props);
        var graphobjdata = JSON.parse(this.props.dataToBePlotted.Maptojson)
        var graphobjdatetimedata =JSON.parse(this.props.dataToBePlotted.Datimemap)
        // this.state = { data: this.props.dataToBePlotted, graphData: graphobjdata ,showModal:false}
        this.state = { data: this.props.dataToBePlotted, graphData: graphobjdata ,showModal:false ,graphdatetimedata:graphobjdatetimedata}

        // console.log(this.state.graphdatetimedata,"constructor call")
        // console.log(graphobjdata,"graphobjdata constructor call")
        setTimeout(()=>{
        // console.log(this.state.graphData,"constructor call")
    },2000)

    }

    componentWillReceiveProps(newprops) {
        this.closeModalfunc()
        console.log("component recieved new props")
        // console.log(this.props.dataToBePlotted)
        var bitdata = this.state.data;
        bitdata.Slice.push(newprops.dataToBePlotted.Slice[0])
        var strid="id".concat(newprops.dataToBePlotted.Slice[0].id)
        console.log(strid)

        var currentdate = new Date(); 
        var datetime = "" + currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + "  "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();

        // console.log(datetime,"datetime js")
        // console.log(typeof(datetime))
        if (!(strid in this.state.graphData) ){
            console.log("id does not exist")
            var obj = this.state.graphData
            var value=[newprops.dataToBePlotted.Slice[0].quantity]
            obj[strid]=value

           
            var obj2 = this.state.graphdatetimedata
            obj2[strid]=[datetime]
            // this.state = { data:bitdata, graphData: obj}
            this.state = { data:bitdata, graphData: obj, graphdatetimedata:obj2, dustbinno:strid, showModal:false}
            console.log(this.state.graphdatetimedata,"new data")
            // console.log(this.state.graphData)
        }else{
            console.log("id exists")
            var obj = this.state.graphData
            var obj2 =this.state.graphdatetimedata
            obj[strid].push(newprops.dataToBePlotted.Slice[0].quantity)
            // this.state = { data:bitdata, graphData:obj}
            obj2[strid].push(datetime)
            this.state = { data:bitdata, graphData:obj, graphdatetimedata:obj2, dustbinno:strid,showModal:false}   
            console.log(this.state.graphdatetimedata,"new data id exists")
     
        }

        
        // setTimeout(()=> {
        //     // console.log(this.state.data,"component did mount")
        //     // console.log(this.state.graphData, "component did mount")
        //     // console.log(this.state.graphData.id1,"component")
        // }, 2000)
    }
    
    state = {
        data: {},
        graphData: {},
        graphdatetimedata:{},
        showModal:false,
        dustbinno:"",

    }

    imageurl=(weight,filledpct)=>{
        if(weight<10 || filledpct<50){
            return "https://cdn4.iconfinder.com/data/icons/32x32-free-design-icons/32/Flower.png";
        }
        if( (weight>=10 && weight<15 )|| (filledpct>=50 && filledpct<75) ){
            return "https://cdn4.iconfinder.com/data/icons/32x32-free-design-icons/32/Warning.png";
        }
        else{
            return "https://cdn4.iconfinder.com/data/icons/32x32-free-design-icons/32/Error.png";
        }
    }

    onMarkerClick = (marker) =>{
        this.setState({showModal:true,dustbinno:"id"+marker.id})
        console.log(this.state.dustbinno)
        console.log(marker.quantity)
    }

    closeModalfunc=()=>{
        this.setState({showModal:false})
    }


    render() {

        let addModalClose=()=>this.setState({showModal:false})
        console.log(this.state.showModal,"render")

        console.log(this.state.data,"component did mount")
        console.log(this.state.graphData, "component did mount")
        console.log(this.state.dustbinno,"dustbinno")    
        return (
            <div>
                <h2>updated gmap{this.props.ct}</h2>
                <Map 
                    google={this.props.google}
                    style={{ width: '100%', height: '100%', position: 'relative' }}
                    className={'map'}
                    initialCenter={{
                        lat: 19.0268,
                        lng: 72.8556
                    }}
                    zoom={16}>

                    {this.state.data.Slice.map(mkr =>
                        <Marker
                            // icon ={"data:image/png;base64,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"}
                            onClick={()=>{this.onMarkerClick(mkr)}}
                            icon={this.imageurl(mkr.quantity,mkr.filledpct)}
                            position={{ lat: mkr.lat, lng: mkr.lng }}
                            title={"Id No" + mkr.id + " quantity " + mkr.quantity + "Filled_pct" + mkr.filledpct } />)}
                </Map>

                <Analytics 
                    visible={this.state.showModal}
                    closeModal={this.closeModalfunc}
                    binNo={this.state.dustbinno}
                    dataArray={this.state.graphData}
                    datetimeArray={this.state.graphdatetimedata}

                />
            
            </div>
        );
    }
}

//https://cdn4.iconfinder.com/data/icons/32x32-free-design-icons/32/Flower.png
//https://cdn4.iconfinder.com/data/icons/32x32-free-design-icons/32/Warning.png
//https://cdn4.iconfinder.com/data/icons/32x32-free-design-icons/32/Error.png

export default GoogleApiWrapper({
    // apiKey: 'AIzaSyBiQXo7xneNgKwUa2aXLzV5b-d061u0oH8'
})(MapContainer);