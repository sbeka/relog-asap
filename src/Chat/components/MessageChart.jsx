import React, { memo } from 'react';
import {BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Rectangle} from 'recharts';
import styled from "styled-components";


const MessageChart = ({ config }) => {
	console.log('🐒 config', config);
	const { columns, data, title, type } = config;

	if (type === 'barchart') {
		if (!columns.length || !data) {
			return null;
		}

		return (
			<StyledContainer>
				<ResponsiveContainer height={350}>
					<h2>{title}</h2>
					<BarChart
						width={'100%'}
						height={350}
						data={data}
						margin={{
							bottom: 40,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey={columns[0]} interval={0} angle={-45} textAnchor="end" />
						<YAxis />
						<Tooltip />
						<Legend verticalAlign="top" />
						{columns.slice(1).map(column => (
							<Bar
								dataKey={column}
								fill="#62029E"
								activeBar={<Rectangle fill={getRandomHexColor()} stroke="blue" />}
							/>
						))}
					</BarChart>
				</ResponsiveContainer>
			</StyledContainer>
		);
	}

	return null;
};

function getRandomHexColor() {
	let hex = '#';
	const hexChars = '0123456789ABCDEF';

	for (let i = 0; i < 6; i++) {
		hex += hexChars[Math.floor(Math.random() * 16)];
	}

	return hex;
}

const StyledContainer = styled.div`
	font-size: 12px;
	margin-top: 25px;
	margin-bottom: 30px;
`;

export default memo(MessageChart);
