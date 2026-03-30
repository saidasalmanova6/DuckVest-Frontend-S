import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Пример данных
const data = [
    { name: 'Jan', value: 20 },
    { name: 'Feb', value: 80 },
    { name: 'Mar', value: 60 },
    { name: 'Apr', value: 120 },
    { name: 'May', value: 140 },
    { name: 'Jun', value: 40 },
    { name: 'Jul', value: 40 },
    { name: 'Aug', value: 40 },
    { name: 'Sep', value: 80 },
    { name: 'Oct', value: 140 },
    { name: 'Nov', value: 60 },
    { name: 'Dec', value: 40 },
];

function Chart() {
    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart  data={data}>
                    <CartesianGrid vertical={false} horizontal={true} stroke="#ffffff0d" strokeDasharray="3 3" />
                    <XAxis axisLine={false} tick={{
                        fontSize: '14px',
                        fontFamily: 'Inter',
                        fill: '#ffffff4d',
                        dy: 10
                    }} dataKey="name" />
                    <YAxis ticks={[0, 20, 40, 60, 80, 100, 120, 140]} axisLine={false} tick={{
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

export default Chart;
