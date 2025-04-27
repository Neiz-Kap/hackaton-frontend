import { envConfig } from '@/config/env.config'

export const API_BASE_URL = `${envConfig.apiBaseUrl}`

export const QUERY_KEYS = {
  EMPLOYEE: 'employee',
  ORGANIZATION: 'organization',
  // PERMISSION: 'permission',
}
