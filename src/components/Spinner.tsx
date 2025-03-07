import { MoonLoader } from 'react-spinners';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <MoonLoader
            color="#fdfdfd"
            size={60}
            speedMultiplier={1}
        />
    </div>
);

export default LoadingSpinner;