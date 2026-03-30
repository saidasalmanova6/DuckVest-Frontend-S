import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../DataContext/Context'
import { Cell, Pie, PieChart } from 'recharts';
import Loader from './Loader';

function Analytics() {
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const COLORS = [
        '#0088FE',
        '#00C49F',
        '#FFBB28',
        '#FF8042',
        '#ee2525ff',
        '#f315ceff',
        '#1fec41ff'
    ]
    // '#',
    // '#'];
    let [stockAnalytics, setStockAnalytics] = useState()
    let [industryAnalytics, setIndustryAnalytics] = useState()
    let { id } = useContext(DataContext)
    let goodStyle = { border: '1px solid #28e07d', color: '#28e07d', backgroundColor: '#28e07e1a' }
    let riskStyle = { border: '1px solid #c40101', color: '#c40101', backgroundColor: '#c401011a' }
    let mediumStyle = { border: '1px solid #eefd12', color: '#eefd12', backgroundColor: '#eefd121a' }
    useEffect(() => {
        axios.get(`http://localhost:4040/portfolios/get-industry-diversification=${id}`)
            .then(res => {
                setIndustryAnalytics(res.data)
                return res.data
            })
            .then(res => {
                if (res.industryToPercentage) {
                    let objList = Object.keys(res.industryToPercentage).map(item => (
                        { name: item, value: res.industryToPercentage[item] }
                    ))
                    setData2(objList)
                }
            })
        axios.get(`http://localhost:4040/portfolios/get-stock-diversification=${id}`)
            .then(res => {
                setStockAnalytics(res.data)
                return res.data
            })
            .then(res => {
                if (res.stockDistribution) {
                    let objList = Object.keys(res.stockDistribution).map(item => (
                        { name: item, value: res.stockDistribution[item] }
                    ))
                    setData(objList)
                }
            }
            )
    }, [])

    if (!stockAnalytics || !industryAnalytics) {
        return <Loader/>
    }
    return (
        <div className='analytics' >
            <div className='stockDistribution' >
                <div>
                    {Object.keys(stockAnalytics.stockDistribution).length != 0 ?
                        <PieChart width={190} height={190}>
                            <Pie
                                data={data}
                                cx={90}
                                cy={90}
                                innerRadius={60}
                                outerRadius={88}
                                fill="#8884d8"
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart> :
                        null
                    }
                    <div className='div-score' style={{width: Object.keys(stockAnalytics.stockDistribution).length == 0 ? '100%' : null }} >
                        <h3>Stock Diversification</h3>
                        <h2 style={stockAnalytics.level == 'Good' || stockAnalytics.level == 'Excellent' ? goodStyle
                                : stockAnalytics.level == 'Medium' ? mediumStyle
                                    : riskStyle} >{stockAnalytics.level}</h2>
                        <p>{`${stockAnalytics.diversificationScore * 100}`.slice(0, 2)}%</p>
                    </div>
                </div>
                <div>
                    {
                        data.map((item, i) =>
                            <div key={i} ><div style={{ backgroundColor: COLORS[i] }} className='circle'></div><p>{item.name}</p><h5>{item.value} %</h5></div>
                        )
                    }
                </div>
            </div>
            <div className='stockDistribution' >
                <div>
                    {Object.keys(stockAnalytics.stockDistribution).length!= 0 ?
                        <PieChart width={190} height={190}>
                            <Pie
                                data={data2}
                                cx={90}
                                cy={90}
                                innerRadius={60}
                                outerRadius={88}
                                fill="#8884d8"
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {data2.map((entry, index) => (
                                    <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart> : null
                    }
                    <div className='div-score' style={{width: Object.keys(stockAnalytics.stockDistribution).length == 0 ? '100%' : null }} >
                        <h3>Industry Diversification</h3>
                        <h2 style={stockAnalytics.level == 'Good' || stockAnalytics.level == 'Excellent' ? goodStyle
                            : stockAnalytics.level == 'Medium' ? mediumStyle
                                : riskStyle}>{industryAnalytics.diversificationLevel}</h2>
                        <p>{`${industryAnalytics.diversificationScore * 100}`.slice(0, 2)}%</p>
                    </div>
                </div>
                <div>
                    {
                        data2.map((item, i) =>
                            <div key={i}><div style={{ backgroundColor: COLORS[i] }} className='circle'></div><p>{item.name}</p><h5>{item.value} %</h5></div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Analytics