import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const {
        user: { _id, name, email, location, role }
    } = isAuthenticated();

	const userLinks = () => {
        return (
            <div className="card ml-5 card_farmer">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">
                            My Cart
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/buy">
                            Buy Now
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`} >
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

	const userInfo = () => {
        return (
            <div className="card mb-5 card_farmer">
				<h3 className="card-header">User Information</h3>
				<ul className="list-group">
					<li className="list-group-item"> {name} </li>
					<li className="list-group-item"> {email} </li>
                    <li className="list-group-item"> {location} </li>
					<li className="list-group-item"> {role === 1 ? "Farmer" : "Customer"} </li>
				</ul>
			</div>
        );
    };

	// const purchaseHistory = () => {
    //     return (
    //         <div className="card mb-5">
    //             <h3 className="card-header">Purchase history</h3>
    //             <ul className="list-group">
    //                 <li className="list-group-item">history</li>
    //             </ul>
    //         </div>
    //     );
	// };
    
    const onloadData= () => {
        var url = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001a91006a69a344a2f5750f6bda75532d8&format=json&offset=0&limit=1000&filters[state]="+location;

        fetch(url)
        .then(response => {
            getData(response.json());
        })
        .catch(err => {
            console.error(err);
        });
    };

    const getData = (result) => {
        //here resolve the data
        Promise.resolve(result).then(value =>{
            //brack the hole function to differnt function
            console.log(value);
            //Descriptio here
            getRecords(value.records);
            getDate(value.updated_date);
		    // getDesc(value.desc);
        })
    };
    
    function getDate(date){
        var update = new Date(date);
        document.getElementById('updatedOn').innerHTML = update.toDateString();
    }

    
    const getRecords = (record) => {
   	if(record.length==0){
            const h = document.getElementById('mandierror');
            h.innerHTML='Sorry! Market is Closed Today';
        }
        for(let i=0;i<record.length;i++) {
            // const sr = i+1;
            // console.log(sr);
            const state = record[i].state;
            // console.log(state);
            const distrcts = record[i].district;
            // console.log(distrcts);
            const market = record[i].market;
            // console.log(market);
            const commodity = record[i].commodity;
            // console.log(commodity);
            const variety = record[i].variety;
            // console.log(variety);
            const min_price= record[i].min_price;
            // console.log(min_price);
            if(isNaN((min_price/100))){
                continue;
            }
            const max_price = record[i].max_price;
            // console.log(max_price);
            // const modal_price = record[i].modal_price;
            // // console.log(modal_price);
            const tTr = document.createElement('tr');
            tTr.innerHTML ='<td scope="row">'+state+'</td>'+'\n'+
                '<td>'+distrcts+'</td>'+'\n'+
                '<td>'+market+'</td>'+'\n'+
                '<td>'+commodity+'</td>'+'\n'+
                '<td>'+min_price / 100 +' - '+max_price / 100 +'</td>'+'\n'+
                '<td>'+variety+'</td>'+'\n';
            document.getElementById('market_price_body').appendChild(tTr);
        }
    };

    const searchDistrict =() =>{
        const fillter = document.getElementById('search_input_dist').value.toUpperCase();
        const table = document.getElementById('market_price_body');
        const tr = table.getElementsByTagName('tr');
        for(let i=0; i<tr.length; i++){
            const td= tr[i].getElementsByTagName('td')[1];
            if(td){
                const textvale = td.textContent || td.innerHTML;
                if(textvale.toUpperCase().indexOf(fillter)>-1){
                    tr[i].style.display="";
                }else{
                    tr[i].style.display ="none";
                }
            }
        }
    }
    const searchCommodity =() =>{
        const fillter = document.getElementById('search_input_comm').value.toUpperCase();
        const table = document.getElementById('market_price_body');
        const tr = table.getElementsByTagName('tr');
        for(let i=0; i<tr.length; i++){
            const td_commodity= tr[i].getElementsByTagName('td')[3];
            if(td_commodity){
                const textvale_commodity = td_commodity.textContent || td_commodity.innerHTML;
                if(textvale_commodity.toUpperCase().indexOf(fillter)>-1){
                    tr[i].style.display="";
                }else{
                    tr[i].style.display ="none";
                }
            }
        }
    }

    const GovApi= () => {
        return (
        <div id="govapi" >
        
        
        <div className="container-fluid p-3 fetch_data">
            <div className="row" >
                <div className="col-xl-12">
                    <h6 className="text-center mt-3">Price in Rupees per Kilogram </h6>
                    <h6 className="text-center mt-3">Updated On : <span id="updatedOn"></span></h6>
                    <div class="text-center">
                        <button className="btn btn_dashboard"  onClick={onloadData}> Fetch Data </button>
                    </div>
                </div>
            </div>
        </div>
        <br></br>
        <div className="row">
            <div className="col-xl-6 search_box text-white">
                <input className="form-control" id="search_input_dist" type="text" placeholder="Search district mandi from your state" onKeyUp={searchDistrict}/>
            </div>
            <div className="col-xl-6 search_box text-white">
                <input className="form-control" id="search_input_comm" type="text" placeholder="Search specific vegetable or fruit ( commodity )" onKeyUp={searchCommodity}/>
            </div>
        </div>
        <br></br>
        <div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="bg-info text-white">
                        <tr>
                            <th scope="col">State</th>
                            <th scope="col">District</th>
                            <th scope="col">Market</th>
                            <th scope="col">Commodity</th>
                            <th scope="col">Price Range</th>
                            <th scope="col">Variety</th>                            
                        </tr>
                    </thead>
                    <tbody id="market_price_body">
                        <tr id="msg">
                            
                        </tr>
                    </tbody>
                </table>
		<div>
                    <h3 id="mandierror">
                         </h3>
                </div>
            </div>
        
        </div>
            
        </div>
        );
    };

	return (
        <Layout
            title={`Welcome to Kisaan Mitra ${name} !`} 
			className="container-fluid text-center"
        >
			
			<div className="row">
                <div className="col-md-2 offset-md-0">{userLinks()}</div>
                <div className="col-md-8 offset-md-0">{GovApi()} </div>
                <div className="col-md-2 offset-md-0">{userInfo()}</div>
               
            </div>

        </Layout>
	)
};


export default Dashboard;
