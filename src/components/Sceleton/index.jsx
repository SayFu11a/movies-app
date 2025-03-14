import ContentLoader from 'react-content-loader';

const Sceleton = (props) => (
    <ContentLoader
        speed={2}
        width={450}
        height={280}
        viewBox="0 0 450 280"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="1" y="1" rx="3" ry="3" width="183" height="274" />
        <rect x="212" y="17" rx="3" ry="3" width="119" height="18" />
        <circle cx="413" cy="22" r="17" />
        <rect x="212" y="161" rx="6" ry="6" width="180" height="16" />
        <rect x="212" y="248" rx="6" ry="6" width="180" height="16" />
        <rect x="212" y="62" rx="6" ry="6" width="60" height="12" />
        <rect x="212" y="109" rx="6" ry="6" width="50" height="12" />
        <rect x="283" y="109" rx="6" ry="6" width="50" height="12" />
        <rect x="368" y="109" rx="6" ry="6" width="50" height="12" />
        <rect x="212" y="211" rx="6" ry="6" width="90" height="16" />
        <rect x="327" y="211" rx="6" ry="6" width="90" height="16" />
    </ContentLoader>
);

export default Sceleton;
