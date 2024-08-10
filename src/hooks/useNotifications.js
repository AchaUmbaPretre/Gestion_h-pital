import { message } from 'antd';

const useNotifications = () => {
  const notifySuccess = (content) => message.success(content);
  const notifyError = (content) => message.error(content);

  return { notifySuccess, notifyError };
};

export default useNotifications;
