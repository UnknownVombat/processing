import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStorage } from '../storages/AuthStorage';

function useAuthRedirect() {
  const navigate = useNavigate();
  const key = authStorage((state) => state.key);

  useEffect(() => {
    if (key === "") {
      navigate('/auth');
    }
  }, [key, navigate]);
}

export default useAuthRedirect;