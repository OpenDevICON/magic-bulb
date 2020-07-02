// import React from 'react';
import React, { useState, useEffect } from "react";
import { Magic } from "magic-sdk";
import { IconExtension } from "@magic-ext/icon";
import IconService from "icon-sdk-js";
import Light from './Light';

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

class Buttons extends React.Component{
    constructor(props) {

        super(props);
        this.state = {
            tx:'',
            color:''
        };
    
        // I've just put these binding in the constructor 
        // so as not to clock up the render method and they only
        // get called once during the lifetime of the component
        // this.handleActionClick = this.handleActionClick.bind(this);
        this.handlerSendTransaction=this.handlerSendTransaction.bind(this)
      }
      
    
    handlerSendTransaction = async (key) => {
        

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
          console.log("called")
        const txhash = await magic.icon.sendTransaction(txObj);
    
        // setTxHash(txhash);
        this.setState({tx:txhash,
            // color:.target.id
            
        })
        console.log(key)
        console.log("transaction result", txhash);
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
        
        const result = await iconService.call(call).execute();
        // const response= await IconBuilder.Call(txObj);
        console.log(result)

    this.setState({color:result})
        
    }

    render(){
        return(
            <div className='btn'>
                
                <button onClick={()=>this.handlerSendTransaction('RED')} >Red</button>
                <button onClick={()=>this.handlerSendTransaction('GREEN') }>Green</button>
                <button onClick={()=>this.handlerSendTransaction('BLUE')}>Blue</button>
                <button onClick={()=>this.handlerSendTransaction('YELLOW')}>Yellow</button>
                <button onClick={this.getTransaction}>Refresh</button>

                <div className="bulb">
                    <Light color={this.state.color}/>   
                </div>
                <div>
                    {this.state.tx ? (
                    <div>
                        <div>Send transaction success</div>
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
                    <div />
                    )}
                
                </div>
           </div>

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