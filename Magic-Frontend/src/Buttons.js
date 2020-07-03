// import React from 'react';
import React, { useState, useEffect } from "react";
import { Magic } from "magic-sdk";
import { IconExtension } from "@magic-ext/icon";
import IconService from "icon-sdk-js";
import Light from './Light';

import { ToastContainer, toast } from 'react-toastify';
import { Button, Card, Header } from 'semantic-ui-react';
import { IoMdRefresh } from 'react-icons/io';

const { IconBuilder, IconAmount, IconConverter,HttpProvider} = IconService;
const httpProvider = new HttpProvider('https://bicon.net.solidwallet.io/api/v3');
const iconService = new IconService(httpProvider);
const magic = new Magic("pk_test_BAD78299B2E4EA9D", {
  extensions: {
    icon: new IconExtension({
      rpcUrl: "https://bicon.net.solidwallet.io/api/v3"
    })
  }
});


const refreshBtnStyle = {
  width: '300px'
};




function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Buttons extends React.Component{
    constructor(props) {

        super(props);
        this.state = {
            tx:'',
            color:'white',
            loading: false,
            buttonLoading: ''
        };
    
        // I've just put these binding in the constructor 
        // so as not to clock up the render method and they only
        // get called once during the lifetime of the component
        // this.handleActionClick = this.handleActionClick.bind(this);
        this.handlerSendTransaction=this.handlerSendTransaction.bind(this)
      }
      
      async componentDidMount() {
        await this.getTransaction();
      }
    
    handlerSendTransaction = async (key) => {
      this.setState({loading: true, buttonLoading: key});

      try{
        const metadata = await magic.user.getMetadata();
    
        const txObj = new IconBuilder.CallTransactionBuilder()
          .from(metadata.publicAddress)
          .to('cxd9d1950dfdaad7fcc73a1803d1ea0fa0f6993a04')
        //   .value(IconAmount.of(2, IconAmount.Unit.ICX).toLoop())
          .stepLimit(IconConverter.toBigNumber(1000000))
          .nid(IconConverter.toBigNumber(3))
          .nonce(IconConverter.toBigNumber(1))
          .version(IconConverter.toBigNumber(3))
          .timestamp(new Date().getTime() * 1000)
          .method('set_color')
          .params({
            "_color": key
          })
          .build();
          // console.log("called")
        const txhash = await magic.icon.sendTransaction(txObj);
    
        // setTxHash(txhash);
        this.setState({tx:txhash,
            // color:.target.id
            
        })
        toast.success("Successfully sent tx to contract");
        // console.log(key)
        // console.log("transaction result", txhash);
        
        await sleep(3000);

        await this.getTransaction();
        
      }
      catch(err) {
        toast.error(err.rawMessage);
        console.log(JSON.stringify(err));
      }

      this.setState({loading: false, buttonLoading:''});
    };
    // onInputChange=(event)=>{
    //     console.log(event.target.value)
    //     this.setState({color:event.target.value});
       
    // };
    getTransaction=async()=>{
        const call = new IconBuilder.CallBuilder()
        .to('cxd9d1950dfdaad7fcc73a1803d1ea0fa0f6993a04')
        .method('get_color')
        .build()

        // const txnPayload = {
        //     jsonrpc: '2.0',
        //     method: 'icx_sendTransaction',
        //     params: IconConverter.toRawTransaction(txnData),
        //     id: 50889,
        //   };
        try{
          const result = await iconService.call(call).execute();
          // const response= await IconBuilder.Call(txObj);
          // console.log(result)
          console.log(result);
          this.setState({color:result})
        } catch(err) {
          toast.error(err.rawMessage);
          console.log(JSON.stringify(err));
        }
        
    }

    render(){
        return(
          <>
            <div className='row d-flex justify-content-center mainContainer'>
              <div className='col-md-12'>
                <div className='row d-flex align-items-center justify-content-center buttonContainer'>
                  <Button color='red bulb-btn' disabled={this.state.loading} loading={this.state.loading && this.state.buttonLoading==='RED'} className='m-4' onClick={()=>this.handlerSendTransaction('RED')} >Red</Button>
                  <Button color='green bulb-btn' disabled={this.state.loading} loading={this.state.loading && this.state.buttonLoading==='GREEN'} className='m-4' onClick={()=>this.handlerSendTransaction('GREEN') }>Green</Button>
                  <Button color='blue bulb-btn' disabled={this.state.loading} loading={this.state.loading && this.state.buttonLoading==='BLUE'} className='m-4' onClick={()=>this.handlerSendTransaction('BLUE')}>Blue</Button>
                  <Button color='yellow bulb-btn' disabled={this.state.loading} loading={this.state.loading && this.state.buttonLoading==='YELLOW'} className='m-4' onClick={()=>this.handlerSendTransaction('YELLOW')}>Yellow</Button>
                </div>


                <div className="row d-flex align-items-center justify-content-center bulb">
                    <Light color={this.state.color}/>   
                </div>
                <div className="row d-flex align-items-center justify-content-center mb-2">
                  <IoMdRefresh size={32} color='white' style={{cursor:'pointer'}} onClick={this.getTransaction} />
                </div>
                <div className="row d-flex align-items-center justify-content-center">
                    {this.state.tx ? (
                    <div>
                        <h2 style={{color: 'white', padding: '10px', textAlign:'center'}}>Tx Hash:</h2>
                        <div className="info">
                        <a
                            href={`https://bicon.tracker.solidwallet.io/transaction/${this.state.tx}`}
                            target="_blank"
                        >
                            {this.state.tx}
                            
                        </a>
                        </div>
                    </div>
                    ) : (
                    null
                    )}
                
                </div>
                <div className="row d-flex align-items-center justify-content-center">
                  {/* <Button style={refreshBtnStyle} onClick={this.getTransaction}>Refresh</Button> */}

                </div>
              </div>
           </div>
           <ToastContainer />
          </>
        );
    }
}
export default Buttons;


// const Buttons=()=>{
//     return(
//         <div className='btn'>
//             <button onClick={'/'}>Red</button>
//             <button onClick={'/'}>Green</button>
//             <button onClick={'/'}>Blue</button>
//             <button onClick={'/'}>Yellow</button>
//         </div>
//     );
// }
// export default Buttons;