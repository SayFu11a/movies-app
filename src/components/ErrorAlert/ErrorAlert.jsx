import { Alert } from 'antd';

const ErrorAlert = ({ errMessage }) => <Alert message="Error" description={errMessage} type="error" showIcon />;
export default ErrorAlert;
