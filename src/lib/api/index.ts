import { useAuthStore } from '@/stores/auth'
import ky from 'ky'
import { API_BASE_URL } from '../constants'

console.debug(API_BASE_URL)

export const $request = ky.create({
  prefixUrl: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
    'ngrok-skip-browser-warning': 'true',
  },
})

export const $secureRequest = $request.extend({
  headers: {
    Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
  },
})
