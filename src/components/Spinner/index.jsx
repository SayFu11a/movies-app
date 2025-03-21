import './Spinner.css';

import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

const Spinner = () => (
    <Flex align="center" gap="middle">
        <Spin
            indicator={
                <LoadingOutlined
                    style={{
                        fontSize: 48,
                    }}
                    spin
                />
            }
        />
    </Flex>
);
export default Spinner;
