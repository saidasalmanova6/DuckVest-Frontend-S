import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { DataContext } from '../DataContext/Context'

function MyAssets({sell}) {  
  let {portfolio } = useContext(DataContext)
  return (
    <div className='my-assets'>
      <div className="stock-header">
        <div>Asset</div>
        <div>Symbol</div>
        <div>Quantity</div>
        <div>Avg. Buy Price</div>
        <div>Current Price</div>
        <div>Value</div>
        <div>Action</div>
      </div>
      <div className="stock-body">
        {portfolio.stocksList.length == 0 ? <div className='empty-body' >buy asset</div> :
          portfolio.stocksList.map((item, i) =>
            <div key={i} className='stock-row'>
              <div>{item.stock.companyName}</div>
              <div>{item.stock.symbol}</div>
              <div>{item.quantity}</div>
              <div>{`${item.averagePrice}`.slice(0, 7)}</div>
              <div>{`${item.stock.price}`.slice(0, 7)}</div>
              <div>{`${item.totalCost}`.slice(0, 7)}</div>
                <div onClick={() => sell(item.stock.stockID)} className='buy-button'>
                  <p>sell</p>
                </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default MyAssets