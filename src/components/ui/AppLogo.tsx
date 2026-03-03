import logoImg from '../../assets/logo.png';
import AppImage from './AppImage';

interface AppLogoProps {
  src?: string; // Image source (optional)
  text?: string; // Logo text (optional)
  size?: number; // Size for icon/image
  className?: string; // Additional classes
  onClick?: () => void; // Click handler
}

function AppLogo({
  src,
  text,
  size = 64,
  className = '',
  onClick,
}: AppLogoProps) {
  const logoSrc = src || logoImg;
  return (
    <div
      className={`flex items-center gap-2 ${onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
      onClick={onClick}
    >
      <AppImage src={logoSrc} alt="Logo" width={size} height={size} className="flex-shrink-0" />

      {/* Show text if provided */}
      {text && (
        <span className="text-xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
          {text}
        </span>
      )}
    </div>
  );
}

export default AppLogo;
