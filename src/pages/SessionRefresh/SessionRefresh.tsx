import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styles from './SesssionRefresh.module.css';

/** Hooks */
import useRefreshToken from '../../hooks/server/auth/token/useRefreshToken';
import { getRefreshToken } from '../../services/api/auth/auth';
import type { ApiError } from '../../types/api/apiError';

const SessionRefresh: React.FC = () => {
  const refreshTokenMutation = useRefreshToken();

  useEffect(() => {
    const refreshSession = async () => {
      try {
        alert();
        const token = await getRefreshToken(); // async get token
        if (!token) return;

        refreshTokenMutation.mutate(token, {
          onSuccess: (response) => {
            console.log('New tokens:', response);
            // optionally redirect to dashboard or restore state
          },
          onError: (e) => {
            const err = (e.response?.data as ApiError) || undefined;
            if (err) console.error('Refresh error:', err);
            // optionally redirect to login page
          },
        });
      } catch (error) {
        console.error('Failed to get refresh token:', error);
      }
    };

    refreshSession();
  }, []);

  return (
    <div className={styles.main}>
      <Helmet>
        <title>Session Refresh</title>
      </Helmet>
      <div className={styles.loader}></div>
    </div>
  );
};

export default SessionRefresh;