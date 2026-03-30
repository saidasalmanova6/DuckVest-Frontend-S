import React, { PureComponent, useEffect, useState } from 'react';
import { useContext } from 'react';
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { DataContext } from '../DataContext/Context';

function OrderChartSell() {
        const [data, setData] = useState([])
        const [objbidene, setObjBidene] = useState({})
        let { monthNames, portfolio } = useContext(DataContext)
        function getPriceForMonth(month) {
            let oneMonthPrices = portfolio.ordersList
                .filter(item => item.orderStatus == 'COMPLETED' && item.orderType == 'SELL' && monthNames[new Date(item.date).getMonth()] == month)
                .map(item => item.stockPrice * item.quantity - item.brokerFee)
            return oneMonthPrices.length != 0 ? oneMonthPrices.reduce((sum, item) => {
                return sum + item
            }) : 0
        }
        useEffect(() => {
            const newObj = monthNames.reduce((acc, month) => {
                acc[month] = getPriceForMonth(month)
                return acc;
            }, {});
            setObjBidene(newObj);
        }, [portfolio])
        useEffect(() => {
            setData(Object.keys(objbidene).map(item => ({ name: item.slice(0, 3), uv: objbidene[item] })))
        }, [objbidene])
        
    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 20,
                    // right: 35,
                    bottom: 20,
                    // left: 20,
                }}
            >
                <CartesianGrid stroke="#ffffff0d" strokeDasharray="3 3" vertical={false} />
                <XAxis tick={{
                    fontSize: '14px',
                    fontFamily: 'Inter',
                    fill: '#ffffff4d',
                    dy: 10
                }} dataKey="name" />
                <YAxis axisLine={false} tick={{
                    fontSize: '14px',
                    fontFamily: 'Inter',
                    fill: '#ffffff4d',
                    dx: -5
                }} />
                <Tooltip contentStyle={{
                    fontFamily: 'Inter',
                    fontSize: 14,
                    color: '#333',
                    backgroundColor: '#f0f0f0',
                    borderRadius: 8,
                    padding: '10px'
                }} />
                <Bar dataKey="uv" barSize={20} fill="#FF7125" />
            </ComposedChart>
        </ResponsiveContainer>
    );
}

export default OrderChartSell