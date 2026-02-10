
interface SparklineProps {
    data: number[];
    width?: number;
    height?: number;
    color?: string;
    strokeWidth?: number;
}

export default function Sparkline({ 
    data, 
    width = 200, 
    height = 50, 
    color = "#00ff88", 
    strokeWidth = 2 
}: SparklineProps) {
    if (!data || data.length < 2) return null;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    
    // Normalize data to fit in height
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
            <polyline 
                points={points} 
                fill="none" 
                stroke={color} 
                strokeWidth={strokeWidth} 
                strokeLinecap="round" 
                strokeLinejoin="round" 
            />
        </svg>
    );
}
