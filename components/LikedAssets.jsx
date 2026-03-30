import React, { useState } from 'react'

function LikedAssets({sell, stocks, stocksAPI }) {
    // console.log(stocksAPI);
    // if(!stocksAPI){
    //     return 'as'
    // }
    return (
        <div className='liked-table'>
            <div className="liked-table-header">
                <div>Asset</div>
                <div>Symbol</div>
                <div>Bid</div>
                <div>Ask</div>
                <div>Price</div>
                {/* <div>Change</div> */}
                <div>Action</div>
            </div>
            <div className="liked-table-body">
                {stocks.length != 0 ? stocks.map((item, i) =>
                    <div key={i} className='liked-table-row' style={{transform:"translateX(0)",  animation:'lastAsset .4s ease-in  1'}}>
                        <div>{item.companyName?.length >= 15 ? item?.companyName.slice(0, 15) + '...' : item?.companyName}</div>
                        <div>{item.symbol}</div>
                        <div>{`${item.bid}`.slice(0,7)}</div>
                        <div>{`${item.ask}`.slice(0,7)}</div>
                        <div>{`${item.price}`.slice(0,7)}</div>
                        {/* <div className={`${item.price - stocksAPI[item.symbol]?.values[1]?.close}`.startsWith('-') ? 'red' : 'green'} >{`${item.price - stocksAPI[item.symbol]?.values[1]?.close}`.slice(0,8)}</div> */}
                        <div onClick={() => sell(item.stockID)} className='buy-button'>
                            <p>Buy</p>
                        </div>
                    </div>
                ) : <div className='empty-body'>
                    <p>Add Asset</p>
                </div>}
            </div>
        </div>
    )
}

export default LikedAssets