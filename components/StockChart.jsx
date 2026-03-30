import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Пример данных

function StockChart({stockPrices}) {    
    const data = stockPrices.map(item => (
        { name: item['datetime'].slice(5, 7), value: +item['close'] }
    ))
    return (
        <div className="chart-container chart2">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid vertical={false} horizontal={true} stroke="#ffffff0d" strokeDasharray="3 3" />
                    <XAxis axisLine={false} tick={{
                        fontSize: '14px',
                        fontFamily: 'Inter',
                        fill: '#ffffff4d',
                        dy: 10
                    }} dataKey="name" />
                    <YAxis axisLine={false} tick={{
                        fontSize: '14px',
                        fontFamily: 'Inter',
                        fill: '#ffffff4d',
                        dx: -8,
                        dy: -2
                    }} />
                    <Tooltip contentStyle={{
                        fontFamily: 'Inter',
                        fontSize: 14,
                        color: '#333',
                        backgroundColor: '#f0f0f0',
                        borderRadius: 8,
                        padding: '10px'
                    }} />
                    <Line dataKey="value" stroke="#FF7125" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StockChart;
