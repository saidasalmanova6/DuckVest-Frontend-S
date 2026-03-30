import React, { useContext, useEffect, useState } from 'react'
import Card from '../components/Card'
import Chart from '../components/Chart'
import MyAssets from '../components/MyAssets';
import axios from 'axios';
import { DataContext } from '../DataContext/Context';
import toast from 'react-hot-toast';
import Analytics from '../components/Analytics';
function Portfolio({ sell }) {
    let { investor, id, setInvestor } = useContext(DataContext)
    function getRandomSortedNumbers(count, max) {
        const numbers = new Set();
        while (numbers.size < count) {
            const num = Math.floor(Math.random() * max) + 1;
            numbers.add(num);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }
    const [last, setLast] = useState({
        card1: 0,
        card2: 0,
        card3: 0
    });
    let [animation, setAnim] = useState(true)
    useEffect(() => {
        const result = getRandomSortedNumbers(59, investor.portfolioBalance);
        result.push(investor.portfolioBalance);
        const result2 = getRandomSortedNumbers(59, 120);
        result2.push(120);
        const result3 = getRandomSortedNumbers(59, 150);
        result3.push(150);
        function update(step) {
            if (step <= 59) {
                if (animation) {
                    setLast({
                        card1: result[step],
                        card2: result2[step],
                        card3: result3[step]
                    });
                    setTimeout(() => update(step + 1), 30);
                }
                else {
                    setLast({
                        card1: result[59],
                        card2: result2[59],
                        card3: result3[59]
                    });
                }
            }
        };
        update(59);
    }, [investor]);
    let a = [
        { title: "Total value", value: `$${last.card1}`.slice(0, 8), },
        { title: "Today's Change", value: `+ $${last.card2}`, },
        { title: "Best Performing", value: `AAPL +${last.card3 / 10}%`, }
    ]
    let [cashStatus, setCashStatus] = useState(false)
    let [dateValue, setDateValue] = useState('')
    let [inpValue, setInpValue] = useState('')
    function deposit() {
        setCashStatus(true)
    }
    function onClose() {
        setCashStatus(false)
    }
    function formDate(e) {
        setDateValue(e.target.value)
        if (dateValue.length == 2 && e.nativeEvent.inputType != 'deleteContentBackward') {
            setDateValue(e.target.value.slice(0, 2) + '/' + e.target.value.slice(2, 3))
        }
    }
    async function topUpBalance() {
        setInpValue('')
        setCashStatus(false)
        try {
            await axios.post(`http://localhost:4040/bank/add-money-amount=${inpValue}-investorid=${id}`);
            const data = await axios.get(`http://localhost:4040/investors/get-account-information-id=${id}`);
            setAnim(false);
            setInvestor(data.data);
        } catch (err) {
            console.error("Ошибка в запросах:", err);
        }
    }
    function submitBalance(e) {
        e.preventDefault();

        toast.promise(
            topUpBalance(),
            {
                loading: 'Saving...',
                success: <b>Balance topped up!</b>,
                error: <b>Could not save.</b>,
            }
        );

    }
    let modalStyle = {
        transform: cashStatus ? 'translateY(0px)' : 'translateY(-100px)',
        opacity: cashStatus ? 1 : 0,
        transition: '0.3s'
    }

    return (
        <div className='portfolio'>
            <div className='modal-bg' style={{ left: cashStatus ? '0' : '-100vw' }}>
                <div className='modal-cash' style={modalStyle}>
                    <button className="modal-close" onClick={onClose}>×</button>

                    <h2 className="modal-title">Deposit Funds</h2>

                    <form className="modal-form" onSubmit={(e) => submitBalance(e)}>
                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxLength="19" required />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="expiry">Expiry Date</label>
                                <input value={dateValue} onChange={(e) => formDate(e)} type="text" id="expiry" placeholder="MM/YY" maxLength="5" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="cvc">CVV</label>
                                <input type="text" id="cvv" placeholder="123" maxLength="4" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <input type="number" value={inpValue} id="amount" placeholder="$100.00" required onChange={(e) => setInpValue(e.target.value)} />
                        </div>

                        <button type="submit" className="btn-deposit">Deposit</button>
                    </form>
                </div>
            </div>
            <div className='portfolio-header'>
                <h3>Portfolio</h3>
                <div className='person-info'>
                    <img src="../src/assets/react.svg" alt="" />
                    <div>
                        <h5>{investor.username}</h5>
                        <p>{investor.email}</p>
                    </div>
                </div>
            </div>
            <div className="porftolio-cards">
                <div>
                    {a.map((item, index) => <Card key={index} {...item} />
                    )}
                </div>
                <div className='cash-card'>
                    <p>Cash Balance</p>
                    <div>
                        <h3>{`${investor.buyingPower}`.slice(0, 7)}$</h3>
                        <div className='cash-button' onClick={() => deposit()}>Deposit</div>
                    </div>
                </div>
            </div>
            <h4 className='title2'>Portfolio Analytics</h4>
            <Analytics/>
            <h4 className='title2'>Portfolio Performance</h4>
            <Chart />
            <h4 className='title2'>My Assets</h4>
            <MyAssets sell={sell} />
        </div>
    )
}

export default Portfolio