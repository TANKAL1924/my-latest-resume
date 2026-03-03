type IconVariant = 'outline' | 'solid';

interface IconProps {
    name: string; // Changed to string to accept dynamic values
    variant?: IconVariant;
    size?: number;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    [key: string]: any;
}

function Icon({
    name,
    variant = 'outline',
    size = 24,
    className = '',
    onClick,
    disabled = false,
    ...props
}: IconProps) {
    // Simple SVG icon placeholder - replace with your preferred icon library
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={variant === 'solid' ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            className={`${disabled ? 'opacity-50 cursor-not-allowed' : onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
            onClick={disabled ? undefined : onClick}
            {...props}
        >
            <circle cx="12" cy="12" r="10" />
        </svg>
    );
}

export default Icon; 