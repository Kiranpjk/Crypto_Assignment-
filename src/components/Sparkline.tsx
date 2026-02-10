import { useState } from 'react';

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
    const [tooltip, setTooltip] = useState<{ x: number; y: number; value: number; index: number } | null>(null);
    
    if (!data || data.length < 2) return null;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    
    // Normalize data to fit in height and create coordinate points
    const coordinates = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        return { x, y, value: val, index: i };
    });
    
    const points = coordinates.map(c => `${c.x},${c.y}`).join(' ');

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <svg 
                width={width} 
                height={height} 
                viewBox={`0 0 ${width} ${height}`} 
                style={{ overflow: 'visible', cursor: 'crosshair' }}
            >
                <polyline 
                    points={points} 
                    fill="none" 
                    stroke={color} 
                    strokeWidth={strokeWidth} 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                />
                
                {/* Interactive circles at each data point */}
                {coordinates.map((coord, i) => (
                    <circle
                        key={i}
                        cx={coord.x}
                        cy={coord.y}
                        r={tooltip?.index === i ? 5 : 3}
                        fill={tooltip?.index === i ? color : 'transparent'}
                        stroke={color}
                        strokeWidth={1}
                        style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={() => setTooltip(coord)}
                        onMouseLeave={() => setTooltip(null)}
                    />
                ))}
            </svg>
            
            {/* Tooltip */}
            {tooltip && (
                <div style={{
                    position: 'absolute',
                    left: `${tooltip.x}px`,
                    top: `${tooltip.y - 40}px`,
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px',
                    padding: '0.5rem',
                    fontSize: '0.875rem',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    zIndex: 1000,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                }}>
                    <div style={{ color: color, fontWeight: 'bold' }}>
                        ₹{tooltip.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </div>
                    <div style={{ color: 'var(--secondary-color)', fontSize: '0.75rem' }}>
                        {tooltip.index < 24 
                            ? `${tooltip.index} hrs ago` 
                            : `${Math.floor(tooltip.index / 24)} days ago`
                        }
                    </div>
                </div>
            )}
        </div>
    );
}
