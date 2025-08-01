import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { User, AuthState } from '../types';

// API base URL
const API_BASE_URL = 'http://localhost:5000/api';

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'VALIDATE_TOKEN_START' }
  | { type: 'VALIDATE_TOKEN_SUCCESS'; payload: User }
  | { type: 'VALIDATE_TOKEN_FAILURE' }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
    case 'VALIDATE_TOKEN_START':
      return { ...state, isLoading: true, error: null };
    
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };
    
    case 'VALIDATE_TOKEN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    
    case 'VALIDATE_TOKEN_FAILURE':
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
}

// Helper function to make API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }

  return data;
};

const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  validateToken: () => Promise<boolean>;
  clearError: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Validate token on app load
  useEffect(() => {
    const validateStoredToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        await validateToken();
      }
    };

    validateStoredToken();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      dispatch({ type: 'LOGIN_START' });

      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      // Store token and user data
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));

      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { 
          user: data.data.user, 
          token: data.data.token 
        } 
      });

      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      dispatch({ type: 'REGISTER_START' });

      const data = await apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });

      // Store token and user data
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));

      dispatch({ 
        type: 'REGISTER_SUCCESS', 
        payload: { 
          user: data.data.user, 
          token: data.data.token 
        } 
      });

      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch({ type: 'REGISTER_FAILURE', payload: errorMessage });
      return false;
    }
  };

  const validateToken = async (): Promise<boolean> => {
    try {
      dispatch({ type: 'VALIDATE_TOKEN_START' });

      const data = await apiCall('/auth/validate', {
        method: 'POST',
      });

      if (data.valid) {
        dispatch({ type: 'VALIDATE_TOKEN_SUCCESS', payload: data.user });
        return true;
      } else {
        // Token is invalid, clear stored data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'VALIDATE_TOKEN_FAILURE' });
        return false;
      }
    } catch (error) {
      // Token is invalid, clear stored data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch({ type: 'VALIDATE_TOKEN_FAILURE' });
      return false;
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint (optional - for server-side cleanup)
      await apiCall('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      // Even if logout API call fails, we still want to clear local data
      console.log('Logout API call failed, but clearing local data');
    } finally {
      // Clear stored data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider value={{ 
      state, 
      login, 
      register, 
      logout, 
      validateToken, 
      clearError 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}