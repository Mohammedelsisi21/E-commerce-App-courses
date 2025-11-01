"use client"

import { Box, Heading } from "@chakra-ui/react"
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,} from "recharts"
import { useColorModeValue } from "./ui/color-mode"

const data = [
    { month: "January", sale: 10 },
    { month: "February", sale: 95 },
    { month: "March", sale: 87 },
    { month: "May", sale: 88 },
    { month: "June", sale: 65 },
    { month: "August", sale: 90 },
]

const LineCarrt = () => {
    const bg = useColorModeValue("white", "gray.800")
    const gridColor = useColorModeValue("#E2E8F0", "#2D3748")
    const textColor = useColorModeValue("#2D3748", "#E2E8F0")
    const lineColor = useColorModeValue("#319795", "#4FD1C5")

return (
    <Box p={6} borderRadius="xl" shadow="md" bg={bg}>
        <Heading size="md" mb={4} color={textColor}>
            Sales Chart
        </Heading>

        <Box w="100%" h="250px">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid stroke={gridColor} vertical={false} />
                    <XAxis dataKey="month" stroke={gridColor} tick={{ fill: textColor }} />
                    <YAxis stroke={gridColor} tick={{ fill: textColor }} />
                    <Tooltip
                    contentStyle={{backgroundColor: bg, border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.2)", borderRadius: "10px",}}
                    labelStyle={{ color: textColor }}/>
                    <Line type="monotone" dataKey="sale" stroke={lineColor} strokeWidth={3} dot={{ r: 4, fill: lineColor }}/>
                </LineChart>
            </ResponsiveContainer>
        </Box>
    </Box>
)}

export default LineCarrt
